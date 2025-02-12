import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import subjects from '../subjects.json'; // Import subjects JSON file

const RepoPost = ({ setSearchQuery }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [links, setLinks] = useState('');
    const [subjectTags, setSubjectTags] = useState([]);
    const [isPosting, setIsPosting] = useState(false);

    const handleTagClick = (tag) => {
        setSubjectTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const handleCancel = () => {
        setTitle('');
        setBody('');
        setLinks([]);
        setSubjectTags([]);
        setIsPosting(false);
        setIsExpanded(false);
    };

    const toggleBox = () => {
        setIsExpanded(!isExpanded);
    };

    const token = cookie.get("Token");

    const handlePost = async () => {
        setIsPosting(true);
        try {
            const linksArray = links.split(',').map((link) => link.trim());
            console.log({
                title,
                body,
                links: linksArray,
                subjectTags,
            }); // Log payload
    
            const response = await axios.post(
                'http://localhost:8000/api/repo/repo',
                {
                    title,
                    body,
                    links: linksArray,
                    subjectTags,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            console.log('Resource posted:', response.data);
            handleCancel();
        } catch (error) {
            console.error('Error posting question:', error);
        } finally {
            setIsPosting(false);
        }
    };
    


    return (
        <div
            className={`2xl:w-2/5 lg:w-2/5 md:w-1/2 sm:w-3/4 ${isExpanded ? 'h-auto' : 'h-16'
                } bg-[#242424] rounded-lg mt-14 flex flex-col px-4 py-3 relative transition-all duration-300`}
        >
            {!isExpanded && (
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Search or Search repo..."
                        className="bg-transparent text-white flex-grow outline-none"
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button
                        onClick={toggleBox}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Post resources
                    </button>
                </div>
            )}

            {isExpanded && (
                <div className="flex flex-col w-full space-y-2">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#1a1a1a] text-white outline-none rounded-md px-3 py-2"
                    />
                    <textarea
                        placeholder="Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full bg-[#1a1a1a] text-white outline-none rounded-md px-3 py-2 resize-none"
                        rows={3}
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Links"
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                        className="w-full p-2 rounded-lg bg-[#1a1a1a] text-white"
                    />

                    {/* Tags Section - Dynamically Render Tags from subjects.json */}
                    <div className="flex items-center w-3/4 space-x-1 flex-wrap">
                        {subjects.map((tag) => (
                            <span
                                key={tag.name}
                                onClick={() => handleTagClick(tag.name)}
                                className={`cursor-pointer px-3 py-1 my-1 rounded-full text-sm ${subjectTags.includes(tag.name) ? 'bg-blue-500' : 'bg-gray-500 text-gray-200'}`}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                            Back
                        </button>
                        <button
                            onClick={handlePost}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            {isPosting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoPost;
