// import React, { useEffect, useState } from 'react';
// import Navbar from "../../components/navbar/Navbar";
// import QuestionBox from '../../components/QuestionBox/QuestionBox';
// import questionsData from '../../components/databse.json';
// import Repository from '../../components/SearchBars/Repository';

// const Resources = () => {
//     const [questions, setQuestions] = useState([]);
//     const [filter, setFilter] = useState('All');

//     useEffect(() => {
//         if (questionsData && Array.isArray(questionsData)) {
//             setQuestions(questionsData);
//         }
//     }, []);

//     return (
//         <div className='bg-[#151515] w-full min-h-screen flex flex-col '>
//             <Navbar />
//             <div className='flex justify-center items-center mt-16'>
//                 <h1 className='md:text-7xl font-bold text-white text-center text-5xl'>Resources</h1>
//             </div>
//             <div className=" flex w-full flex-col  items-center">
//                 <Repository />
//             </div>

//             <div className='w-full lg:flex mt-20 justify-between items-start '>
//                 {/* Left Filter (Show only above 1200px) */}
//                 <div className='basis-1/4 flex-col items-center text-center hidden lg:flex'>
//                     <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'>Recent content</button>
//                     <button className='bg-[#242424] text-white font-semibold w-1/2 p-3 m-2 rounded-2xl hover:bg-[#3b82f6]'>My content</button>
//                 </div>

//                 {/* Questions */}
//                 <div className='basis-2/4 text-center w-4/5 items-center lg:mr-auto mr-auto lg:ml-0 ml-auto'>
//                         {questions
//                             .filter((question) => {
//                                 if (filter === 'All') return true;
//                                 if (filter === 'Answered') return question.status === 'Answered';
//                                 if (filter === 'Unanswered') return question.status === 'Unanswered';
//                                 return true;
//                             })
//                             .map((question) => (
//                                 <QuestionBox key={question.id} question={question} />
//                             ))
//                         }
//                 </div>
            
//             </div>
//         </div>
//     );
// };

// export default Resources;
