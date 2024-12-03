const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({   
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 8
//     },
//     batch: { 
//         type: String,
//         required: true
//     },
//     year: {
//         type: String,
//         required: true
//     },
//     role: { 
//         type: String, 
//         enum: ["student", "faculty", "alumni", "admin"], 
//         required: false
//     },
//     subjects:{
//         type: [String],
//         default: function() {
//             return this.role === "faculty" ? [] : null;
//         },
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }   
// });

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
    subjects: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('User', userSchema);


// USER SCHEMA BASED ON CHAPTGPT AS WELL AS ACCORDING TO SOME OF THE REQUIREMENTS OF THE PROJECT

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 8
//     }, 
//  proiflePicUrl: {
//         type: String,
//         default: null
//     },
//     batch: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ["student", "faculty", "alumni", "admin"],
//         required: false
//     },
//     subjects: {
//         type: [String],
//         default: function() {
//             return this.role === "faculty" ? [] : null;
//         },
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Custom validation to set 'role' based on 'email'
// userSchema.pre('save', function(next) {
//     const email = this.email.toLowerCase();

//     if (/\.edu$/.test(email)) {
//         this.role = 'faculty';
//     } else if (/\.org$/.test(email)) {
//         this.role = 'alumni';
//     } else if (/\.com$/.test(email)) {
//         this.role = 'student';
//     } else {
//         this.role = 'admin';
//     }

//     next();
// });

// module.exports = mongoose.model('User', userSchema);
