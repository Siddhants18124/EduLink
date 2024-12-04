import React from 'react';

const AskRepo = ({ setSearchQuery }) => {
    return (
        <div className="2xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-3/4 bg-[#242424] rounded-lg mt-14 flex items-center px-4 py-4 relative transition-all duration-300">
            <input
                type="text"
                placeholder="Search your questions by title..."
                className="bg-transparent text-white flex-grow outline-none"
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
            />
        </div>
    );
};

export default AskRepo;
