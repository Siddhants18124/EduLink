const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        required: false
    },    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);