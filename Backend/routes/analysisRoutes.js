const express = require("express");
const db = require("../Database/db");

const router = express.Router();

router.post("/analyze", async (req, res) => {
    try {
        const { images, url, myStyle, inspo } = req.body;

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
You are a fashion stylist AI.

You MUST infer a fashion aesthetic even with limited data.

DO NOT output "Unknown" unless absolutely impossible.

Use this logic:
- If images > 0 → infer likely aesthetic from fashion patterns
- If only URL → infer from context
- If nothing → still guess a modern aesthetic category

INPUT:
- Images count: ${images?.length || 0}
- Pinterest URL: ${url || "none"}
- My style: ${myStyle}
- Inspiration: ${inspo}

Return ONLY valid JSON:
{
  "aesthetic": one of ["Minimalist Streetwear", "Clean Girl", "Y2K", "Dark Academia", "Techwear", "Old Money", "Athleisure"],
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

- Images uploaded: ${images?.length || 0}
- Pinterest URL: ${url || "none"}
- My style: ${myStyle}
- Inspiration: ${inspo}

Give a detailed fashion analysis.
`
                    }
                ]
            })
        });

        const data = await response.json();

        console.log("RAW AI RESPONSE:", data);

        const text = data?.choices?.[0]?.message?.content;

        console.log("AI TEXT:", text);

        // ✅ SAFE DEFAULT (prevents undefined crash)
        let parsed = {
            aesthetic: "Unknown",
            score: 0,
            description: "No valid AI response",
            elements: [],
            recommendations: []
        };

        try {
            parsed = JSON.parse(text);
        } catch (err) {
            console.error("JSON PARSE FAILED:", err);
            console.log("FALLBACK USED");
        }

        // Save safely to DB
        const sql =
            "INSERT INTO results (aesthetic, score, description) VALUES (?, ?, ?)";

        db.query(sql, [
            parsed.aesthetic,
            parsed.score,
            parsed.description
        ]);

        return res.json(parsed);

    } catch (err) {
        console.error("ANALYSIS ERROR:", err);

        return res.status(500).json({
            aesthetic: "Error",
            score: 0,
            description: "Backend failure",
            elements: [],
            recommendations: []
        });
    }
});

module.exports = router;