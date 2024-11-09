import React, { useEffect, useState } from 'react';
import Ask from '../../components/SearchBars/Ask';
import Navbar from "../../components/navbar/Navbar";
// import Filter from '../../components/Buttons/Filter';
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import questionsData from '../../components/databse.json';


const Question = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Load the data from JSON
        if (questionsData && Array.isArray(questionsData)) {
            setQuestions(questionsData);
        }
    }, []);

    return (
        <div className='bg-[#151515] w-full h-full flex flex-col items-center '>
            {/* -----------------------------Imported Navbar--------------------------------------------*/}
            <Navbar />

            {/* --------------------------------------Title-------------------------------------------- */}
            <h1 className='text-7xl font-bold text-white text-center mt-16'>
                Questions
            </h1>

            {/* ----------------------------------------SearchBar----------------------------------------------- */}
            <Ask />

            {/* -----------------------------------------Question box-------------------------------------------- */}
            <div
                className='w-full flex mt-20'>
                {/* ----------------------------------Left Filter-------------------------------------------- */}
                <div className='basis-1/4 text-center'>

                </div>


                {/* -----------------------------------Questions----------------------------------------- */}
                <div className='basis-2/4 text-center'>
                        {questions.length > 0 ? (
                            questions.map((question) => (
                                question && (
                                    <QuestionBox key={question.id} question={question} />
                                )
                            ))
                        ) : (
                            <p className="text-white text-center">No questions available</p>
                        )}
                </div>


                {/* ----------------------------------Right Filter------------------------------------------ */}
                <div className='basis-1/4 text-center'>
                
                </div>


            </div>

        </div>
    );
};

export default Question;
