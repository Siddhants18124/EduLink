const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    batch: { type: String, required: true },
    year: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["student", "faculty", "alumni", "admin"], 
        required: true,
        default: "student" // Default role
    },
    status: { 
        type: String, 
        enum: ["active", "blocked"], 
        default: "active" // Default status
    },
    subjects: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

