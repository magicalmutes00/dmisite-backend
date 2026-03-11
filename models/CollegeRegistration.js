const mongoose = require('mongoose');

const CollegeRegistrationSchema = new mongoose.Schema({
    teamName:       { type: String, required: true },
    teamHeadName:   { type: String, required: true },
    year:           { type: String, required: true },
    department:     { type: String, required: true },
    eventName:      { type: String, required: true },
    selectedGroups: { type: String },
    staffInCharge:  { type: String },
    songName:       { type: String },
    songType:       { type: String },
    choreographer:  { type: String },
    submittedAt:    { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CollegeRegistration', CollegeRegistrationSchema);
