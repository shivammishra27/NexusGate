const prisma = require("../config/prisma");

const apiKeyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "API key is required"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
    }

    const apiKey = parts[1];

    const user = await prisma.user.findUnique({
      where: {
        apiKey: apiKey
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key"
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

module.exports = apiKeyAuth;