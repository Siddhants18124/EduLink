import React from "react";
import { Link } from 'react-router-dom'; 
import Profile from '../../assets/ketan.jpg'; 
import Logo from '../../assets/logo.png'; 

const Navbar = () => {
    return (
        <section className="navbar w-full h-16 p-16  bg-transparent flex items-center justify-between px-8">
            <div className="flex items-center">
                <img src={Logo} className="w-11 h-11 ml-24 rounded-full" alt="Logo" />
                <span className="ml-4 text-white text-lg font-semibold">EduLink</span>
            </div>
            
            <ul className="flex space-x-10 text-white">

                <li className="cursor-pointer px-5">
                    <Link to="/" className=" font-semibold">Home</Link>
                </li>

                <li className="cursor-pointer px-5">
                    <Link to="/question" className=" font-semibold">Question</Link>
                </li>

                <li className="cursor-pointer px-5">
                    <Link to="/resources" className=" font-semibold">Resources</Link>
                </li>
                
            </ul>

            <div className="flex items-center">
                <img src={Profile} className="w-11 h-11 mr-24 rounded-full" alt="Profile" />
            </div>
        </section>
    );
};

export default Navbar;
