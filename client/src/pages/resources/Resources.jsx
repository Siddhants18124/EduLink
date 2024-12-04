import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import ResourceBox from '../../components/ResourceBox/ResourceBox';
import Repository from '../../components/SearchBars/RepoPost';
import { FaFilter } from 'react-icons/fa';
import subjects from '../../components/subjects.json'; // Import JSON file
import axios from 'axios';
import { Link } from 'react-router-dom';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Search functionality state
    const [loading, setLoading] = useState(true);
    console.log('Resources:', resources);
    // Fetch resources from API
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
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const filteredResources = resources
        .filter((resource) => {
            // Filter based on selected subject
            if (filter === 'All') return true;
            return resource.subjectTags && resource.subjectTags.includes(filter);
        })
        .filter((resource) => {
            // Filter based on search query
            return resource.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col'>
            <Navbar />

            {/* Page Title */}
            <div className='flex justify-center items-center mt-16'>
                <h1 className='md:text-7xl font-bold text-white text-center text-5xl'>Resources</h1>
            </div>

            {/* Search Bar */}
            <div className="flex w-full flex-col items-center">
                <Repository setSearchQuery={setSearchQuery} />
            </div>

            {/* Filter Dropdown */}
            <div>
                <button onClick={toggleDropdown} className='bg-[#242424] ml-[25%] mt-6 text-white p-3 rounded-full'>
                    <FaFilter />
                </button>
                <span className='text-white font-semibold text-md lg:hidden'>Filters</span>

                {isDropdownOpen && (
                    <div className='absolute bg-[#242424] p-4 rounded-lg text-white grid grid-cols-3 gap-4 ml-80 mt-2 shadow-lg'>
                        <button
                            onClick={() => setFilter('All')}
                            className={`px-4 py-2 rounded-full font-semibold ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'}`}
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

            {/* Resources Section */}
            <div className='w-full flex mt-20 lg:justify-start justify-center items-start'>
                {/* Sidebar (Visible only for large screens) */}
                <div className='basis-1/4 flex-col items-center text-center hidden lg:flex'>
                    <button
                        onClick={() => setFilter('All')}
                        className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'
                    >
                        Recent Content
                    </button>
                    <button
                        onClick={() => setFilter('My Content')}
                        className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'
                    >
                        My Content
                    </button>
                </div>

                <div className='basis-2/4 text-center w-4/5 items-center'>
                    {filteredResources.map((resource) => (
                        <Link key={resource._id} to={{
                            pathname: `/resources/${resource._id}`,
                        }}>
                            <ResourceBox resource={resource} />
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
