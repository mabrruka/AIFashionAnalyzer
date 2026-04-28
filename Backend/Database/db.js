const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function connect() {
    db.connect((err) => {
        if (err) {
            console.log("❌ DB not ready:", err.message);
            setTimeout(connect, 3000);
        } else {
            console.log("✅ Connected to MySQL");
        }
    });
}

connect();

module.exports = db;