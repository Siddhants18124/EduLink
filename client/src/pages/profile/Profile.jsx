import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import ProfilePic from '../../assets/ketan.jpg';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store";
import { useNavigate } from 'react-router-dom';
// import TagModal from '../../components/tagModal/TagModal'; // Import the TagModal component
// import QuestionBox from '../../components/QuestionBox/QuestionBox';
import axios from 'axios';
axios.defaults.withCredentials = true;
let firstRender = true;

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const refreshToken = async () => {
        const res = await axios.get('http://localhost:8000/api/refresh', {
            withCredentials: true,
        }).catch(err => console.log(err));


        const data = await res.data;
        return data;
    }


    const sendRequest = async () => {
        const res = await axios.get('http://localhost:8000/api/profile', {
            withCredentials: true,
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    useEffect(() => {
        // Fetch user data on component mount
        const fetchData = async () => {
            setLoading(true);
            const data = await sendRequest();
            if (data) {
                setUser(data.user);
            }
            setLoading(false);
        };
        fetchData();

        // Refresh token every 29 seconds
        const interval = setInterval(() => {
            refreshToken().then((data) => {
                if (data) setUser(data.user);
            });
        }, 1000 * 29);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);


    const sendLogoutReq = async () => {
        const res = await axios.post("http://localhost:8000/api/logout", null, {
          withCredentials: true,
        });
        if (res.status === 200) {
          return res;
        }
        return new Error("Unable TO Logout. Please try again");
      };

    const handleLogout =   () => {
        sendLogoutReq().then(() => dispatch(authActions.logout()));
        navigate("/login");
      };



    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col'>

            {/* -----------------------------Navbar--------------------------------------------- */}
            <Navbar />
            {/* ---------------------------------------------Main Div---------------------------------------------------------------------- */}
            <div className='flex'>
 

                {/* Profile Section */}
                <div className='flex flex-col basis-1/3'>

                    {/* Profile Image */}
                    <div>
                        <img src={ProfilePic} className="w-1/2 m-auto mt-12 rounded-full" alt="Profile" />
                    </div>

                    {/* Profile Details */}
                    <h3 className='ml-[25%] text-2xl text-white font-semibold pt-8'>
                        { user.firstName} {user.lastName}
                    </h3>

                    {/* Cabin details */}
                    <p className='ml-[25%] text-md text-white'> 
                        {user.batch} {user.year}
                    </p>

                    <button onClick={handleLogout} to="/login"  className='bg-red-700 ml-[25%] w-20 mt-8 py-2 rounded-lg text-white font-semibold'>
                        Logout
                    </button>

                </div>


                {/* ----------------------------------------Right panel------------------------------------------ */}
                <div className='basis-2/3 flex flex-col'>
                    {/* Add Repository Section */}
                    <div className='flex'>
                        <div className='2xl:w-2/5 lg:w-2/5 md:w-1/2 sm:w-3/4 h-10 bg-[#242424] rounded-lg flex items-center px-4'>
                            <input
                                type="text"
                                placeholder="Add repository contributors"
                                className='bg-transparent text-white flex-grow outline-none'
                            />
                        </div>
                        <button className='bg-blue-500 px-14 py-2 rounded-lg ml-8 text-white font-semibold'>
                            Add
                        </button>
                    </div>
                    {/* Queries to answer content */}
                    <p className='pt-12 pb-4 text-md text-white font-semibold' >Queries to answer</p>


                </div>







            </div>

        </div>
    );
};

export default Profile;
