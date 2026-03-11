const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /api/auth/login
// Body: { password: "..." }
// Returns: { token: "...", expiresIn: 86400 }
router.post('/login', async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
        }

        const adminPassword = process.env.ADMIN_PASSWORD;

        // Compare plain-text password (we store plaintext in .env for simplicity)
        // If you prefer bcrypt hashed, use: bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
        if (password !== adminPassword) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, expiresIn: 86400 });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// POST /api/auth/verify
// Verifies if a token is still valid (used on page load)
router.post('/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ valid: false });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true });
    } catch {
        res.status(401).json({ valid: false });
    }
});

module.exports = router;
