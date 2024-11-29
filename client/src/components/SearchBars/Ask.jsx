import React from 'react';

const Ask = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [question, setQuestion] = React.useState('');

    const toggleBox = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePost = () => {
        if (title && question) {
            setTitle('');
            setQuestion('');
            setIsExpanded(false);
        } else {
            alert('Please fill in both fields');
        }
    };

    const handleCancel = () => {
        setTitle('');
        setQuestion('');
        setIsExpanded(false);
    };

    return (
        <div
            className={`2xl:w-2/5 lg:w-2/5 md:w-1/2 sm:w-3/4 ${
                isExpanded ? 'h-auto' : 'h-14'
            } bg-[#242424] rounded-lg mt-14 flex flex-col px-4 py-3 relative transition-all duration-300`}
        >
            {!isExpanded && (
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Search or Ask questions..."
                        className="bg-transparent text-white flex-grow outline-none"
                    />
                    <button
                        onClick={toggleBox}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Ask Question
                    </button>
                </div>
            )}

            {isExpanded && (
                <div className="flex flex-col w-full space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#1a1a1a] text-white outline-none rounded-md px-3 py-2"
                    />
                    <textarea
                        placeholder="Body"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full bg-[#1a1a1a] text-white outline-none rounded-md px-3 py-2 resize-none"
                        rows={3}
                    ></textarea>

                    {/* Tags Section */}
                    <div className="flex items-center space-x-2">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            DSA
                        </span>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                            COA
                        </span>
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                            MFE-1
                        </span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                            Web-Dev
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-3 py-2 rounded-lg"
                        >
                            Back
                        </button>
                        <button
                            onClick={handlePost}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Post
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ask;
