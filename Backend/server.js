const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/profileRoutes"));
app.use("/", require("./routes/analysisRoutes"));

app.listen(3001, () => {
    console.log("🚀 Server running on http://localhost:3001");
});