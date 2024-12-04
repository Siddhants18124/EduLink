import React from 'react';
import { Link } from 'react-router-dom';

const QuestionBox = ({ question }) => {
  if (!question) return null;

  return (
    <div className="bg-[#242424] p-5 rounded-lg shadow-lg flex justify-between items-start mb-6">
      {/* Left Section */}
      <div className="flex-1">
        {/* Asked by */}
        <p className="text-white text-sm mb-2 block text-start">
          Asked by: {question.userId ? `${question.userId.firstName} ${question.userId.lastName}` : 'Unknown'}
        </p>

        {/* Title */}
        <Link
          to={`/question/${question._id}`}
          className="text-xl font-semibold text-white mb-2 block text-start"
        >
          {question.title}
        </Link>

        {/* Posted on */}
        <p className="text-gray-500 text-sm text-start">
          Posted on: {new Date(question.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {question.subjectTags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;
