require("dotenv").config();

const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const API_KEY = process.env.OPENROUTER_API_KEY;

console.log("API KEY LOADED:", API_KEY ? "YES" : "NO");

async function test() {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
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
You are a fashion AI. Return ONLY JSON:
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
                    content: "Analyze a minimalist streetwear aesthetic"
                }
            ]
        })
    });

    const data = await response.json();

    console.log("\nRAW RESPONSE:\n", JSON.stringify(data, null, 2));

    const text = data.choices?.[0]?.message?.content;

    console.log("\nAI TEXT:\n", text);

    try {
        console.log("\nPARSED:\n", JSON.parse(text));
    } catch {
        console.log("\n JSON parse failed");
    }
}

test();