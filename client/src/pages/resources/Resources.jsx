import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import ResourceBox from '../../components/ResourceBox/ResourceBox';
import questionsData from '../../components/databse.json';
import Repository from '../../components/SearchBars/Repository';
import { FaFilter } from 'react-icons/fa';
import subjects from '../../components/subjects.json'; // Import JSON file


const Resources = () => {
    const [resources, setResources] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        if (questionsData && Array.isArray(questionsData)) {
            setResources(questionsData);
        }
    }, []);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col '>
            <Navbar />
            <div className='flex justify-center items-center mt-16'>
                <h1 className='md:text-7xl font-bold text-white text-center text-5xl'>Resources</h1>
            </div>
            <div className="flex w-full flex-col items-center">
                <Repository />
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
            <div className='w-full lg:flex mt-20 justify-between items-start '>
                {/* Left Filter (Show only above 1200px) */}
                <div className='basis-1/4 flex-col items-center text-center hidden lg:flex'>
                    <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'>Recent content</button>
                    <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'>My content</button>
                </div>

                {/* Resources */}
                <div className='basis-2/4 text-center w-4/5 items-center lg:mr-auto mr-auto lg:ml-0 ml-auto'>
                    {resources
                        .filter((resource) => {
                            if (filter === 'All') return true;
                            if (filter === 'Answered') return resource.status === 'Answered';
                            if (filter === 'Unanswered') return resource.status === 'Unanswered';
                            return true;
                        })
                        .map((resource) => (
                            <ResourceBox key={resource.id} resource={resource} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Resources;
