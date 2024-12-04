import React from 'react';
import { Link } from 'react-router-dom';

const ResourceBox = ({ resource }) => {
  if (!resource) return null;

  return (
    <div className="bg-[#242424] p-5 rounded-lg shadow-lg flex justify-between items-start mb-6">
      <div>
        <p className="text-white text-start text-sm mb-2">
          Uploaded by: {resource.userId ? resource.userId.firstName + ' ' + resource.userId.lastName : 'Unknown'}
        </p>
        <Link to={`/resources/${resource._id}`} className="text-xl font-semibold text-start py-4 text-white mb-2">
          {resource.title}
        </Link>
        <p className="text-gray-500 text-sm text-start">
          Uploaded on: {new Date(resource.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 ">
        {resource.subjectTags?.map((tag, index) => (
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

export default ResourceBox;
