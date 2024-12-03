import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa'; // Importing trash icon

const QuestionOpen = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [newReply, setNewReply] = useState(""); // State for the new reply text
    const navigate = useNavigate(); // For redirecting after deletion

    const sendRequest = async () => {
        const res = await axios.get('http://localhost:8000/api/profile', {
            withCredentials: true,
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    // Fetch user data and question details
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await sendRequest();
            if (data) {
                setUser(data.user);
            }
            setLoading(false);
        };
        fetchData();

        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/question/questions/${questionId}`);
                if (response.data.status) {
                    setQuestion(response.data.question);
                }
            } catch (err) {
                console.error('Error fetching question details:', err);
            }
        };

        fetchQuestion();
    }, [questionId]);

    const handleDeleteQuestion = async () => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/admin/question/${questionId}`, {
                    withCredentials: true,
                });
    
                if (response.data.status) {
                    navigate(-1); // Go back to the previous page
                } else {
                    alert('Failed to delete the question.');
                }
            } catch (err) {
                console.error('Error deleting question:', err);
                alert('An error occurred while deleting the question.');
            }
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        if (!newReply) {
            return; // Prevent submission if reply text is empty
        }

        try {
            const response = await axios.post('http://localhost:8000/api/question/questions/reply', {
                questionId,
                body: newReply,
            }, {
                withCredentials: true,
            });

            if (response.data.status) {
                // Immediately update the state to add the new reply
                setQuestion(prevQuestion => ({
                    ...prevQuestion,
                    replies: [...prevQuestion.replies, response.data.reply],
                }));

                // Clear the reply input after submission
                setNewReply("");
            }
        } catch (err) {
            console.error('Error adding reply:', err);
        }
    };

    if (!question) {
        return <p className="text-white">Loading question details...</p>;
    }

    return (
        <div className="bg-[#151515] w-full min-h-screen flex flex-col text-white p-10">
            {/* Back Button */}
            <button onClick={() => window.history.back()} className="text-gray-400 mb-6 hover:text-gray-200 self-start">
                &larr; Go back
            </button>

            {/* Question Details */}
            <div className="bg-[#242424] p-6 rounded-lg shadow-md">
                {/* Tags */}
                {question.subjectTags && question.subjectTags.length > 0 && (
                    <span className="text-xs text-gray-400">
                        {question.subjectTags.map((tag, index) => (
                            <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2 inline-block">
                                {tag}
                            </span>
                        ))}
                    </span>
                )}

                {/* Title */}
                <h1 className="text-2xl font-bold mt-4">{question.title}</h1>

                {/* Question body */}
                <p className="text-gray-300 text-lg font-semibold">{question.body}</p>

                {/* Username */}
                <p className="text-xs text-gray-400 mt-4">
                    Asked by: {question.userId ? `${question.userId.firstName} ${question.userId.lastName}` : 'Unknown'}
                </p>

                {/* Delete Button for Admin */}
                {user.role === 'admin' && (
                    <button
                        onClick={handleDeleteQuestion}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition mt-4 flex items-center"
                    >
                        <FaTrash className="mr-2" />
                        Delete Question
                    </button>
                )}

                {/* Reply Box (only visible to faculty) */}
                {user.role === 'faculty' && (
                    <div className="mt-4">
                        <form onSubmit={handleReplySubmit}>
                            <input
                                type="text"
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                className="w-1/4 p-2 bg-[#1a1a1a] text-white rounded-md"
                                placeholder="Enter your reply..."
                            />
                            <button type="submit" className="bg-gray-500 text-white px-3 mx-2 py-2 rounded-lg">
                                Reply
                            </button>
                        </form>
                    </div>
                )}

                {/* Replies */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Replies</h2>
                    {question.replies && question.replies.length > 0 ? (
                        question.replies.map((reply) => (
                            <div key={reply._id} className="bg-[#1a1a1a] p-4 rounded-lg mb-4 text-white">
                                <p>{reply.body}</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    By: {reply.userId ? `${reply.userId.firstName} ${reply.userId.lastName}` : 'Unknown'}
                                </p>
                                <p className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No replies yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionOpen;
