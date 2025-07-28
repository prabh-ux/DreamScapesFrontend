import axios from 'axios';
import React, { useState } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Footer = ({ setOpenLogin }) => {
    const darkMode = useSelector(state => state.theme?.darkMode);


    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData(e.target);
        const email = formdata.get("email");
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");

        if (!token) {
            setOpenLogin(true);
            toast.error("Please register to subscribe.");

            return;
        }
        if (!email) {
            console.log("email required");
            return;
        }

        try {
            setIsSubmitting(true);
                const BackendUrl=import.meta.env.VITE_BACKEND_URL;
            const url = `${BackendUrl}/newsletter`;
            await toast.promise(
                axios.post(url, { email, name }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }),
                {
                    loading: 'Saving...',
                    success: <b>Thanks for subscribing!</b>,
                    error: <b>Could not subscribe.</b>,
                }
            );
            setIsSubmitting(false);

        } catch (error) {
            console.error("Error:", error);
            setIsSubmitting(false);

        }

    }
    const quickLinks = [
        { text: "Home" },
        { text: "Launch Editor" },
        { text: "Generate Image" },
        { text: "Your Generations" },
    ]
    const socialMediaLinks = [
        { text: "Instagram" },
        { text: "Linkdin" },
        { text: "Twitter" },
        { text: "Github" },
    ]
    const isToggle = useSelector((state) => state.theme.darkMode);
    const textColor = isToggle ? "text-[white]" : "text-[black]"

    return (
        <div className={` ${isToggle ? "bg-[#7e7e7e4d]" : "bg-white/15"}   p-[2rem] px-[0.5rem] pb-[7rem] lg:px-[2rem] flex flex-col lg:flex-row justify-around`}  >

            {/* div1 */}
            <div className='flex flex-col justify-between gap-[3rem] ' >

                {/* logo and text */}
                <div className='flex  '>
                    {/* logo */}
                    <img className='size-25 object-cover ' src='/Headerimages/logo.png' />
                    {/* text */}
                    <div className={` ${textColor} flex flex-col justify-end `} >
                        <p className='font-bold  text-2xl ' >DreamScapes</p>
                        <p className={`${isToggle ? "text-[#e8931b]" : "text-[#9A5900]"}`} >Where imagination takes shape</p>
                    </div>
                </div>

                {/* links hidden */}
                <div className=' flex-col gap-[1rem] hidden  '>

                    {/* quick links */}
                    <div className='flex flex-col gap-[0.5rem] '  >
                        <p className={`flex justify-start items-center gap-[0.2rem] font-bold  text-lg ${isToggle ? "text-[#e8931b]" : "text-[#9A5900]"} `}>Quick Links<span><FaLongArrowAltRight /></span></p>

                        <div className='flex flex-wrap gap-[0.5rem]'  >
                            {
                                quickLinks.map((items, index) => (

                                    <button key={index} className='cursor-pointer p-[1rem] h-fit text-nowrap py-[0.6rem] bg-[#252424] rounded-lg border-b-2 border-black text-white' >{items.text}</button>

                                ))
                            }
                        </div>


                    </div>

                    {/* Social Media links */}
                    <div className='flex flex-col gap-[0.5rem] '  >
                        <p className={`flex justify-start items-center gap-[0.2rem] font-bold  text-lg ${isToggle ? "text-[#e8931b]" : "text-[#9A5900]"} `}>Social Media<span><FaLongArrowAltRight /></span></p>

                        <div className='flex  flex-wrap gap-[0.5rem]'  >
                            {
                                socialMediaLinks.map((items, index) => (

                                    <button key={index} className='cursor-pointer  p-[1rem]  py-[0.6rem] bg-[#252424] rounded-lg border-b-2 border-black text-white' >{items.text}</button>

                                ))
                            }
                        </div>


                    </div>

                </div>

                {/* trademark text */}

                <p className={` ${isToggle ? "text-[#c1bcbc]" : "text-[#5B5858]"}  opacity-0 lg:opacity-100 `} >© 2025 DreamScape. All rights reserved.</p>

            </div>

            {/* div2 form */}
            <div className=' flex flex-col gap-[1rem]  ' >


                <div className='bg-[#252424] text-white p-[1rem] py-[2rem]    flex flex-col justify-around space-y-[4rem] lg:space-y-0 rounded-xl h-full  w-full  ' >
                    {/* text */}
                    <div className='flex flex-col gap-[0.5rem] text-center lg:text-start' >
                        <p className='font-semibold text-lg '  >Stay <span className='text-2xl text-[#EB8801]' >Inspired.</span><br />
                            Join the DreamScape Community</p>
                        <p className='text-[#A4A4A4] text-sm'>Get exclusive updates, design tips,<br /> and AI-powered world-building ideas<br /> straight to your inbox</p>
                    </div>

                    {/* form */}

                    <form onSubmit={handleSubmit} className=' flex flex-col gap-[2rem] ' >
                        <div className='flex flex-col gap-[0.5rem]' >
                            <label className='flex items-center gap-[0.3rem] ' >Email<span><FaLongArrowAltRight /></span></label>
                            <input name='email' required={true} type='email' placeholder='JohnWick@gmail.com' className='bg-white/10 w-full p-[0.5rem] rounded-lg border-b-[0.4rem] border-[#EB8801] outline-none  ' />
                        </div>

                        <button disabled={isSubmitting} type='submit' className={`w-full p-[0.7rem] bg-gradient-to-t text-center font-semibold ${isSubmitting ? "from-[#929292] to-[#404040] cursor-not-allowed  " : "from-[#EB8801] to-[#AA660A] cursor-pointer"}  rounded-lg   `}>Submit</button>

                    </form>


                </div>
                {/* trademark text */}

                <p className={` ${darkMode ? "text-white" : "text-[#5B5858]"}  flex lg:hidden text-sm lg:text-2xl text-nowrap  `}>© 2025 DreamScape. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
