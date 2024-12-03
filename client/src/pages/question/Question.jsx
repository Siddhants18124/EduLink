import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import Ask from '../../components/SearchBars/Ask';
import Navbar from "../../components/navbar/Navbar";
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import axios from 'axios';
import subjects from '../../components/subjects.json'; // Import JSON file
import { Link } from 'react-router-dom';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    console.log('User Role:', user.role);

    const sendRequest = async () => {
        const res = await axios.get('http://localhost:8000/api/profile', {
            withCredentials: true,
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    useEffect(() => {
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
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const filteredQuestions = questions
        .filter((q) => {
            if (filter === 'My Questions') {
                return q.userId.email === user.email;
            }
            return filter === 'All' || q.subjectTags.includes(filter);
        })
        .filter((q) => q.title.toLowerCase().includes(searchQuery.toLowerCase())); // Filter by search query

    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col'>
            <Navbar />

            <div className='flex justify-center items-center mt-16'>
                <h1 className='md:text-7xl font-bold text-white text-center text-5xl'>Questions</h1>
            </div>

            <div className="flex w-full flex-col items-center">
                <Ask setSearchQuery={setSearchQuery} />
            </div>

            <div>
                <button onClick={toggleDropdown} className='bg-[#242424] ml-80 mt-6 text-white p-3 rounded-full'>
                    <FaFilter />
                </button>
                <span className='text-white font-semibold text-md lg:hidden'>Filters</span>

                {isDropdownOpen && (
                    <div className='absolute bg-[#242424] p-4 rounded-lg text-white grid grid-cols-3 gap-4 ml-80 mt-2 shadow-lg'>
                        <button
                            onClick={() => setFilter('All')}
                            className={`px-4 py-2 rounded-full font-semibold ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                                }`}
                        >
                            All
                        </button>
                        {subjects.map((subject) => (
                            <button
                                key={subject.name}
                                onClick={() => setFilter(subject.name)}
                                className={`px-4 py-2 rounded-full font-semibold ${subject.color}`}
                            >
                                {subject.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className='w-full lg:flex mt-20 items-start'>
                {/* Left Sidebar: My Question and Recent Question */}
                <div className='basis-1/4 flex-col items-center text-center hidden lg:flex'>
                    <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'
                        onClick={() => setFilter('All')}>
                        Recent question
                    </button>
                    <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'
                        onClick={() => setFilter('My Questions')}>
                        My question
                    </button>
                </div>
                <div className='basis-2/4 text-center w-4/5 items-center'>
                    {filteredQuestions.map((question) => (
                        <Link key={question._id}   to={{
                            pathname: `/question/${question._id}`,
                            state: { userRole: user.role }  // Ensure you pass the user role in the state
                        }}>
                            <QuestionBox question={question} />  
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Question;
