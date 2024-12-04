const User = require("../model/Users");
const Repo = require('../model/Repo');


const addContentToRepo = async (req, res) => {
    const { title, body, links, imageUrl, subjectTags } = req.body;
    const userId = req.user.id; // Authenticated user ID from middleware

    try {
        const user = await User.findById(userId);
        if (!user || (user.role !== 'faculty' && user.role !== 'alumni')) {
            return res.status(403).json({ status: false, message: "Unauthorized: Only faculty or alumni can add content to the repository" });
        }

        const newRepoContent = new Repo({
            userId,
            title,
            body,
            links,
            imageUrl,
            subjectTags,
        });

        await newRepoContent.save();
        return res.status(201).json({ status: true, message: "Content added successfully", repoContent: newRepoContent });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error adding content to repository" });
    }
};

const addContributor = async (req, res) => {
    try {
        const { contributorId } = req.body;

        // Ensure only faculty or admin can add contributors
        if (!["faculty", "admin"].includes(req.user.role)) {
            return res.status(403).json({ status: false, message: "Unauthorized: Only faculty or admin can add contributors" });
        }

        // Add the contributor to the list of authorized users
        const user = await User.findById(contributorId);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (!["student", "alumni"].includes(user.role)) {
            return res.status(400).json({ status: false, message: "Only students or alumni can be added as contributors" });
        }

        // Check if already a contributor
        const existingContributor = await Repo.findOne({ contributors: contributorId });
        if (existingContributor) {
            return res.status(400).json({ status: false, message: "User is already a contributor" });
        }

        const repository = await Repo.findOne();
        repository.contributors.push(contributorId);
        await repository.save();

        return res.status(200).json({ status: true, message: "Contributor added successfully", repository });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Error adding contributor" });
    }
};

const addResource = async (req, res) => {
    try {
        const { title, body, subjectTags } = req.body;

        // Ensure the user is a contributor
        const repository = await Repo.findOne();  // You may want to check specific repo by ID
        if (!repository.contributors.includes(req.user.id)) {
            return res.status(403).json({
                status: false,
                message: "Unauthorized: Only contributors can add content to the repository"
            });
        }

        // Proceed with adding resource to the repository
        const newResource = new Repo({
            userId: req.user.id,
            title,
            body,
            subjectTags,
            contributors: [req.user.id]  // Add the current user as a contributor (if needed)
        });

        await newResource.save();
        return res.status(201).json({ status: true, message: "Resource added successfully", resource: newResource });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Error adding resource" });
    }
};



const getRepoContentById = async (req, res) => {
    const { repoId } = req.params;

    try {
        // Find the repository content by its ID
        const repoContent = await Repo.findById(repoId).populate('userId', 'firstName lastName email').populate('contributors', 'firstName lastName email');

        if (!repoContent) {
            return res.status(404).json({ status: false, message: "Repository content not found" });
        }

        return res.status(200).json({ status: true, message: "Repository content retrieved successfully", repoContent });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error retrieving repository content" });
    }
};

const voteRepo = async (req, res) => {
    const { repoId } = req.params;
    const { voteType } = req.body; // `voteType` should be either 'upvote' or 'downvote'

    try {
        // Find the repository by ID
        const repo = await Repo.findById(repoId);

        if (!repo) {
            return res.status(404).json({ status: false, message: "Repository not found" });
        }

        // Update the upvote count based on voteType
        if (voteType === 'upvote') {
            repo.upvotes += 1;
        } else if (voteType === 'downvote' && repo.upvotes > 0) {
            repo.upvotes -= 1;
        } else {
            return res.status(400).json({ status: false, message: "Invalid vote type or cannot downvote below zero" });
        }

        await repo.save();

        return res.status(200).json({
            status: true,
            message: `Repository ${voteType}d successfully`,
            upvotes: repo.upvotes,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error processing vote" });
    }
};

// Fetch All Resources
const getAllResources = async (req, res) => {
    try {
        const resources = await Repo.find().populate('userId', 'email firstName lastName');  // Populate userId with email
        return res.status(200).json({ status: true, resources });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Error fetching resources" });
    }
};


module.exports = { addContentToRepo, addContributor, getRepoContentById, voteRepo ,addResource, getAllResources};