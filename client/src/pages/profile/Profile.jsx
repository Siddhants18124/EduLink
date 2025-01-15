import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import ProfilePic from "../../assets/ketan.jpg";
import subjects from "../../components/subjects.json"; // Import subjects JSON file
import { FaPlus,FaMinus } from "react-icons/fa";

axios.defaults.withCredentials = true;

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [reportedUsers, setReportedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown state
  const [selectedTags, setSelectedTags] = useState([]); // Selected subject tags
  const navigate = useNavigate();
  const token = cookie.get("Token");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // const handleTagClick = (tag) => {
  //     setSelectedTags((prevTags) =>
  //         prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
  //     );
  // };

  const handleTagAdd = async (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);

    try {
      // Send updated tags to the backend
      const response = await axios.put(
        "http://localhost:8000/api/update-subjects",
        { subjects: updatedTags },
        { withCredentials: true }
      );

      if (response.data.status) {
        setUser((prevUser) => ({
          ...prevUser,
          subjects: response.data.subjects, // Update subjects in the user state
        }));
      }
    } catch (error) {
      console.error("Failed to update subjects:", error);
    }
  };
  const handleTagRemove = async (tag) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/remove-subjects",
        {
          id: user.id,
          subjects: [tag],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status) {
        // Remove the tag from the selectedTags state immediately
        setSelectedTags((prevTags) => prevTags.filter((subject) => subject !== tag));
        // Remove the tag from the user.subjects state as well
        setUser((prevUser) => ({
          ...prevUser,
          subjects: prevUser.subjects.filter((subject) => subject !== tag),
        }));
        // alert("Tag removed successfully!");
      } else {
        alert(response.data.message || "Failed to remove tag.");
      }
    } catch (error) {
      console.error("Error removing tag:", error);
      alert("Error removing tag.");
    }
  };
  
  
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/profile", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReportedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        // Filter to only keep one report per user ID
        const uniqueReports = [];
        const seenUserIds = new Set();

        res.data.forEach((report) => {
          if (!seenUserIds.has(report.reportedUserId._id)) {
            uniqueReports.push(report);
            seenUserIds.add(report.reportedUserId._id);
          }
        });

        setReportedUsers(uniqueReports);
      }
    } catch (err) {
      console.error("Error fetching reported users:", err);
    }
  };


  const fetchBlockedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/blocked", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setBlockedUsers(res.data); // Fetches blocked users
      }
    } catch (err) {
      console.error("Error fetching blocked users:", err);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/block",
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200 && res.data.message === "User blocked successfully") {
        setReportedUsers((prev) =>
          prev.filter((user) => user.reportedUserId._id !== userId)
        ); // Remove the blocked user from the reported list
        fetchBlockedUsers(); // Update blocked list
        alert("User blocked successfully.");
      }
    } catch (err) {
      console.error("Error blocking user:", err);
      alert("Failed to block user.");
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/unblock",
        { userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200 && res.data.message === "User unblocked successfully") {
        setBlockedUsers((prev) => prev.filter((user) => user._id !== userId)); // Remove unblocked user from blocked list
        alert("User unblocked successfully.");
      }
    } catch (err) {
      console.error("Error unblocking user:", err);
      alert("Failed to unblock user.");
    }
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout", null, { withCredentials: true })
      .then(() => {
        dispatch(authActions.logout());
        navigate("/login");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const profileData = await sendRequest();
      if (profileData) setUser(profileData.user);
      setLoading(false);
    };

    fetchData();
    fetchReportedUsers();
    fetchBlockedUsers();
  }, []);

  return (
    <div className="bg-[#151515] w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        {/* Profile Section */}
        {/* Profile Section */}
        <div
          className={`flex flex-col ${user.role !== "admin" ? "items-center justify-center w-full" : "basis-1/3"
            }`}
        >
          <img
            src={ProfilePic}
            className={`${user.role !== "admin" ? "w-56 h-56" : "w-1/2 m-auto"
              } mt-12 rounded-full`}
            alt="Profile"
          />
          <h3
            className={`${user.role !== "admin" ? "text-center p-1" : "ml-[25%]"
              } text-2xl text-white font-semibold pt-8`}
          >
            {user.firstName} {user.lastName}
          </h3>
          <p
            className={`${user.role !== "admin" ? "text-center p-1" : "ml-[25%]"
              } text-md text-white`}
          >
            Batch: {user.batch} Year: {user.year}
          </p>
          <p
            className={`${user.role !== "admin" ? "text-center p-1" : "ml-[25%]"
              } text-md text-white`}
          >
            User ID: {user._id}
          </p>
          <p
            className={`${user.role !== "admin" ? "text-center p-1" : "ml-[25%]"
              } text-md text-white`}
          >
            Email: {user.email}
          </p>
          <p
            className={`${user.role !== "admin" ? "text-center p-1" : "ml-[25%]"
              } text-md text-white`}
          >
            Role: {user.role}
          </p>
          <h3 className="text-white text-lg font-semibold">Your Subjects:</h3>
         {/* Display selected subjects for faculty */}
      {user.role === "faculty" && user.subjects?.length > 0 && (
        <div className=" mt-4">
          <div className="flex flex-wrap w-65 mt-2">
            {user.subjects.map((subject) => (
              <span
                key={`subject-${subject}`}
                className="bg-blue-500 text-white px-3 py-1 m-1 rounded-full"
              >
                {subject}
                <FaMinus
                  onClick={() => handleTagRemove(subject)}
                  className="ml-2 text-white cursor-pointer"
                  size={16}
                />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown with Tags (Only visible for faculty) */}
      {user.role === "faculty" && (
        <div className="mt-4">
          <button
            onClick={toggleDropdown}
            className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            {showDropdown ? "Hide Subject Tags" : "Select Subject Tags"}
            <FaPlus className="ml-2" size={16} />
          </button>
          {showDropdown && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs mt-2">
              <p className="text-white mb-2">Select Subject Tags:</p>
              <div className="flex flex-wrap">
                {subjects.map((subject) => (
                  <span
                    key={`dropdown-${subject.name}`}
                    onClick={() => handleTagAdd(subject.name)}
                    className={`cursor-pointer px-3 py-1 m-1 rounded-full text-sm ${
                      selectedTags.includes(subject.name) || user.subjects?.includes(subject.name)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-gray-200"
                    }`}
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
          <button
            onClick={handleLogout}
            className={`bg-red-700 ${user.role !== "admin" ? "mt-6" : "ml-[25%] mt-8"
              } w-20 py-2 rounded-lg text-white font-semibold`}
          >
            Logout
          </button>
        </div>


        {/* Admin Panel */}
        {user.role === "admin" && (
          <div className="basis-2/4 ml-[10%] mt-4">
            {/* Single Reported User */}
            <h2 className="text-white text-2xl font-semibold mb-4">
              Reported User
            </h2>
            {reportedUsers.length > 0 ? (
              reportedUsers.map((report) => (
                <div
                  key={report._id}
                  className="bg-gray-800 p-4 mb-2 rounded-md flex justify-between items-center"
                >
                  <div className="text-white">
                    <p>
                      {report.reportedUserId.firstName} {report.reportedUserId.lastName}
                    </p>
                    <p>User ID: {report.reportedUserId._id}</p>
                    <p>Email: {report.reportedUserId.email}</p>
                  </div>
                  <div className="flex">
                    {report.reportedUserId.isBlocked ? (
                      <button
                        onClick={() => handleUnblockUser(report.reportedUserId._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(report.reportedUserId._id)}
                        className="bg-red-700 text-white px-4 py-2 rounded-md"
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white">No reported users found.</p>
            )}


            {/* Blocked Users */}
            <h2 className="text-white text-2xl font-semibold mt-6 mb-2">
              Blocked Users
            </h2>
            {blockedUsers.length > 0 ? (
              blockedUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-800 p-4 mb-2 rounded-md flex justify-between items-center"
                >
                  <div className="text-white">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p>User ID: {user._id}</p>
                    <p>Email: {user.email}</p>
                  </div>
                  <button
                    onClick={() => handleUnblockUser(user._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Unblock
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white">No blocked users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
