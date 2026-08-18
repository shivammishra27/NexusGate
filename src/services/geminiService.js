const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// ==========================================
// AVAILABLE MODELS
// ==========================================

const MODELS = {
  fast: "gemini-3.5-flash-lite",
  powerful: "gemini-3.6-flash"
};

// ==========================================
// GENERATE TEXT
// ==========================================

async function generateText(prompt, model = MODELS.fast) {
  console.log(`🤖 Sending request to Gemini: ${model}`);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,

      config: {
        httpOptions: {
         timeout: 30000,

          retryOptions: {
            attempts: 3,
            initialDelay: 1000,
            maxDelay: 8000,
            expBase: 2,
            jitter: 1,
            httpStatusCodes: [
              408,
              429,
              500,
              502,
              503,
              504
            ]
          }
        }
      }
    });

    console.log(`✅ Gemini response received: ${model}`);

    const usage = response.usageMetadata || {};

    return {
      text: response.text,

      model: model,

      usage: {
        inputTokens: usage.promptTokenCount || 0,
        outputTokens: usage.candidatesTokenCount || 0,
        totalTokens: usage.totalTokenCount || 0
      }
    };

  } catch (error) {
    console.error("❌ Gemini Error:");
    console.error("Model:", model);
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Status:", error.status);

    throw error;
  }
}

module.exports = {
  generateText,
  MODELS
};