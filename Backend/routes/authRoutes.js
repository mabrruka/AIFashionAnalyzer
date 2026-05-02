const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../Database/db");

const router = express.Router();

/* =========================
   SIGNUP
========================= */
router.post("/signup", (req, res) => {
    const { username, email, password, age } = req.body;

    // validation
    if (!username || !email || !password || age === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (isNaN(age) || Number(age) < 13) {
        return res.status(400).json({ error: "Invalid age (must be 13+)" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql =
        "INSERT INTO users (username, email, password, age) VALUES (?, ?, ?, ?)";

    db.query(sql, [username, email, hashedPassword, Number(age)], (err) => {
        if (err) {
            console.error(" SIGNUP SQL ERROR:", err);

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ error: "Email or username already exists" });
            }

            return res.status(500).json({ error: err.message });
        }

        return res.json({ message: "User created successfully" });
    });
});


/* =========================
   LOGIN
========================= */
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("LOGIN SQL ERROR:", err);
            return res.status(500).json({ error: err.message });
        }

        if (!results || results.length === 0) {
            return res.status(401).json({ error: "User not found" });
        }

        const user = results[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Wrong password" });
        }

        return res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                age: user.age
            }
        });
    });
});

module.exports = router;