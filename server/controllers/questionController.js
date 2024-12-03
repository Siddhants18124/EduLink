const Question = require('../model/Question');
const Reply = require('../model/Reply');
const jwt = require('jsonwebtoken');  // for JWT decoding

// Middleware to get the current user from the JWT token
const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  // verify the token
        return decoded.userId;  // Assuming userId is stored in the token
    } catch (err) {
        console.error("Token error:::",err.message);
        throw new Error("Invalid Token");
    }
};

// Create a question
const createQuestion = async (req, res) => {
    const { title, body, imageUrl, subjectTags } = req.body;

    try {
        // Get userId from the authenticated user (use the user ID from the token)
        const userId = req.user.id;

        // Create a new question
        const question = new Question({
            userId,
            title,
            body,
            imageUrl,
            subjectTags
        });

        await question.save();
        return res.status(201).json({ status: true, message: "Question created successfully", question });

    } catch (err) {
        console.error("Error creating question:", err);
        return res.status(400).json({ status: false, message: "Error creating question" });
    }
};


// Add a reply to a question
const addReply = async (req, res) => {
    const { questionId, body } = req.body;
    const userId = req.user.id;  // Get the userId from the middleware

    try {
        // Ensure that the userId is available
        if (!userId) {
            return res.status(400).json({ status: false, message: 'User is not authenticated' });
        }

        // Ensure that the question exists
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ status: false, message: 'Question not found' });
        }

        // Create the reply
        const newReply = new Reply({
            questionId,
            userId,   // Set the userId from the request
            body,
        });

        // Save the reply
        await newReply.save();

        // Add the reply to the question's replies array
        question.replies.push(newReply);
        await question.save();

        return res.status(201).json({
            status: true,
            message: 'Reply added successfully',
            reply: newReply,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Error adding reply' });
    }
};

// Add a sub-reply to a reply
const addSubReply = async (req, res) => {
    const { body, replyId } = req.body;
    const userId = req.user.id;  // This comes from the authMiddleware

    try {
        // Validate if the reply exists
        const parentReply = await Reply.findById(replyId);
        if (!parentReply) {
            return res.status(404).json({ status: false, message: "Reply not found" });
        }

        // Create the sub-reply
        const subReply = {
            userId,
            body,
        };

        // Add the sub-reply to the parent reply
        parentReply.subReplies.push(subReply);
        await parentReply.save();

        return res.status(201).json({ status: true, message: "Sub-reply added successfully", subReply });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error adding sub-reply" });
    }
};

// Upvote or downvote a reply
const voteReply = async (req, res) => {
    const { replyId, voteType } = req.body;  // voteType can be "upvote" or "downvote"
    const userId = req.userId;  // Get the userId from the middleware

    try {
        // Find the reply to vote on
        const reply = await Reply.findById(replyId);
        if (!reply) {
            return res.status(404).json({ status: false, message: 'Reply not found' });
        }

        // If the vote type is upvote
        if (voteType === 'upvote') {
            reply.upvotes += 1;
        } else if (voteType === 'downvote') {
            reply.upvotes -= 1;
        } else {
            return res.status(400).json({ status: false, message: 'Invalid vote type' });
        }

        await reply.save();

        return res.status(200).json({
            status: true,
            message: 'Reply voted successfully',
            reply,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: 'Error voting reply' });
    }
};

const getQuestions = async (req, res, next) => {
    try {
        // Get all questions
        const questions = await Question.find().populate('userId', 'firstName lastName email');  // Populating userId to get user details
        return res.status(200).json({ status: true, questions });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error fetching questions" });
    }
};

const getQuestionById = async (req, res, next) => {
    const { questionId } = req.params;

    try {
        // Get question by ID with populated replies and sub-replies
        const question = await Question.findById(questionId)
            .populate('userId', 'firstName lastName email')  // Populating userId to get user details
            .populate({
                path: 'replies',
                populate: {
                    path: 'userId',
                    select: 'firstName lastName email'
                }
            });

        if (!question) {
            return res.status(404).json({ status: false, message: "Question not found" });
        }

        return res.status(200).json({ status: true, question });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error fetching question details" });
    }
};


module.exports = {
    createQuestion,
    addReply,
    addSubReply,
    voteReply,
    getQuestions,
    getQuestionById
};
