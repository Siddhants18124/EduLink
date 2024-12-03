const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RepliesSchema = new Schema({  
    questionId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    body : {
        type: String, required: true    
    },
    createdAt: {
        type: Date, default: Date.now
    },
    upvotes: {
        type: Number, default: 0
    },
    subComments:[
         {
            userId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
            },
            body: {
                type: String, required: true
            },
            createdAt: {
                type: Date, default: Date.now
            }
         }
    ]
});

module.exports = mongoose.model('Reply', RepliesSchema);
