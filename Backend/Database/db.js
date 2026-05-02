
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "fashion_analyzer",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// test connection once on startup
 async function testConnection() {
    try {
        const conn = await pool.getConnection();

        console.log("✅ Connected to MySQL");

        if (conn) {
            conn.release();
        }

    } catch (err) {
        console.log("❌ MySQL not ready:", err.message);

        setTimeout(testConnection, 3000);
    }
}

testConnection();

module.exports = pool;