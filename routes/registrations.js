const express = require('express');
const router = express.Router();
const SportsRegistration = require('../models/SportsRegistration');
const CollegeRegistration = require('../models/CollegeRegistration');
const { verifyToken } = require('../middleware/auth');

// ============================================================
// SPORTS DAY
// ============================================================

// POST /api/registrations/sports  — public
router.post('/sports', async (req, res) => {
    try {
        const reg = await SportsRegistration.create(req.body);
        res.status(201).json({ success: true, id: reg._id });
    } catch (error) {
        console.error('Sports registration error:', error);
        res.status(500).json({ error: 'Failed to save sports registration.' });
    }
});

// GET /api/registrations/sports  — admin only
router.get('/sports', verifyToken, async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const registrations = await SportsRegistration.find()
            .sort({ submittedAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await SportsRegistration.countDocuments();
        res.json({ registrations, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sports registrations.' });
    }
});

// DELETE /api/registrations/sports/:id  — admin only
router.delete('/sports/:id', verifyToken, async (req, res) => {
    try {
        await SportsRegistration.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete sports registration.' });
    }
});

// ============================================================
// COLLEGE DAY
// ============================================================

// POST /api/registrations/college  — public
router.post('/college', async (req, res) => {
    try {
        const reg = await CollegeRegistration.create(req.body);
        res.status(201).json({ success: true, id: reg._id });
    } catch (error) {
        console.error('College registration error:', error);
        res.status(500).json({ error: 'Failed to save college registration.' });
    }
});

// GET /api/registrations/college  — admin only
router.get('/college', verifyToken, async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const registrations = await CollegeRegistration.find()
            .sort({ submittedAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await CollegeRegistration.countDocuments();
        res.json({ registrations, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch college registrations.' });
    }
});

// DELETE /api/registrations/college/:id  — admin only
router.delete('/college/:id', verifyToken, async (req, res) => {
    try {
        await CollegeRegistration.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete college registration.' });
    }
});

module.exports = router;
