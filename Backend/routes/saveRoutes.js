const express = require("express");
const db = require("../Database/db");

const router = express.Router();

//
// SAVE RESULT
//
router.post("/save-result", (req, res) => {
    const { userId, aesthetic, score, description } = req.body;

    if (!userId || !aesthetic) {
        return res.status(400).json({
            error: "Missing data"
        });
    }

    const sql = `
        INSERT INTO results
        (user_id, aesthetic, score, description)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userId, aesthetic, score, description],
        (err, result) => {
            if (err) {
                console.error("SAVE RESULT ERROR:", err);

                return res.status(500).json({
                    error: "Database error"
                });
            }

            res.json({
                success: true,
                id: result.insertId
            });
        }
    );
});

//
// GET PROFILE + RESULTS
//
router.get("/profile/:userId", (req, res) => {
    const { userId } = req.params;

    const userSql = `
        SELECT id, username, email, bio, profilePic
        FROM users
        WHERE id = ?
    `;

    const resultsSql = `
        SELECT *
        FROM results
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(userSql, [userId], (err, userRows) => {
        if (err) {
            console.error("USER FETCH ERROR:", err);

            return res.status(500).json({
                error: "Database error"
            });
        }

        if (userRows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        db.query(resultsSql, [userId], (err, resultRows) => {
            if (err) {
                console.error("RESULT FETCH ERROR:", err);

                return res.status(500).json({
                    error: "Database error"
                });
            }

            res.json({
                user: userRows[0],
                results: resultRows
            });
        });
    });
});

//
// SAVE IMAGES
//
router.post("/save-images", (req, res) => {
    const { userId, images } = req.body;

    if (!userId || !images || images.length === 0) {
        return res.status(400).json({
            error: "Missing data"
        });
    }

    const sql = `
        INSERT INTO saved_items
        (user_id, title, image_url, category)
        VALUES ?
    `;

    const values = images.map((img) => [
        userId,
        "Saved Inspiration",
        img,
        "inspiration"
    ]);

    db.query(sql, [values], (err) => {
        if (err) {
            console.error("SAVE IMAGE ERROR:", err);

            return res.status(500).json({
                error: "Database error"
            });
        }

        res.json({
            success: true
        });
    });
});

//
// GET SAVED IMAGES
//
router.get("/user-saved/:userId", (req, res) => {
    const { userId } = req.params;

    db.query(
        `
        SELECT *
        FROM saved_items
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId],
        (err, results) => {
            if (err) {
                console.error("GET SAVED ERROR:", err);

                return res.status(500).json({
                    error: "Database error"
                });
            }

            res.json(results);
        }
    );
});

//
// DELETE SAVED IMAGES
//
router.post("/delete-saved-images", (req, res) => {
    const { userId, imageIds } = req.body;

    if (!userId || !imageIds || imageIds.length === 0) {
        return res.status(400).json({
            error: "Missing data"
        });
    }

    const sql = `
        DELETE FROM saved_items
        WHERE user_id = ?
        AND id IN (?)
    `;

    db.query(sql, [userId, imageIds], (err) => {
        if (err) {
            console.error("DELETE ERROR:", err);

            return res.status(500).json({
                error: "Database error"
            });
        }

        res.json({
            success: true
        });
    });
});

//
// UPDATE PROFILE
//
router.post("/update-profile", (req, res) => {
    const { userId, bio, profilePic } = req.body;

    const sql = `
        UPDATE users
        SET bio = ?, profilePic = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [bio, profilePic, userId],
        (err) => {
            if (err) {
                console.error("UPDATE PROFILE ERROR:", err);

                return res.status(500).json({
                    error: "Database error"
                });
            }

            res.json({
                success: true
            });
        }
    );
});

module.exports = router;