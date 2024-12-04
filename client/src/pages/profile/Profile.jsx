import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import ProfilePic from '../../assets/ketan.jpg';
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import subjects from '../../components/subjects.json'; // Import subjects JSON file
import { FaPlus } from "react-icons/fa";
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import AskProfile from '../../components/SearchBars/AskProfile';
import AskRepo from '../../components/SearchBars/AskRepo';
import ResourceBox from '../../components/ResourceBox/ResourceBox';

axios.defaults.withCredentials = true;

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState([]);
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // Dropdown state
    const [selectedTags, setSelectedTags] = useState([]); // Selected subject tags
    const [showAdminContent, setShowAdminContent] = useState(false); // To toggle admin content visibility
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const [filteredQuestions, setFilteredQuestions] = useState([]); // Store filtered questions
    const [filteredResources, setFilteredResources] = useState([]); // Store filtered questions

    const refreshToken = async () => {
        const res = await axios.get('http://localhost:8000/api/refresh', { withCredentials: true }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    const sendRequest = async () => {
        const res = await axios.get('http://localhost:8000/api/profile', { withCredentials: true }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    };

    // Effect to filter questions based on searchQuery and user email
    useEffect(() => {
        if (user.role === 'admin') {
            // If admin, fetch all questions
            setFilteredQuestions(questions.filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase())));
            setFilteredResources(resources.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase())));
        } else {
            // If student, filter based on logged-in user's email
            setFilteredQuestions(questions.filter(q =>
                q.userId.email === user.email && q.title.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, questions, user.email, user.role]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8000/api/repo/repo');
                if (response.data && response.data.resources) {
                    setResources(response.data.resources);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching resources:', error);
                setLoading(false);
            }
        };
        fetchResources();

        const fetchData = async () => {
            setLoading(true);
            const data = await sendRequest();
            if (data) {
                setUser(data.user);
            }
            setLoading(false);
        };
        fetchData();

        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/question/questions');
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();

        const interval = setInterval(() => {
            refreshToken().then((data) => {
                if (data) setUser(data.user);
            });
        }, 1000 * 29);

        return () => clearInterval(interval);
    }, []);

    const sendLogoutReq = async () => {
        const res = await axios.post("http://localhost:8000/api/logout", null, { withCredentials: true });
        if (res.status === 200) {
            return res;
        }
        return new Error("Unable TO Logout. Please try again");
    };

    const handleLogout = () => {
        sendLogoutReq().then(() => dispatch(authActions.logout()));
        navigate("/login");
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleTagClick = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    // Log for debugging search query updates
    useEffect(() => {
        console.log("Search Query: ", searchQuery);
    }, [searchQuery]);

    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col'>
            {/* Navbar */}
            <Navbar />

            {/* Main Div */}
            <div className='flex'>
                {/* Profile Section */}
                <div className='flex flex-col basis-1/3'>
                    {/* Profile Image */}
                    <div>
                        <img src={ProfilePic} className="w-1/2 m-auto mt-12 rounded-full" alt="Profile" />
                    </div>

                    {/* Profile Details */}
                    <h3 className='ml-[25%] text-2xl text-white font-semibold pt-8'>
                        {user.firstName} {user.lastName}
                    </h3>

                    {/* Batch and Year */}
                    <p className='ml-[25%] text-md text-white'>
                        {user.batch} {user.year}
                    </p>

                    {/* Plus Icon (Only visible for faculty) */}
                    {user.role === 'faculty' && (
                        <div className='ml-[25%] mt-4 flex items-center'>
                            <FaPlus
                                onClick={toggleDropdown}
                                className='text-white bg-gray-700 p-1 rounded-full cursor-pointer hover:bg-blue-500'
                                size={24}
                            />
                        </div>
                    )}

                    {/* Dropdown with Tags (Only visible for faculty) */}
                    {user.role === 'faculty' && showDropdown && (
                        <div className='ml-[25%] mt-2 bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs'>
                            <p className='text-white mb-2'>Select Tags:</p>
                            <div className='flex flex-wrap'>
                                {subjects.map((subject) => (
                                    <span
                                        key={subject.name}
                                        onClick={() => handleTagClick(subject.name)}
                                        className={`cursor-pointer px-3 py-1 m-1 rounded-full text-sm ${selectedTags.includes(subject.name)
                                            ? subject.color
                                            : 'bg-gray-500 text-gray-200'
                                            }`}
                                    >
                                        {subject.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button onClick={handleLogout} className='bg-red-700 ml-[25%] w-20 mt-8 py-2 rounded-lg text-white font-semibold'>
                        Logout
                    </button>

                    {/* Admin-only content */}
                    {user.role === 'admin' && (
                        <div className='ml-[25%] mt-4'>
                            <button
                                onClick={() => setShowAdminContent('questions')}
                                className='bg-blue-500 text-white px-4 py-2 rounded-md mr-4'
                            >
                                Questions
                            </button>
                            <button
                                onClick={() => setShowAdminContent('resources')}
                                className='bg-green-500 text-white px-4 py-2 rounded-md'
                            >
                                Resources
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Panel */}
                <div className='basis-2/4 flex flex-col'>
                    {user.role === 'student' && (
                        <>
                            {/* Always show AskProfile component */}
                            <AskProfile setSearchQuery={setSearchQuery} />
                            <h2 className='text-white text-2xl font-semibold mt-4 mb-4'>Your Questions</h2>
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question) => (
                                    <QuestionBox key={question._id} question={question} />
                                ))
                            ) : (
                                <p className='text-white'>No questions posted yet.</p>
                            )}
                        </>
                    )}

                    {/* Admin-specific content */}
                    {user.role === 'admin' && showAdminContent === 'questions' && (
                        <>
                            <AskProfile setSearchQuery={setSearchQuery} />
                            <h2 className='text-white text-2xl font-semibold mt-4 mb-4'>All Questions</h2>
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question) => (
                                    <QuestionBox key={question._id} question={question} />
                                ))
                            ) : (
                                <p className='text-white'>No questions found.</p>
                            )}
                        </>
                    )}

                    {/* Add similar code for Resources */}
                    {user.role === 'admin' && showAdminContent === 'resources' && (
                        <>
                            <AskRepo setSearchQuery={setSearchQuery} />
                            <h2 className='text-white text-2xl font-semibold mt-4 mb-4'>All Resources</h2>
                            {filteredResources.length > 0 ? (
                                filteredResources.map((resource) => (
                                    <ResourceBox key={resource._id} resource={resource} />
                                ))
                            ) : (
                                <p className='text-white'>No resource found.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
