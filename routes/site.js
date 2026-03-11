const express = require('express');
const router = express.Router();
const SiteData = require('../models/SiteData');
const { verifyToken } = require('../middleware/auth');

// GET /api/site
// Public - returns all site data
function cleanDoc(doc) {
    const obj = doc.toObject ? doc.toObject() : doc;
    const { _id, __v, _docId, createdAt, updatedAt, ...clean } = obj;
    return clean;
}

router.get('/', async (req, res) => {
    try {
        let siteData = await SiteData.findOne({ _docId: 'main' });

        if (!siteData) {
            // Initialize with defaults on first run
            siteData = await SiteData.create({ _docId: 'main' });
        }

        res.json(cleanDoc(siteData));
    } catch (error) {
        console.error('Error fetching site data:', error);
        res.status(500).json({ error: 'Failed to fetch site data.' });
    }
});

// PUT /api/site
// Protected - update site data fields (partial update supported)
router.put('/', verifyToken, async (req, res) => {
    try {
        const updates = req.body;

        // Remove fields that shouldn't be overwritten externally
        delete updates._docId;
        delete updates._id;
        delete updates.__v;
        delete updates.createdAt;
        delete updates.updatedAt;

        const siteData = await SiteData.findOneAndUpdate(
            { _docId: 'main' },
            { $set: updates },
            { new: true, upsert: true, runValidators: true }
        );

        res.json(cleanDoc(siteData));
    } catch (error) {
        console.error('Error updating site data:', error);
        res.status(500).json({ error: 'Failed to update site data.' });
    }
});

module.exports = router;
