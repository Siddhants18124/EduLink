import React from "react";
import Background from '../../assets/bg.jpg'
import "./signup.css";
import Logo from '../../assets/logo.png'; 
import { Link } from "react-router-dom";

const Signup = () => {
    return(
        <section className="signup-form">

            {/* Background image */}
            <div className="bg_cover bg-center h-screen" style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover'}}>
                <div className="app-name-logo navbar bg-transparent flex px-8">
                    <img src={Logo} className="w-11 mt-8 ml-8 h-10 rounded-full" alt="Logo" />
                    <h2 className="text-stone-50 mt-8 ml-2 text-2xl font-semibold">EduLink</h2>
                </div>

                <div className="form pt-48 pl-52">

                    <h1 className="text-6xl font-semibold text-stone-50 ">Create new account<span className="text-7xl text-[#1D90F5]">.</span></h1>

                    <p class="text-s text-stone-50 pt-5">Already A Member? <span className="text-[#1D90F5] underline underline-offset-2"> <Link to="/login">Log In</Link> </span></p>

                    <form action="/submit"  method="POST">
                        <div className="flex pt-10 pb-2">

                            <div class="form-group mr-3 ">
                                <input className="w-[14.35rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" type="text" name="first_name" placeholder="First name" required></input>
                            </div>
                            
                            <div class="form-group">
                                <input className="w-[14.35rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" type="text" name="last_name" placeholder="Last name" required></input>
                            </div>
                        </div>

                        <div class="form-group pt-1 pb-2 ">
                            <input className="w-[29.5rem] text-stone-50 h-14 p-3  bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" type="email" name="email" placeholder="Email" required></input>
                        </div>

                        <div class="form-group pt-1 pb-2">
                            <input className=" shadow-input w-[29.5rem] text-stone-50 h-14 p-3 bg-[#2c2c2c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1D90F5]" type="password" name="password" placeholder="Password" required></input>
                        </div>

                        <div className="flex space-x-4 pt-6">

                            <button className="bg-[#1D90F5] text-neutral-50 w-[14rem] h-12 px-4 py-2 rounded-full hover:bg-blue-600 transition" type="submit"><Link to="/">Register now</Link></button>
                           

                        </div>


                    </form>


                </div>

                {/* <div className="w-28 h-28 fixed bg-[#1D90F5] -mt-36 ml-[80%] rounded-full"></div>
                 */}
            </div>

        </section>
    );
}

export default Signup;