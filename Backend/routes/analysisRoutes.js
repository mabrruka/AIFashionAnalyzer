const express = require("express");
const db = require("../Database/db");
const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/analyze", async (req, res) => {
    try {
        const { url, myStyle, inspo } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AIFashionAnalyzer"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
You are a fashion AI stylist.

Return ONLY valid JSON:
{
  "aesthetic": string,
  "score": number,
  "description": string,
  "elements": string[],
  "recommendations": string[]
}
`
                    },
                    {
                        role: "user",
                        content: `
Analyze this user:
- my style: ${myStyle}
- inspiration: ${inspo}
- pinterest url: ${url || "none"}

Give fashion analysis.
`
                    }
                ]
            })
        });

        const data = await response.json();

        const text = data.choices?.[0]?.message?.content;

        let parsed;

        try {
            parsed = JSON.parse(text);
        } catch (e) {
            return res.status(500).json({
                error: "AI returned invalid JSON",
                raw: text
            });
        }

        const sql =
            "INSERT INTO results (aesthetic, score, description) VALUES (?, ?, ?)";

        db.query(sql, [
            parsed.aesthetic,
            parsed.score,
            parsed.description
        ]);

        res.json(parsed);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Analysis failed" });
    }
});

module.exports = router;