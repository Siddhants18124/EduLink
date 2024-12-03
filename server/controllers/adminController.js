const User = require("../model/Users");
const Repo = require('../model/Repo');
const Question = require('../model/Question');

const removeContributor = async (req, res) => {
    try {
        const { contributorId } = req.body;

        if (!["faculty", "admin"].includes(req.user.role)) {
            return res.status(403).json({ status: false, message: "Unauthorized: Only faculty or admin can remove contributors" });
        }

        const repository = await Repo.findOne();
        repository.contributors = repository.contributors.filter((id) => id.toString() !== contributorId);
        await repository.save();

        return res.status(200).json({ status: true, message: "Contributor removed successfully", repository });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Error removing contributor" });
    }
};


const deleteRepoContent = async (req, res) => {
    const { repoId } = req.params;
    const userId = req.user.id; // Authenticated user ID from middleware

    try {
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ status: false, message: "Unauthorized: Only admins can delete repository content" });
        }

        const deletedRepo = await Repo.findByIdAndDelete(repoId);
        if (!deletedRepo) {
            return res.status(404).json({ status: false, message: "Repository content not found" });
        }

        return res.status(200).json({ status: true, message: "Repository content deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error deleting repository content" });
    }
};


const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const userId = req.user.id; // Authenticated user ID from middleware

    try {
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ status: false, message: "Unauthorized: Only admins can delete questions" });
        }

        const deletedQuestion = await Question.findByIdAndDelete(questionId);
        if (!deletedQuestion) {
            return res.status(404).json({ status: false, message: "Question not found" });
        }

        return res.status(200).json({ status: true, message: "Question deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error deleting question" });
    }
};


const changeUserRole = async (req, res) => {
    const { userIdToChange, newRole } = req.body;
    const userId = req.user.id; // Authenticated user ID from middleware

    try {
        const user = await User.findById(userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ status: false, message: "Unauthorized: Only admins can change user roles" });
        }

        const targetUser = await User.findById(userIdToChange);
        if (!targetUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        targetUser.role = newRole;
        await targetUser.save();

        return res.status(200).json({ status: true, message: "User role updated successfully", user: targetUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Error updating user role" });
    }
};


module.exports = {  deleteRepoContent, deleteQuestion, changeUserRole, removeContributor };