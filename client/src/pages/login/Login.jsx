import React, { useState } from "react";
import Background from '../../assets/bg.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import Logo from '../../assets/logo.png';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const sendRequest = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/login', {
                email: inputs.email,
                password: inputs.password,
            });

            return res.data;
        } catch (err) {
            console.error("Login Error:", err.message);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await sendRequest();

        if (data) {
            if (data.status === "blocked") {
                alert(data.message || "You have been blocked by the admin.");
            } else {
                dispatch(authActions.login());
                navigate("/home");
            }
        } else {
            alert("You have been blocked by the admin.");
        }
    };

    return (
        <section className="login-form">
            <div className="bg_cover bg-center h-screen" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover' }}>
                <div className="app-name-logo navbar bg-transparent flex px-8">
                    <img src={Logo} className="w-11 mt-8 ml-8 h-10 rounded-full" alt="Logo" />
                    <h2 className="text-stone-50 mt-8 ml-2 text-2xl font-semibold">EduLink</h2>
                </div>
                <div className="form pt-48 pl-52">
                    <h1 className="text-6xl font-semibold text-stone-50">Welcome back<span className="text-7xl text-[#1D90F5]">.</span></h1>
                    <p className="text-s text-stone-50 pt-5">Don't have an account? <span className="text-[#1D90F5] underline underline-offset-2"><Link to="/signup">Register now</Link></span></p>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="form-group pt-10 pb-2">
                            <input
                                className="text-white w-[29.5rem] h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                type="email"
                                id="email"
                                value={inputs.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group pt-1 pb-2">
                            <input
                                className="text-white shadow-input w-[29.5rem] h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]"
                                type="password"
                                id="password"
                                value={inputs.password}
                                onChange={handleChange}
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="flex space-x-4 pt-6">
                            <button
                                className="bg-[#1D90F5] text-neutral-50 w-[14rem] h-12 px-4 py-2 rounded-full hover:bg-blue-600 transition"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
