const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nexusgate-frontend.onrender.com"
    ]
  })
);

app.use(express.json());

const prisma = require("./config/prisma");
const apiKeyAuth = require("./middleware/apiKeyAuth");
const rateLimiter = require("./middleware/rateLimiter");

const { generateText } = require("./services/geminiService");
const { selectModel } = require("./services/routerService");

// ==========================================
// TEST DATABASE
// ==========================================

app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

// ==========================================
// SIGNUP
// ==========================================

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // ==========================================
    // CHECK EXISTING USER
    // ==========================================

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    // ==========================================
    // HASH PASSWORD
    // ==========================================

    const passwordHash = await bcrypt.hash(password, 10);

    // ==========================================
    // GENERATE API KEY
    // ==========================================

    const apiKey =
      "ng_live_" + crypto.randomBytes(32).toString("hex");

    // ==========================================
    // CREATE USER
    // ==========================================

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        apiKey
      }
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message: "User created successfully",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        apiKey: user.apiKey
      }
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
});

// ==========================================
// LOGIN
// ==========================================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // ==========================================
    // OLD ACCOUNT WITHOUT PASSWORD
    // ==========================================

    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        message:
          "This account does not have a password. Please create a new account."
      });
    }

    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // ==========================================
    // LOGIN SUCCESS
    // ==========================================

    res.json({
      success: true,
      message: "Login successful",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        apiKey: user.apiKey
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});

// ==========================================
// API KEY TEST
// ==========================================

app.get("/api/test", apiKeyAuth, (req, res) => {
  res.json({
    success: true,
    message: "API key is valid",
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

// ==========================================
// DASHBOARD STATS
// ==========================================

app.get("/api/dashboard/stats", apiKeyAuth, async (req, res) => {
  try {
    const totalRequests = await prisma.apiRequest.count({
      where: {
        userId: req.user.id
      }
    });

    const successfulRequests = await prisma.apiRequest.count({
      where: {
        userId: req.user.id,
        statusCode: {
          gte: 200,
          lt: 300
        }
      }
    });

    const failedRequests = await prisma.apiRequest.count({
      where: {
        userId: req.user.id,
        statusCode: {
          gte: 400
        }
      }
    });

    const usage = await prisma.apiRequest.aggregate({
      where: {
        userId: req.user.id
      },
      _sum: {
        inputTokens: true,
        outputTokens: true,
        totalTokens: true,
        estimatedCost: true
      },
      _avg: {
        responseTime: true
      }
    });

    const successRate =
      totalRequests > 0
        ? ((successfulRequests / totalRequests) * 100).toFixed(2)
        : "0.00";

    res.json({
      success: true,

      stats: {
        totalRequests,
        successfulRequests,
        failedRequests,

        successRate: Number(successRate),

        inputTokens: usage._sum.inputTokens || 0,
        outputTokens: usage._sum.outputTokens || 0,
        totalTokens: usage._sum.totalTokens || 0,

        averageResponseTime: Math.round(
          usage._avg.responseTime || 0
        ),

        estimatedCost: usage._sum.estimatedCost || 0
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard stats"
    });
  }
});

// ==========================================
// LATEST REQUEST
// ==========================================

app.get("/api/dashboard/latest", apiKeyAuth, async (req, res) => {
  try {
    const latestRequest = await prisma.apiRequest.findFirst({
      where: {
        userId: req.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!latestRequest) {
      return res.json({
        success: true,
        request: null
      });
    }

    res.json({
      success: true,

      request: {
        model: latestRequest.model || "Unknown",
        route: latestRequest.route || "Unknown",
        responseTime: latestRequest.responseTime || 0,
        inputTokens: latestRequest.inputTokens || 0,
        outputTokens: latestRequest.outputTokens || 0,
        totalTokens: latestRequest.totalTokens || 0,
        statusCode: latestRequest.statusCode,
        createdAt: latestRequest.createdAt
      }
    });
  } catch (error) {
    console.error("Latest request error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch latest request"
    });
  }
});

// ==========================================
// REQUEST HISTORY
// ==========================================

app.get("/api/dashboard/history", apiKeyAuth, async (req, res) => {
  try {
    const requests = await prisma.apiRequest.findMany({
      where: {
        userId: req.user.id
      },

      orderBy: {
        createdAt: "desc"
      },

      take: 10
    });

    res.json({
      success: true,

      requests: requests.map((request) => ({
        id: request.id,
        endpoint: request.endpoint,
        statusCode: request.statusCode,
        responseTime: request.responseTime || 0,

        model: request.model || "Unknown",
        route: request.route || "Unknown",

        inputTokens: request.inputTokens || 0,
        outputTokens: request.outputTokens || 0,
        totalTokens: request.totalTokens || 0,

        estimatedCost: request.estimatedCost || 0,

        createdAt: request.createdAt
      }))
    });
  } catch (error) {
    console.error("Request history error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch request history"
    });
  }
});

// ==========================================
// AI GENERATE
// ==========================================

app.post(
  "/api/generate",
  apiKeyAuth,
  rateLimiter,
  async (req, res) => {
    const startTime = Date.now();

    try {
      const { prompt } = req.body;

      // ==========================================
      // CHECK PROMPT
      // ==========================================

      if (!prompt) {
        return res.status(400).json({
          success: false,
          message: "Prompt is required"
        });
      }

      // ==========================================
      // SMART MODEL ROUTING
      // ==========================================

      const routing = selectModel(prompt);

      console.log(
        `🧠 Router selected: ${routing.route} → ${routing.model}`
      );

      // ==========================================
      // CALL GEMINI
      // ==========================================

      const aiResult = await generateText(
        prompt,
        routing.model
      );

      const responseTime = Date.now() - startTime;

      const inputTokens =
        aiResult.usage?.inputTokens || 0;

      const outputTokens =
        aiResult.usage?.outputTokens || 0;

      const totalTokens =
        aiResult.usage?.totalTokens || 0;

      const model = aiResult.model;
      const route = routing.route;

      const estimatedCost = 0;

      // ==========================================
      // SAVE SUCCESSFUL REQUEST
      // ==========================================

      await prisma.apiRequest.create({
        data: {
          userId: req.user.id,
          endpoint: "/api/generate",
          statusCode: 200,
          responseTime,

          model,
          route,

          inputTokens,
          outputTokens,
          totalTokens,

          estimatedCost
        }
      });

      // ==========================================
      // RESPONSE
      // ==========================================

      res.json({
        success: true,

        response: aiResult.text,

        usage: {
          inputTokens,
          outputTokens,
          totalTokens
        },

        model,
        route,

        request: {
          prompt
        },

        responseTime,

        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        }
      });
    } catch (error) {
      console.error("Gemini/API Error:", error);

      const responseTime = Date.now() - startTime;

      // ==========================================
      // SAVE FAILED REQUEST
      // ==========================================

      try {
        await prisma.apiRequest.create({
          data: {
            userId: req.user.id,
            endpoint: "/api/generate",
            statusCode: 500,
            responseTime,

            model: "unknown",
            route: "unknown",

            inputTokens: 0,
            outputTokens: 0,
            totalTokens: 0,

            estimatedCost: 0
          }
        });
      } catch (dbError) {
        console.error(
          "Failed to save API request:",
          dbError
        );
      }

      res.status(500).json({
        success: false,
        message: "AI request failed"
      });
    }
  }
);

// ==========================================
// EXPORT APP
// ==========================================

module.exports = app;