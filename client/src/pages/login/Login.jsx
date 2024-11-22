import React from "react";
import Background from '../../assets/bg.jpg'
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const payload = {
            email: email,
            password: password,
        }

        axios.post('http://localhost:8000/user/login', payload)
            .then((res) => {
                setLoading(false)
                toast("Login successful");
                console.log("Login successful", res);
                localStorage.setItem('token', JSON.stringify(res.data.token));
                navigate("/")
            })
            .catch((err) => {
                toast("Login Failed");
                console.log("Error while login", err)
                setLoading(false)
            })

    }


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
                            <input className="w-[29.5rem] h-14 p-3  bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" 
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email" 
                            placeholder="Email" 
                            required></input>
                        </div>

                        <div className="form-group pt-1 pb-2">
                            <input className=" shadow-input w-[29.5rem] h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password" 
                            placeholder="Password" 
                            required></input>
                        </div>

                        <div className="flex space-x-4 pt-6">

                            <button 
                            disabled={loading}
                            className="bg-[#1D90F5] text-neutral-50 w-[14rem] h-12 px-4 py-2 rounded-full hover:bg-blue-600 transition" type="submit">
                                
                                {loading ? 'Submitting...' : 'Login'}

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