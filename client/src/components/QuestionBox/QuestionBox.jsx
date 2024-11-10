import React from 'react';

const QuestionBox = ({ question }) => {
  if (!question) return null; // Return early if question is undefined

  const getTagColor = (tag) => {
    switch (tag) {
      case 'DSA': return 'bg-red-300 text-red-800';
      case 'Web-Dev': return 'bg-purple-300 text-purple-800';
      case 'Other': return 'bg-green-300 text-green-800';
      default: return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-[#242424] p-5 rounded-lg shadow-lg flex justify-between items-start mb-6">
      <div>

        <p className="text-white text-start text-sm mb-2">Asked by: {question.askedBy}</p>

        <h2 className="text-xl font-semibold text-start py-4 text-white mb-2">{question.questionTitle}</h2>

        <p className="text-gray-500 text-sm text-start">Posted on: {question.timePosted}</p>

      </div>


      <div className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold  ${getTagColor(question.tag)}  whitespace-nowrap`}>
        {question.tag}
      </div>

      
    </div>
  );
};

export default QuestionBox;
