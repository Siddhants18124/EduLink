import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import ProfilePic from '../../assets/ketan.jpg';


const Profile = () => {
    return (
        <div className='bg-[#151515] w-full min-h-screen flex flex-col'>
            <Navbar/>

            <div className='flex '>
                <div className='flex flex-col basis-1/3'>
                    <div className=''>
                        <img src={ProfilePic} className=" w-1/2 m-auto mt-12 rounded-full" alt="Profile" />
                    </div>
                    <h3 className='ml-[25%] text-2xl text-white font-semibold pt-8'>
                        Dr. Nishtha Phutela
                    </h3>
                    <p className='ml-[25%] text-md text-white'>
                        Cabin No: 10
                    </p>
                </div>

                <div className='basis-2/3'>
                    <h1>hello</h1>
                </div>

            </div>


        </div>
    );
};

export default Profile;