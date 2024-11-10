import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import ProfilePic from '../../assets/ketan.jpg';
import TagModal from '../../components/tagModal/TagModal'; // Import the TagModal component
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import questionsData from '../../components/databse.json';


const Profile = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (questionsData && Array.isArray(questionsData)) {
            setQuestions(questionsData);
        }
    }, []);

    // Toggle tag selection
    const handleToggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col'>

            {/* -----------------------------Navbar--------------------------------------------- */}
            <Navbar />

            {/* ---------------------------------------------Main Div---------------------------------------------------------------------- */}
            <div className='flex'>

                
                {/* Profile Section */}
                <div className='flex flex-col basis-1/3'>

                    {/* Profile Image */}
                    <div>
                        <img src={ProfilePic} className="w-1/2 m-auto mt-12 rounded-full" alt="Profile" />
                    </div>

                    {/* Profile Details */}
                    <h3 className='ml-[25%] text-2xl text-white font-semibold pt-8'>
                        Dr. Nishtha Phutela
                    </h3>

                    {/* Cabin details */}
                    <p className='ml-[25%] text-md text-white'>
                        Cabin No: 10
                    </p>

                    {/* Tags */}
                    <div className='ml-[25%] mt-4 flex flex-wrap gap-2'>
                        {selectedTags.map((tag, index) => (
                            <span key={index} className="bg-amber-900  text-white px-3 py-2 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gray-700 text-white rounded-full w-8 h-8 p-3 flex items-center justify-center text-lg"
                        >
                            +
                        </button>
                    </div>
                    
                    {isModalOpen && (
                        <TagModal
                            onClose={() => setIsModalOpen(false)}
                            onToggleTag={handleToggleTag}
                            selectedTags={selectedTags}
                        />
                    )}
                    
                </div>
                

                {/* ----------------------------------------Right panel------------------------------------------ */}
                <div className='basis-2/3 flex flex-col'>
                    {/* Add Repository Section */}
                    <div className='flex'>
                        <div className='2xl:w-2/5 lg:w-2/5 md:w-1/2 sm:w-3/4 h-10 bg-[#242424] rounded-lg flex items-center px-4'>
                            <input
                                type="text"
                                placeholder="Add repository contributors"
                                className='bg-transparent text-white flex-grow outline-none'
                            />
                        </div>
                        <button className='bg-blue-500 px-14 py-2 rounded-lg ml-8 text-white font-semibold'>
                            Add
                        </button>
                    </div>
                    {/* Queries to answer content */}
                    <p className='pt-12 pb-4 text-md text-white font-semibold' >Queries to answer</p>

                    <div className='text-center w-4/5 items-center '>
                    {questions
                        .filter((question) => question.status === "Unanswered" && selectedTags.includes(question.tag))
                        .map((question) => (
                            <QuestionBox key={question.id} question={question} status="Unanswered" />
                        ))
                    }
                </div>
                    
                </div>







            </div>

        </div>
    );
};

export default Profile;
