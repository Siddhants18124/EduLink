import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Profile from '../../assets/ketan.jpg';
import Logo from '../../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="navbar w-full h-16 p-20 bg-transparent flex items-center justify-between px-8 relative">
            <Link to="/home" className="font-semibold">
                <div className="flex items-center">
                    <img src={Logo} className="w-11 h-11 ml-4 md:ml-24 rounded-full" alt="Logo" />
                    <span className="ml-4 text-white text-lg font-semibold">EduLink</span>
                </div>
            </Link>
            {/* Desktop Menu */}
            <ul className="hidden lg:flex space-x-10 text-white">
                <li className="cursor-pointer px-5">
                    <Link to="/home" className="font-semibold">Home</Link>
                </li>
                <li className="cursor-pointer px-5">
                    <Link to="/question" className="font-semibold">Question</Link>
                </li>
                <li className="cursor-pointer px-5">
                    <Link to="/resources" className="font-semibold">Resources</Link>
                </li>
            </ul>

            <div className="hidden lg:flex items-center">
                <Link to="/Profile">
                    <img src={Profile} className="w-11 h-11 mr-4 md:mr-24 rounded-full" alt="Profile" />
                </Link>
            </div>

            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex items-center z-30">
                <button onClick={toggleMenu} className="text-white text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 z-30 w-60 h-full bg-blue-500 text-white flex flex-col items-center pt-10 transition-transform transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden`}
            >
                {/* Close Button inside the Mobile Menu */}
                <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-2xl">
                    <FaTimes />
                </button>
                
                <Link to="/" className="text-lg p-2 font-semibold hover:text-black mt-12" onClick={toggleMenu}>Home</Link>
                <Link to="/question" className="text-lg hover:text-black p-2 font-semibold" onClick={toggleMenu}>Question</Link>
                <Link to="/resources" className="text-lg hover:text-black p-2 font-semibold" onClick={toggleMenu}>Resources</Link>
                <Link>  </Link>
            </div>
        </section>
    );
};

export default Navbar;
