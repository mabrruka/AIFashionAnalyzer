const express = require("express");
const db = require("../Database/db");

const router = express.Router();

/* ANALYZE */
router.post("/analyze", (req, res) => {
    const result = {
        aesthetic: "Minimalist",
        score: 92,
        description: "Clean lines, neutral tones, and simple silhouettes."
    };

    const sql =
        "INSERT INTO results (aesthetic, score, description) VALUES (?, ?, ?)";

    db.query(
        sql,
        [result.aesthetic, result.score, result.description],
        (err) => {
            if (err) return res.status(500).json({ error: "Database error" });

            res.json(result);
        }
    );
});

/* GET RESULTS */
router.get("/results", (req, res) => {
    db.query("SELECT * FROM results ORDER BY id DESC", (err, data) => {
        if (err) return res.status(500).json({ error: "Database error" });

        res.json(data);
    });
});

module.exports = router;