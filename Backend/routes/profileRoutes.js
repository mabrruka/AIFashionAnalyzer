const express = require("express");
const db = require("../Database/db");

const router = express.Router();

/* GET PROFILE */
router.get("/profile/:id", (req, res) => {
    const { id } = req.params;

    const userSql = "SELECT * FROM users WHERE id = ?";
    const resultsSql =
        "SELECT * FROM results WHERE user_id = ? ORDER BY id DESC";

    db.query(userSql, [id], (err, userData) => {
        if (err) {
            return res.status(500).json({
                error: "DB error",
            });
        }

        db.query(resultsSql, [id], (err2, resultsData) => {
            if (err2) {
                return res.status(500).json({
                    error: "DB error",
                });
            }

            res.json({
                user: userData[0],
                results: resultsData,
            });
        });
    });
});

/* UPDATE PROFILE */
router.put("/profile/:id", (req, res) => {
    const { id } = req.params;
    const { bio, profilePic } = req.body;

    const sql = `
        UPDATE users
        SET bio = ?, profilePic = ?
        WHERE id = ?
    `;

    db.query(sql, [bio, profilePic, id], (err) => {
        if (err) {
            return res.status(500).json({
                error: "Database error",
            });
        }

        res.json({
            message: "Profile updated",
        });
    });
});

/* DELETE RESULTS */
router.post("/delete-results", (req, res) => {
    const { userId, resultIds } = req.body;

    if (!resultIds || resultIds.length === 0) {
        return res.status(400).json({
            error: "No results selected",
        });
    }

    const sql = `
        DELETE FROM results
        WHERE user_id = ?
        AND id IN (?)
    `;

    db.query(sql, [userId, resultIds], (err) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                error: "Database delete error",
            });
        }

        res.json({
            success: true,
        });
    });
});

module.exports = router;