import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Ask from '../../components/SearchBars/Ask';
import Navbar from "../../components/navbar/Navbar";
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import questionsData from '../../components/databse.json';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (questionsData && Array.isArray(questionsData)) {
            setQuestions(questionsData);
        }
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col '>
            <Navbar />
            <div className='flex justify-center items-center mt-16'>
                <h1 className='md:text-7xl font-bold text-white text-center text-5xl'>Questions</h1>
            </div>
            <div className=" flex w-full flex-col  items-center">
                <Ask />
            </div>

            {/* Filter Icon */}
            <div>
            <button onClick={toggleDropdown} className='bg-[#242424] ml-12 mt-6 mr-2 lg:hidden text-white p-3 rounded-full'>
                <FaFilter />
            </button><span className='text-white font-semibold text-md lg:hidden'>Filters</span>

            {/* Filter Dropdown for mobile view */}
            {isDropdownOpen && (
                <div className='absolute bg-[#242424] text-white rounded-lg ml-12 m-2 shadow-lg'>
                    <button
                        className={`block w-full text-left px-4 py-2 ${filter === 'All' ? 'bg-[#3b82f6]' : 'hover:bg-[#3b82f6]'}`}
                        onClick={() => { setFilter('All'); toggleDropdown(); }}
                    >
                        All
                    </button>
                    <button
                        className={`block w-full text-left px-4 py-2 ${filter === 'Answered' ? 'bg-[#3b82f6]' : 'hover:bg-[#3b82f6]'}`}
                        onClick={() => { setFilter('Answered'); toggleDropdown(); }}
                    >
                        Answered
                    </button>
                    <button
                        className={`block w-full text-left px-4 py-2 ${filter === 'Unanswered' ? 'bg-[#3b82f6]' : 'hover:bg-[#3b82f6]'}`}
                        onClick={() => { setFilter('Unanswered'); toggleDropdown(); }}
                    >
                        Unanswered
                    </button>
                </div>
            )}
            </div>

            <div className='w-full lg:flex mt-20 justify-between items-start '>
                {/* Left Filter (Show only above 1200px) */}
                <div className='basis-1/4 flex-col items-center text-center hidden lg:flex'>
                    <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'>Recent question</button>
                    <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'>My question</button>
                </div>

                {/* Questions */}
                <div className='basis-2/4 text-center w-4/5 items-center mx-auto'>
                    {questions
                        .filter((question) => {
                            if (filter === 'All') return true;
                            if (filter === 'Answered') return question.status === 'Answered';
                            if (filter === 'Unanswered') return question.status === 'Unanswered';
                            return true;
                        })
                        .map((question) => (
                            <QuestionBox key={question.id} question={question} />
                        ))
                    }
                </div>

                {/* Right Filter (Show only above 1200px) */}
                <div className='basis-1/4 flex-col items-center text-center hidden lg:flex'>
                    <button
                        className={`bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl ${filter === 'All' ? 'bg-[#3b82f6]' : 'hover:bg-[#3b82f6]'}`}
                        onClick={() => setFilter('All')}
                    >
                        All
                    </button>
                    <button
                        className={`bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl ${filter === 'Answered' ? 'bg-[#3b82f6]' : 'hover:bg-[#3b82f6]'}`}
                        onClick={() => setFilter('Answered')}
                    >
                        Answered
                    </button>
                    <button
                        className={`bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl ${filter === 'Unanswered' ? 'bg-[#3b82f6]' : 'hover:bg-[#3b82f6]'}`}
                        onClick={() => setFilter('Unanswered')}
                    >
                        Unanswered
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Question;
