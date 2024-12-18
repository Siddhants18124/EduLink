import React from "react";
import Background from '../../assets/bg.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import Logo from '../../assets/logo.png';
import { useState } from "react";
import axios from 'axios';



const Login = () => {

    const dispatch = useDispatch();

    const history = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const sendRequest = async () => {
        const res = axios.post('http://localhost:8000/api/login', {
            email: inputs.email,
            password: inputs.password,
        }).catch(err =>
            console.log("LOG ERROR:",err.message),
        )
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => dispatch(authActions.login())).then(() => history("/home"));
    };

    return(
        <section className="login-form">

            <div className="bg_cover bg-center h-screen" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover'}}>

                <div className="app-name-logo navbar bg-transparent flex px-8">

                    <img src={Logo} className="w-11 mt-8 ml-8 h-10 rounded-full" alt="Logo" />
                    <h2 className="text-stone-50 mt-8 ml-2 text-2xl font-semibold">EduLink</h2>

                </div>

                <div className="form pt-48 pl-52">

                    <h1 className="text-6xl font-semibold text-stone-50 ">Welcome back<span className="text-7xl text-[#1D90F5]">.</span></h1>

                    <p className="text-s text-stone-50 pt-5">Don't have an account ? <span className="text-[#1D90F5] underline underline-offset-2"> <Link to="/signup">Register now</Link> </span></p>

                    <form onSubmit={handleSubmit} action="/submit"  method="POST">

                        <div className="form-group pt-10 pb-2 ">
                            <input className="text-white w-[29.5rem] h-14 p-3  bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" 
                            type="email"
                            id="email"
                            value={inputs.email}
                            onChange={handleChange}
                            name="email" 
                            placeholder="Email" 
                            required></input>
                        </div>

                        <div className="form-group pt-1 pb-2">
                            <input className="text-white  shadow-input w-[29.5rem] h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" 
                            type="password" 
                            id="password"
                            value={inputs.password}
                            onChange={handleChange}
                            name="password" 
                            placeholder="Password" 
                            required></input>
                        </div>

                        <div className="flex space-x-4 pt-6">

                            <button 
                            className="bg-[#1D90F5] text-neutral-50 w-[14rem] h-12 px-4 py-2 rounded-full hover:bg-blue-600 transition" type="submit">
                                Login
                            </button>
  
                        </div>


                    </form>


                </div>

                {/* <div className="w-28 h-28 fixed bg-[#1D90F5] -mt-36 ml-[80%] rounded-full"></div> */}

            </div>
            
        </section>
    );
}

export default Login;   