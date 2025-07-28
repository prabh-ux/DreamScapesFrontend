import React, { useEffect } from 'react'
import { FaFilePen } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { useState } from 'react';
import { useSelector } from 'react-redux';


const BottomHeader = ({ setOpenSavedProjects, setCreateNewOpen, setOpenGallery }) => {

    const [isVisible, setIsVisible] = useState(true);
    const [LastScrollY, setLastScrollY] = useState(0);
    const darkMode = useSelector(state => state.theme?.darkMode)

    useEffect(() => {
        const ControlBottomHeader = () => {

            if (typeof window !== 'undefined') {

                if (window.scrollY <= LastScrollY) {
                    setIsVisible(false);
                } else if (window.scrollY > LastScrollY) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                setLastScrollY(window.scrollY);

            }

        }

        window.addEventListener('scroll', ControlBottomHeader);
        return () => window.removeEventListener('scroll', ControlBottomHeader);

    }, [LastScrollY])



    return (
        <div className={`  md:hidden fixed z-10 ${isVisible?'translate-y-0 ':'translate-y-full'} translate-transform duration-300 ease-in-out bottom-0 w-full backdrop-blur-lg `}  >
            <div className={`w-full flex justify-around bg-white/35 py-2  rounded-t-2xl  ${darkMode?"text-white":"text-[#5B5858]"} `} >

                <button onClick={() => setOpenSavedProjects(true)} className=' group cursor-pointer  flex flex-col justify-center items-center'>
                    <span className='group-hover:text-[#C76901]'  > < FaFilePen /></span>
                    <p className='group-hover:text-[#C76901]' >Projects</p>
                </button>
                <button onClick={() => setCreateNewOpen(true)} className=' group cursor-pointer  flex flex-col justify-center items-center'>
                    <span className='group-hover:text-[#C76901]  text-3xl '  > <IoMdAddCircle /></span>
                    <p className='group-hover:text-[#C76901] font-semibold ' >Create</p>
                </button>
                <button onClick={() => setOpenGallery(true)} className=' group cursor-pointer  flex flex-col justify-center items-center'>
                    <span className='group-hover:text-[#C76901]'  > <GrGallery /></span>
                    <p className='group-hover:text-[#C76901]' >Gallery</p>
                </button>


            </div>
        </div>
    )
}

export default BottomHeader
