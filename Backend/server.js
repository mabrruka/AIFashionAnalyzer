require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// health check
app.get("/", (req, res) => {
    res.json({
        status: "OK",
        message: "AIFashionAnalyzer API is running"
    });
});

// routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/profileRoutes"));
app.use("/", require("./routes/analysisRoutes"));
app.use("/", require("./routes/saveRoutes")); // ✅ CORRECT

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});