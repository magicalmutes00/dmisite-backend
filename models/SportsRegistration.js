const mongoose = require('mongoose');

const SportsRegistrationSchema = new mongoose.Schema({
    gender:      { type: String, enum: ['Boy', 'Girl'], required: true },
    houseName:   { type: String, required: true },
    studentName: { type: String, required: true },
    year:        { type: String, required: true },
    department:  { type: String, required: true },
    gameName:    { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SportsRegistration', SportsRegistrationSchema);
