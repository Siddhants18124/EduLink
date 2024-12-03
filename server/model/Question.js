const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    imageUrl: { type: String, default: null },
    subjectTags: { type: [String], default: [] },
    replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            body: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            subReplies: [
                {
                    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                    body: { type: String, required: true },
                    createdAt: { type: Date, default: Date.now }
                }
            ]
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);