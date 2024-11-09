import React from 'react';

const Ask = () => {
    return (
        <div className='2xl:w-2/5 lg:w-2/5 md:w-1/2 sm:w-3/4 h-14 
        bg-[#242424] rounded-lg mt-14 flex items-center px-4'>
            <input
                type="text"
                placeholder="Search or Ask questions..."
                className='bg-transparent text-white flex-grow outline-none'
            />
            <button className='bg-blue-500 px-4 py-2 rounded-full ml-2'>
                Ask Question
            </button>
        </div>
    );
};

export default Ask;
