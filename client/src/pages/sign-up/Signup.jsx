import Background from '../../assets/bg.jpg'
import Logo from '../../assets/logo.png';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const history = useNavigate();
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        batch: "",
        year: "",
    });

    const [error, setError] = useState(""); // State for errors

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const determineRole = (email) => {
        const studentEmailRegex = /^.+\.(\d{2})([a-zA-Z]+)@bmu\.edu\.in$/; // Student email
        const facultyEmailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@bmu\.edu\.in$/; // Faculty email
    
        if (studentEmailRegex.test(email)) {
            return 'student'; // If the email matches student format, return 'student'
        }
        if (facultyEmailRegex.test(email)) {
            return 'faculty'; // If the email matches faculty format, return 'faculty'
        }
        return null; // Return null if the email format doesn't match any known formats
    };
    

    const sendRequest = async () => {
        const role = determineRole(inputs.email);
    
        if (!role) {
            setError('Invalid email format. Please check your email.');
            return;
        }
    
        try {
            const res = await axios.post('http://localhost:8000/api/signup', {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                email: inputs.email,
                password: inputs.password,
                batch: inputs.batch,
                year: inputs.year,
                role: role, // Pass the inferred role here
            });
            return res.data;
        } catch (err) {
            console.log(err);
            setError('Signup failed. Please try again.');
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Reset error state
        sendRequest().then(() => history("/login"));
    };
    return (
        <section className="signup-form">

            {/* Background image */}
            <div className="bg_cover bg-center h-screen" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}>
                <div className="app-name-logo navbar bg-transparent flex px-8">
                    <img src={Logo} className="w-11 mt-8 ml-8 h-10 rounded-full" alt="Logo" />
                    <h2 className="text-stone-50 mt-8 ml-2 text-2xl font-semibold">EduLink</h2>
                </div>

                <div className="form pt-28 pl-52">

                    <h1 className="text-6xl font-semibold text-stone-50 ">Create new account<span className="text-7xl text-[#1D90F5]">.</span></h1>

                    <p className="text-s text-stone-50 pt-5">Already A Member? <span className="text-[#1D90F5] underline underline-offset-2"> <Link to="/login">Log In</Link> </span></p>

                    <form onSubmit={handleSubmit}>

                        <div className="flex pt-4 pb-2">


                            <div className="form-group mr-3 ">
                                <input className="w-[14.35rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                    type="text"
                                    id="firstName"
                                    value={inputs.firstName}
                                    onChange={handleChange}
                                    name="firstName"
                                    placeholder="First name"
                                    required></input>
                            </div>

                            <div className="form-group">
                                <input className="w-[14.35rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                    type="text"
                                    id="lastName"
                                    value={inputs.lastName}
                                    onChange={handleChange}
                                    name="lastName"
                                    placeholder="Last name"
                                    required></input>
                            </div>
                        </div>


                        <div className="form-group pt-1 pb-2 ">
                            <input className="w-[29.5rem] text-stone-50 h-14 p-3  bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                type="email"
                                id="email"
                                value={inputs.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="Email"
                                required></input>
                        </div>

                        <div className="form-group pt-1 pb-2">
                            <input className=" shadow-input w-[29.5rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                type="password"
                                id="password"
                                value={inputs.password}
                                onChange={handleChange}
                                name="password"
                                placeholder="Password"
                                required></input>
                        </div>

                        <div className="flex pt-1 pb-2">


                            <div className="form-group mr-3 ">
                                <input className="w-[14.35rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                    type="text"
                                    id="batch"
                                    value={inputs.batch}
                                    onChange={handleChange}
                                    name="batch"
                                    placeholder="Batch ( eg. BTECH)"
                                    required></input>
                            </div>

                            <div className="form-group">
                                <input className="w-[14.35rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                    type="text"
                                    id="year"
                                    value={inputs.year}
                                    onChange={handleChange}
                                    name="year"
                                    placeholder="Year ( eg. 2021 )"
                                    required></input>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-6">

                            <button className="bg-[#1D90F5] text-neutral-50 w-[14rem] h-12 px-4 py-2 rounded-full hover:bg-blue-600 transition" type="submit">
                                Sign Up
                            </button>


                        </div>


                    </form>


                </div>

                {/* <div className="w-28 h-28 fixed bg-[#1D90F5] -mt-36 ml-[80%] rounded-full"></div>
                 */}
            </div>

        </section>
    );
};

export default Signup;