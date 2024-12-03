const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    links: { type: [String], default: [] },
    imageUrl: { type: String, default: null },
    subjectTags: { type: [String], required: true },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of contributors
    upvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repo', repoSchema);