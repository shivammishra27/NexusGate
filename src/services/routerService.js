const { MODELS } = require("./geminiService");

// ==========================================
// SMART MODEL ROUTER
// ==========================================

function selectModel(prompt) {
  const text = prompt.toLowerCase();

  const complexKeywords = [
    "code",
    "debug",
    "architecture",
    "algorithm",
    "system design",
    "analyze",
    "analysis",
    "explain in detail",
    "complex",
    "reason",
    "reasoning",
    "database",
    "optimize",
    "optimization"
  ];

  const isComplex = complexKeywords.some((keyword) =>
    text.includes(keyword)
  );

  if (isComplex) {
    return {
      model: MODELS.powerful,
      route: "powerful"
    };
  }

  return {
    model: MODELS.fast,
    route: "fast"
  };
}

module.exports = {
  selectModel
};