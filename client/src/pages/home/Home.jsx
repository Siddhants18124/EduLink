import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom'; 
import Banner from '../../assets/study.png'; 

const Home = () => {
    return(
        <section className="home-page bg-[#151515] w-full h-svh">
            <Navbar/>
            <div className="home_title flex px-28 mt-11 overflow-hidden">
                <div className="title-text">
                    <h1 className="title text-8xl ml-28 mt-24 text-white font-bold">We make your doubt's clear</h1>
                    <p className="desc ml-28 mt-8 text-[#fffefec7] ">A platform where all the students can clear their doubt  by faculty/alumni or seniors. And get the latest study material.</p>
                    <button className="ml-28 mt-11 bg-blue-500 p-4 w-44 rounded-full text-white font-semibold"><Link to="/question" className="font-semibold">Ask question</Link></button>
                </div>
                <img src={Banner} className="mr-[2.1rem]" alt="" srcset="" />
            </div>
        </section>
    );
}

export default Home;