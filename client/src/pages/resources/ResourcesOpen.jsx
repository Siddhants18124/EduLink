import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon

const ResourceDetails = () => {
  const navigate = useNavigate();
  const { resourceId } = useParams(); // Get resource ID from route parameters
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Resource ID:", resourceId);

  useEffect(() => {
    // Fetch the resource data using the resourceId
    axios
      .get(`http://localhost:8000/api/repo/repo/${resourceId}`)
      .then((response) => {
        // console.log("Resource data:", response.data);
        setResource(response.data.repoContent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the resource:", error);
        setError("Resource not found");
        setLoading(false);
      });
  }, [resourceId]);

  const handleVote = async (type) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/repo/repo/${resourceId}/vote`,
        { type },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Vote API response:", response.data); // Log the response
      if (response.data.success) {
        setResource((prev) => ({
          ...prev,
          upvotes: response.data.upvotes, // Use correct key for upvotes
        }));
      } else {
        console.error("Vote failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error voting on resource:", error);
    }
  };

  const handleDeleteResource = async () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
        try {
            const response = await axios.delete(`http://localhost:8000/api/admin/repo/${resourceId}`, {
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
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen p-0 bg-black text-white flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#151515] w-full min-h-screen flex flex-col text-white p-10">
      {/* Back button */}
      <button
        className="text-gray-400 mb-6 hover:text-gray-200 self-start"
        onClick={() => window.history.back()}
      >
        &larr; Go back
      </button>

      <div className="bg-[#242424] p-6 rounded-lg shadow-md">
        {/* Tags */}
        {resource.subjectTags && resource.subjectTags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {resource.subjectTags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2 inline-block"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Title */}
        <h1 className="text-2xl font-bold mt-4">{resource.title}</h1>

        {/* Body */}
        <p className="text-gray-300 text-lg font-semibold">
          {resource.body || "No description available."}
        </p>

        {/* Posted by */}
        <p className="text-xs text-gray-400 mt-4">
          Posted by:{" "}
          {resource.userId
            ? `${resource.userId.firstName} ${resource.userId.lastName}`
            : "Unknown"}
        </p>

        {/* Uploaded Date */}
        <p className="text-sm text-gray-400 mb-6">
          Uploaded on: {new Date(resource.createdAt).toLocaleDateString()}
        </p>

        {/* Placeholder for Thumbnail */}
        <div className="flex flex-col">
          <div>
            {resource.links && resource.links.length > 0 ? (
              resource.links.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg mb-4 text-blue-400 underline block"
                >
                  {link}
                </a>
              ))
            ) : (
              <p className="text-gray-500">No links available</p>
            )}
          </div>

          {/* Like/Dislike Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
              aria-label="Upvote"
              onClick={() => handleVote("upvote")} // Upvote
            >
              ⬆️
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
              aria-label="Downvote"
              onClick={() => handleVote("downvote")} // Downvote
            >
              ⬇️
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Current votes: {resource.upvotes || 0}
          </p>
        </div>

        {/* Delete Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDeleteResource}
            className="bg-red-700 text-white p-2 rounded-full hover:bg-red-600"
            aria-label="Delete Resource"
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;
