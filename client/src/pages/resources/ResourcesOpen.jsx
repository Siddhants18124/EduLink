import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaFlag } from "react-icons/fa"; // Import Trash and Flag Icons
import cookie from "js-cookie";

const ResourceDetails = () => {
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportReason, setReportReason] = useState(""); // State for report reason
  const [showReportDropdown, setShowReportDropdown] = useState(false); // State for showing the dropdown
  const [user, setUser] = useState({});
  const token = cookie.get("Token");

  useEffect(() => {
    // Fetch the resource data using the resourceId
    axios
      .get(`http://localhost:8000/api/repo/repo/${resourceId}`)
      .then((response) => {
        setResource(response.data.repoContent);
        setLoading(false);
      })
      .catch((error) => {
        setError("Resource not found");
        setLoading(false);
      });

    // Fetch user data for roles
    const fetchUserData = async () => {
      const res = await axios.get("http://localhost:8000/api/profile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    };
    fetchUserData();
  }, [resourceId]);

  const handleVote = async (voteType) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/repo/repo/${resourceId}/vote`,
        { voteType },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.status) {
        setResource((prev) => ({
          ...prev,
          upvotes: response.data.upvotes,
        }));
      } else {
        console.error("Vote failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error voting on resource:", error);
    }
  };

  const handleDeleteResource = async () => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/admin/repo/${resourceId}`,
          { withCredentials: true }
        );
        if (response.data.status) {
          navigate(-1);
        } else {
          alert("Failed to delete the resource.");
        }
      } catch (err) {
        console.error("Error deleting resource:", err);
        alert("An error occurred while deleting the resource.");
      }
    }
  };

  const handleReportResource = async () => {
    if (!reportReason) {
      alert("Please select a reason for reporting.");
      return;
    }

    if (window.confirm("Are you sure you want to report this resource?")) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/report",
          {
            reportedUserId: resource.userId._id,
            reason: reportReason,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.message === "Resource reported successfully") {
          alert("Resource has been reported successfully.");
          setShowReportDropdown(false);
          setReportReason("");
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.error("Error reporting resource:", err);
        alert("An error occurred while reporting the resource.");
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

        {/* Report Button */}
        {(user.role === "faculty" || user.role === "student") && (
          <div className="mt-4">
            {!showReportDropdown ? (
              <button
                onClick={() => setShowReportDropdown(true)}
                className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-700 transition flex items-center"
              >
                <FaFlag className="mr-2" />
                Report Resource
              </button>
            ) : (
              <div className="flex items-center">
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="p-2 bg-[#1a1a1a] text-white rounded-md"
                >
                  <option value="">Select a reason</option>
                  <option value="Inappropriate content">Inappropriate content</option>
                  <option value="Spam">Spam</option>
                </select>
                <button
                  onClick={handleReportResource}
                  className="bg-yellow-500 text-white px-3 py-2 ml-2 rounded-lg hover:bg-yellow-700 transition"
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowReportDropdown(false)}
                  className="bg-gray-500 text-white px-3 py-2 ml-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Delete Button */}
        {user.role === "admin" && (
          <button
            onClick={handleDeleteResource}
            className="bg-red-700 text-white p-2 rounded-full hover:bg-red-600 mt-4 flex items-center"
          >
            <FaTrash className="mr-2" />
            Delete Resource
          </button>
        )}

        {/* Links */}
        <div className="flex flex-col mt-6">
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

        {/* Vote Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
            aria-label="Upvote"
            onClick={() => handleVote("upvote")}
          >
            ⬆️
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
            aria-label="Downvote"
            onClick={() => handleVote("downvote")}
          >
            ⬇️
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">Current votes: {resource.upvotes || 0}</p>
      </div>
    </div>
  );
};

export default ResourceDetails;
