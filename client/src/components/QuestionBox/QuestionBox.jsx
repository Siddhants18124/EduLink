import React from 'react';

const QuestionBox = ({ question }) => {
  if (!question) return null; // Return early if question is undefined

  const getTagColor = (tag) => {
    switch (tag) {
      case 'DSA': return 'bg-red-300 text-red-800';
      case 'Web-Dev': return 'bg-purple-300 text-purple-800';
      case 'Other': return 'bg-green-300 text-green-800';
      case 'JWT': return 'bg-blue-300 text-green-800';
      default: return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-[#242424] p-5 rounded-lg shadow-lg flex justify-between items-start mb-6">
      <div>

        <p className="text-white text-start text-sm mb-2">Asked by: {question.userId ? question.userId.firstName : 'Unknown'}</p>

        <h2 className="text-xl font-semibold text-start py-4 text-white mb-2">{question.title}</h2>

        <p className="text-gray-500 text-sm text-start">Posted on: {new Date(question.createdAt).toLocaleDateString()}</p>

      </div>


      <div className="flex">
      {question.subjectTags.map((tag, index) => (
          <div
            key={index}
            className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold  ${getTagColor(question.subjectTags)}  whitespace-nowrap`}
          >
            {tag}
          </div>
        ))}
      </div>
      {/* <div className="flex flex-wrap gap-2 mt-4">
        
      </div> */}
      
    </div>
  );
};

export default QuestionBox;
