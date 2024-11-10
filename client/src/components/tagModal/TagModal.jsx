import React, { useEffect, useState } from 'react';
import tagsData from '../tags.json'; // Adjust the path as needed

const TagModal = ({ onClose, onToggleTag, selectedTags }) => {
    const [availableTags, setAvailableTags] = useState([]);

    useEffect(() => {
        setAvailableTags(tagsData.subjects); // Load tags from JSON
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#242424] p-6 rounded-lg w-11/12 max-w-md text-center">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white mb-4">Subjects</h2>
                    <button
                        onClick={onClose}
                        className=" bg-red-500 text-white px-3 text-sm h-8 rounded">
                        X
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {availableTags.map((tag, index) => (
                        <button
                            key={index}
                            onClick={() => onToggleTag(tag.name)}
                            className={`${
                                selectedTags.includes(tag.name) ? tag.color : 'bg-[#3a3a3a]'
                            } text-white px-3 py-1 rounded-full text-sm cursor-pointer`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagModal;
