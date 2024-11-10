import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom'; 
import Banner from '../../assets/study.png'; 

const Home = () => {
    return(
        <section className="home-page bg-[#151515] w-full h-svh">

            {/* Imported Navbar */}
            <Navbar/>

            {/* -------------------------Landing page content---------------------- */}
            <div className="
            home_title flex
            2xl:px-28 xl:px-24 lg:px-24 md:px-16
            mt-11 overflow-hidden">
                
                {/* -------------------------Left content----------------------- */}

                <div className="title-text basis-4/5 h-full">
                    
                    {/* ----------------------Title------------------------ */}
                    <h1 className="title 
                    2xl:text-8xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl
                    2xl:ml-28 xl:ml-20 lg:ml-14 md:ml-14 sm:ml-20 
                    sm:w-4/5
                    2xl:mt-24 xl:mt-24 lg:mt-20 md:mt-16 sm:mt-20
                    text-white font-bold">We make your doubt's clear</h1>

                    {/* ---------------------Sub title------------------------- */}
                    <p className="desc 
                    2xl:ml-28 xl:ml-20 lg:ml-14 md:ml-14 sm:ml-20 
                    2xl:mt-8 xl:mt-8 lg:mt-8 md:mt-6 sm:mt-6
                    2xl:text-lg xl:text-lg lg:text-base sm:text-xl sm:w-3/4 text-[#fffefec7] ">
                        A platform where all the students can clear their doubt  by faculty/alumni or seniors. And get the latest study material.
                    </p>

                    {/* -------------------------Button------------------------- */}
                    <button className="
                    2xl:ml-28 xl:ml-20 lg:ml-14 md:ml-14 sm:ml-20
                    2xl:mt-11 xl:mt-11 lg:mt-8 md:mt-6 sm:mt-11
                    p-4 w-44
                    bg-blue-500 rounded-full text-white font-semibold">
                        <Link to="/question" className="font-semibold">Ask question</Link>
                    </button>
                
                    
                </div>
                    
                {/* Right content ------------------BANNER IMAGE--------------*/}
                <img srcSet={Banner} 
                className="
                basis-1/5
                h-full
                mt-16
                2xl:w-[36rem] xl:w-[28rem] lg:w-[23rem] md:w-[20rem] sm:hidden md:block 
                " alt="" />

            </div>
        </section>
    );
}

export default Home;

