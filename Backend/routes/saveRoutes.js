const express = require("express");
const db = require("../Database/db");

const router = express.Router();

// SAVE IMAGES
router.post("/save-images", (req, res) => {
    const { userId, images } = req.body;

    if (!userId || !images || images.length === 0) {
        return res.status(400).json({ error: "Missing data" });
    }

    const sql = `
        INSERT INTO saved_items (user_id, title, image_url, category)
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
            console.error("DB ERROR:", err);
            return res.status(500).json({ error: "DB error" });
        }

        res.json({ success: true });
    });
});

// GET SAVED IMAGES
router.get("/user-saved/:userId", (req, res) => {
    const { userId } = req.params;

    db.query(
        "SELECT * FROM saved_items WHERE user_id = ? ORDER BY created_at DESC",
        [userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "DB error" });
            }

            res.json(results);
        }
    );
});


//  DELETE MULTIPLE SAVED IMAGES
router.post("/delete-saved-images", (req, res) => {
    const { userId, imageIds } = req.body;

    if (!userId || !imageIds || imageIds.length === 0) {
        return res.status(400).json({ error: "Missing data" });
    }

    const sql = `
        DELETE FROM saved_items 
        WHERE user_id = ? AND id IN (?)
    `;

    db.query(sql, [userId, imageIds], (err) => {
        if (err) {
            console.error("DELETE ERROR:", err);
            return res.status(500).json({ error: "DB error" });
        }

        res.json({ success: true });
    });
});

module.exports = router;