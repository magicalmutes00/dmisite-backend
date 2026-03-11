const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    // Common fields
    type: { type: String, enum: ['sports', 'college'], required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },

    // Sports Day fields
    gender: { type: String, enum: ['Boy', 'Girl', ''] },
    houseName: { type: String },
    studentName: { type: String },
    gameName: { type: String },

    // College Day fields
    teamName: { type: String },
    teamHeadName: { type: String },
    eventName: { type: String },
    selectedGroups: { type: String },
    staffInCharge: { type: String },
    songName: { type: String },
    songType: { type: String },
    choreographer: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Registration', RegistrationSchema);
