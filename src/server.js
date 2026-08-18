require("dotenv").config();
const app = require("./app");

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "NexusGate API Running 🚀",
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});