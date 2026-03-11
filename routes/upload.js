const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { verifyToken } = require('../middleware/auth');

// Configure Cloudinary (uses env vars set in index.js)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // folder must come from query param — req.body is not yet parsed when multer runs
        const folder = req.query.folder || 'college-day/general';
        return {
            folder: folder,
            resource_type: 'image',
            format: 'webp', // Convert all uploads to WebP for efficiency
            transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]
        };
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed.'), false);
        }
    }
});

// POST /api/upload
// Protected - upload a single image to Cloudinary
// FormData: file (image), folder (optional, e.g. "schedules", "gallery", "leaders")
router.post('/', verifyToken, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided.' });
        }

        res.json({
            url: req.file.path,             // Cloudinary secure URL
            publicId: req.file.filename      // Cloudinary public_id (e.g. "college-day/gallery/abc123")
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed.' });
    }
});

// DELETE /api/upload/:publicId
// Protected - delete an image from Cloudinary
router.delete('/:publicId', verifyToken, async (req, res) => {
    try {
        const publicId = req.params.publicId;
        await cloudinary.uploader.destroy(publicId);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete image.' });
    }
});

module.exports = router;
