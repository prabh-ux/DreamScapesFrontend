import { useEffect, useState } from 'react'
import React from 'react'
import './Scroll.css'
import { IoStarSharp } from "react-icons/io5";

const Hero = ({ isToggle, textColor, setCreateNewOpen, setOpenLogin }) => {

    const images = [
        { link: 'princess.jpeg' }, { link: 'donut.jpeg' }, { link: 'girl.jpeg' },
        { link: 'anime.jpeg' }, { link: 'idol.jpeg' }, { link: 'manga.jpeg' }, { link: 'fox.jpeg' }

    ]
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [scrollClass, setScrollClass] = useState('scrollH');
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {

            setIsLoggedIn(false);
        }else{
            setIsLoggedIn(true);
        }
    }, [])

    useEffect(() => {
        const handelResize = () => {

            if (window.innerWidth >= 1280) {
                setScrollClass('scroll');
            } else {
                setScrollClass('scrollH');
            }

        }

        handelResize();
        window.addEventListener('resize', handelResize);
        return () => window.removeEventListener('resize', handelResize);
    }, [])


    return (
        <div className={` ${isToggle ? "bg-[#7e7e7e4d]" : "bg-[#ffffff4d]"}  w-[90%] h-fit max-h-[90rem] overflow-hidden m-[3rem] rounded-2xl flex flex-col-reverse xl:flex-row justify-center items-center p-[1rem] py-[3rem] xl:py-auto  xl:px-[9rem] `}   >


            {/* div1 */}
            <div className={`text-center  ${textColor}  flex flex-col w-full xl:w-auto`}  >
                <div className='  text-center   flex flex-col w-full xl:w-auto '  >
                    <div className='hidden xl:flex  flex-col '>
                        <p className=' text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Turn Your Imagination into a </p>
                        <p className=' font-bold   text-[5rem] drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >World</p>
                    </div>


                </div>
                <button onClick={() =>isLoggedIn?setCreateNewOpen(true):setOpenLogin(true)} className={`  trynow    group  flex mx-[2rem] md:mx-[4rem] mt-[2rem] gap-[1rem]  justify-center items-center cursor-pointer text-2xl p-[0.4rem] rounded-2xl   transition-all duration-300 ease-in-out border-4 ${isToggle ? "border-[white]/45  bg-[#290740] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" : "border-gray-500/25  bg-[#be88e2]  hover:drop-shadow-[0_0_8px_rgba(165,34,252,0.6)]"}   text-[#f6dfef] font-bold`} >

                    <div className='w-[3rem]  ' >
                        <div className=' text-xs flex items-center justify-start  opacity-50 w-full  h-[1rem]   group-hover:animate-[starPop_3s_ease-in-out_infinite]   ' style={{ animationDelay: '600ms' }} ><span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out'><IoStarSharp /></span> </div>
                        <div className='  text-3xl flex items-center justify-end opacity-100 w-full  h-[1rem]  group-hover:animate-[starPop_3s_ease-in-out_infinite]  ' style={{ animationDelay: '8ms' }} ><span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out' ><IoStarSharp /></span> </div>
                        <div className=' text-xl flex items-center  opacity-60 w-full  h-[2rem]   group-hover:animate-[starPop_3s_ease-in-out_infinite]  ' style={{ animationDelay: '300ms' }}  ><span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out'  ><IoStarSharp /></span> </div>
                    </div>
                    <p  className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out text-lg md:text-2xl text-nowrap' > Try It Now</p>
                </button>
            </div>


            {/* div2 */}
            <div className='flex justify-center  xl:justify-between items-center  w-full h-[20rem] xl:w-[45rem] md:h-[30rem] overflow-hidden  xl:p-[1rem] relative '>

                <div className='size-60  h-full flex  items-end justify-center opacity-0  xl:opacity-100   ' ><img className='   rounded-2xl size-50 hover:size-60 transition-all duration-300 ease-in-out object-contain ' src='/HomePageImgs/king.jpeg' /></div>
                <div className=' size-80 md:size-100 flex justify-center items-center absolute z-20 w-full xl:w-auto xl:right-[20%] pointer-events-none  ' ><img className='rounded-3xl md:rounded-2xl  size-60 md:size-85 md:hover:size-90 transition-all duration-300 ease-in-out object-contain pointer-events-auto   ' src='/HomePageImgs/vr.jpeg' /></div>
                <div className=" flex justify-center w-full xl:w-fit  ">
                    <div className={` bg-gradient-to-r  xl:bg-gradient-to-b  ${isToggle ? "from-[#a1579c]" : " from-white"} to-transparent opacity-40 absolute  size-30 md:size-50 top-1/2 -translate-y-1/2 left-0 xl:left-auto   xl:top-0 z-10 pointer-events-none `} ></div>

                    <div className={`flex ${scrollClass} xl:flex-col  scroll  relative `}>
                        {
                            [...images, ...images, ...images].map((items, index) => (
                                <div key={index} className='size-50  flex justify-center items-center' ><img className='rounded-2xl size-20 md:size-40 hover:size-30 md:hover:size-50 transition-all duration-300 ease-in-out' src={`/HomePageImgs/${items.link}`} /></div>

                            ))

                        }

                    </div>
                    <div className={` bg-gradient-to-l xl:bg-gradient-to-t ${isToggle ? "from-[#a1579c]" : " from-white"} to-transparent opacity-40 absolute size-30 md:size-50  right-0 xl:right-auto xl:bottom-0 z-10 pointer-events-none top-1/2 -translate-y-1/2 xl:top-[100%]  `} ></div>
                </div>
            </div>

            <div className={`flex flex-col xl:hidden ${textColor} `}>
                <p className='  text-center xl:text-auto md:text-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Turn Your Imagination into a</p>
                <p className=' font-bold text-[2rem] md:text-[4rem] lg:text-[8rem] text-center xl:text-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >World</p>
            </div>
        </div>
    )
}

export default Hero