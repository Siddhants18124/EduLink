import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Importing the delete icon from react-icons

const ResourceBox = ({ resource, onDelete }) => {
  if (!resource) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      onDelete(resource._id); // Call the delete function passed via props
    }
  };

  return (
    <div className="bg-[#242424] p-5 rounded-lg shadow-lg flex justify-between items-start mb-6">
      <div>
        <p className="text-white text-start text-sm mb-2">
          Uploaded by: {resource.userId ? resource.userId.firstName : 'Unknown'}
        </p>
        <Link to={`/resource/${resource._id}`} className="text-xl font-semibold text-start py-4 text-white mb-2">
          {resource.title}
        </Link>
        <p className="text-gray-500 text-sm text-start mb-4">
          {resource.description || 'No description available.'}
        </p>
        <p className="text-gray-500 text-sm text-start">
          Uploaded on: {new Date(resource.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {resource.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-300 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={handleDelete}
        className="ml-4 text-red-500 hover:text-red-700 transition"
        aria-label="Delete Resource"
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default ResourceBox;
