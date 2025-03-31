const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING id',
            [fullname, email, hashedPassword]
        );
        res.json({ userId: result.rows[0].id, message: 'User registered!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Loan Application
app.post('/api/loan/apply', async (req, res) => {
    const { userId, amount, duration, employmentStatus, income } = req.body;

    try {
        await pool.query(
            'INSERT INTO loans (user_id, amount, duration, employment_status, income, status) VALUES ($1, $2, $3, $4, $5, $6)',
            [userId, amount, duration, employmentStatus, income, 'pending']
        );
        res.json({ message: 'Loan application submitted' });
    } catch (error) {
        res.status(500).json({ error: 'Error applying for loan' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
