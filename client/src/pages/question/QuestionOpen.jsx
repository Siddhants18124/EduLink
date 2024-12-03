import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionOpen = () => {
    const { questionId } = useParams(); // Get questionId from the URL
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`/api/question/questions/${questionId}`); // Adjust your API endpoint
                if (response.data.status) {
                    setQuestion(response.data.question);
                }
            } catch (err) {
                console.error('Error fetching question details:', err);
            }
        };

        fetchQuestion();
    }, [questionId]);

    if (!question) {
        return <p className="text-white">Loading question details...</p>;
    }

    return (
        <div className="bg-[#151515] w-full min-h-screen flex flex-col text-white p-10">
            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="text-gray-400 mb-6 hover:text-gray-200"
            >
                &larr; Back
            </button>

            {/* Question Details */}
            <div className="bg-[#242424] p-6 rounded-lg shadow-md">
                <span className="bg-red-500 text-xs px-3 py-1 rounded-full">
                    {question.tag}
                </span>
                <h1 className="text-2xl font-semibold mt-4">{question.title}</h1>
                <p className="text-sm text-gray-400 mt-2">
                    Asked by: {question.userId?.firstName} {question.userId?.lastName}
                </p>

                {/* Replies */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Replies</h2>
                    {question.replies.map((reply) => (
                        <div
                            key={reply._id}
                            className="bg-[#1a1a1a] p-4 rounded-lg mb-4 text-white"
                        >
                            <p>{reply.content}</p>
                            <p className="text-sm text-gray-400 mt-2">
                                By: {reply.userId?.firstName} {reply.userId?.lastName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionOpen;
