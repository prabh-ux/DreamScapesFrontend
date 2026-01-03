import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setDarkMode } from '../../Redux/ThemeSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = ({ setOpenLogin, setCreateNewOpen, setOpenSavedProjects, setOpenGallery, setOpenSongs }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isToggle = useSelector((state) => state.theme.darkMode)
    const [isMute, setIsMute] = useState(false);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const [lastYScroll, setLastYScroll] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setOpenLogin(true);
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [])


    useEffect(() => {

        const ControlHeader = () => {

            if (typeof window !== 'undefined') {
                if (window.scrollY <= lastYScroll) {
                    setIsVisible(true);

                }
                else if (window.scrollY > lastYScroll) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                setLastYScroll(window.scrollY);
            }
        }

        window.addEventListener('scroll', ControlHeader);
        return () => window.removeEventListener('scroll', ControlHeader);


    }, [lastYScroll])

    useEffect(() => {

        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (systemPreference) {
            dispatch(setDarkMode(true));
        } else {
            dispatch(setDarkMode(false));
        }
        const listener = () => {
            dispatch(setDarkMode(e.matches));

        }


        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);
        return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);


    }, [dispatch])



    const menuFunction = () => {
        setIsMenuOpen(prev => !prev);

    }
    const toggleFunction = () => {
        dispatch(toggleTheme());
       
        toast(!isToggle?'Dark Mode Activated!':"Light Mode Activated!",
            {
                icon: '💡',
                style: {
                    borderRadius: '10px',
                    background:!isToggle? '#333':'#fff',
                    color:!isToggle? '#fff':'#333' ,
                },
            }
        
        );
    }
    const muteFunction = () => {
        setIsMute(prev => !prev);
    }



    return (
        <div className={`flex items-center ${isVisible ? "-translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out   justify-between py-[19px] px-[29px] md:px-[39px] bg-[#ffffff4d] backdrop-blur-lg  sticky top-0 z-[10] `}>
            {/* logo */}
            <div onClick={() => navigate("/")} className=' size-8 md:size-14  flex justify-center'  >
                <img src="/Headerimages/logo.png" />
            </div>
            {/* header buttons */}
            <div className='flex space-x-[41px] '>
                <button onClick={() => isLoggedIn ? setCreateNewOpen(true) : setOpenLogin(true)} className="p-2.5 bg-black text-[#eda541] hover:text-[#eda541d3] transition-all cursor-pointer font-bold rounded-[5px] drop-shadow-lg/20 hidden md:flex">Create New</button>
                <div className={`flex ${isMenuOpen ? 'space-x-[-10px]' : 'space-x-[10px]'} `}>

                    {/* projects */}
                    <button onClick={() => isLoggedIn ? setOpenSavedProjects(true) : setOpenLogin(true)} className="p-2.5 bg-black text-white hover:text-[#ffffffd2]  cursor-pointer font-bold rounded-[5px] drop-shadow-lg/20 transition-all hidden md:flex">Projects</button>

                    {/* gallery */}
                    <button onClick={() => isLoggedIn ? setOpenGallery(true) : setOpenLogin(true)} className="p-1 justify-center bg-black rounded-[5px] drop-shadow-lg/20 cursor-pointer group hidden h-[3rem] w-[3rem] md:flex"><img className='group-hover:opacity-70 transition-all ' src='/Headerimages/camera.png' /></button>

                    {/* login/signup */}
                    <button onClick={() => setOpenLogin(true)} className=" p-1.5 md:p-2.5 bg-black rounded-[5px] drop-shadow-lg/20  cursor-pointer group size-9 md:size-12 flex justify-center items-center"><img className='group-hover:opacity-70 transition-all' src='/Headerimages/profile.png' /></button>
                    {/* menu */}
                    <div className='flex  flex-col md:flex-row items-center relative  '>
                        <button onClick={() => menuFunction()} className="p-[3px] md:p-2.5 bg-black rounded-[5px] drop-shadow-lg/20  cursor-pointer group size-9 md:size-12 flex justify-center items-center"><img className='group-hover:opacity-70 transition-all' src='/Headerimages/Menu.png' /></button>
                        {/* menu btns */}
                        <div className={`${isMenuOpen ? 'block' : 'hidden'}  absolute  md:static bg-[#F9DBD2]  py-[7.5px] px-[7px] md:space-x-[30px] space-y-[30px] md:space-y-0 flex flex-col md:flex-row  justify-center items-center rounded-2xl md:rounded-none  md:rounded-r-2xl   transition-all duration-300 ease-in-out  top-12 `} >
                            {/* togglebtn */}
                            <button onClick={() => toggleFunction()} className='  mt-1 relative group cursor-pointer drop-shadow-lg/20   '>
                                <div className={` absolute z-10 h-3.5 w-4 mt-0.5 border-1 border-r-3 border-black ${!isToggle ? 'bg-[#d21c1c]' : 'bg-white'} rounded-full group-hover:opacity-70 transition-all ${isToggle ? 'right-0' : 'left-0'} `} ></div>
                                <div className={` rounded-xl drop-shadow-lg/20 ${isToggle ? 'bg-red-500' : 'bg-white'}  w-[40px] h-[17px] border-1 border-t-2 border-b-4 border-t-black ${isToggle ? 'border-b-black' : 'border-b-[#d21c1c]'} `} ></div>
                            </button>
                            {/* 
                            random btn 
                            <button className=" p-1 bg-black rounded-[5px] drop-shadow-lg/20 h-[2rem] w-[3rem]  cursor-pointer group"><img className='group-hover:opacity-70 transition-all h-full w-full object-contain' src='/Headerimages/randombtn.png' /></button>

                             songs btn 
                            <button onClick={() => { setOpenSongs(true) }} className="  h-[2rem] w-[3rem] p-1 py-1.5 bg-black rounded-[5px] drop-shadow-lg/20  cursor-pointer group"><img className='  h-full w-full object-cover group-hover:opacity-70 transition-all  ' src='/Headerimages/playlistbtn.png' /></button>


                            mute/unmute btn 
                            <button onClick={() => muteFunction()} className='relative group '>
                                <div className={`${isMute ? 'block' : 'hidden'} absolute z-10 p-2 py-1 rounded-[5px] drop-shadow-lg/20  cursor-pointer  `}><img className='group-hover:opacity-70 transition-all' src='/Headerimages/Linemute.png' /></div>
                                <div className="  h-[2rem] w-[3rem] p-1 py-1.5 bg-black  rounded-[5px] drop-shadow-lg/20  cursor-pointer "><img className='group-hover:opacity-70 transition-all h-full w-full object-fill ' src='/Headerimages/soundonBtn.png' /></div>
                            </button> */}


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header