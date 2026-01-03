import React, { useRef, useEffect, useState } from 'react'
import './Scroll.css'
import { IoStarSharp } from "react-icons/io5";




const Features5 = ({isToggle,textColor,setCreateNewOpen ,setOpenLogin}) => {


        const [isLoggedIn, setIsLoggedIn] = useState(false);
 useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {

            setIsLoggedIn(false);
        }else{
            setIsLoggedIn(true);
        }
        
    }, [])
   

   

    return (
        <div className={ `   ${isToggle?"bg-[#7e7e7e4d]":"bg-[#ffffff4d]"}    w-[90%] h-fit   m-[3rem] rounded-2xl flex flex-col justify-center items-center py-[4rem] xl:py-[3rem]  xl:px-[4rem] space-y-[1rem] overflow-hidden gap-5 `}  >


            {/* div1 */}
            <div className={` ${textColor} text-center   flex flex-col w-full xl:w-auto  `}>
                <div className='hidden xl:flex  flex-col '>
                    <p className=' text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Start Building Your Dreams</p>
                    <p className=' font-bold   text-[5rem] drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Now</p>
                </div>

                <div className={` ${textColor} flex flex-col xl:hidden`}>
                    <p className=' text-center xl:text-auto md:text-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Start Building Your Dreams</p>
                    <p className=' font-bold text-[2rem] md:text-[4rem] lg:text-[8rem] text-center xl:text-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Now</p>
                </div>
            </div>


            {/* div2 */}
            <div className='flex  flex-col  justify-center  gap-[1rem]  items-center  w-[80rem] max-w-full h-full md:h-fit'>

                <div  className={`flex flex-col  gap-[4rem] ${textColor} `}  >
                    <p className=' text-sm md:text-xl text-wrap text-center'  >Whether you're an artist, explorer, or just curious<br />
                        bring your imagination to life in seconds.</p>

                    <div className='flex flex-col md:flex-row justify-center  gap-[1rem]'>
                    
                    {/* 1btn */}
                        <button  onClick={() =>isLoggedIn?setCreateNewOpen(true):setOpenLogin(true)} className={` trynow    group  flex  gap-[1rem]  justify-center items-center cursor-pointer text-2xl px-[1rem] rounded-2xl   ${isToggle?"border-[white]/45  bg-[#290740] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]":"border-gray-500/25  bg-[#be88e2]  hover:drop-shadow-[0_0_8px_rgba(165,34,252,0.6)]"}   transition-all duration-300 ease-in-out border-4  text-[#f6dfef] font-bold`} >

                            <div className='w-[3rem]  ' >
                                <div className=' text-xs flex items-center justify-start  opacity-50 w-full  h-[1rem]   group-hover:animate-[starPop_3s_ease-in-out_infinite]   ' style={{ animationDelay: '600ms' }} ><span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out'><IoStarSharp /></span> </div>
                                <div className='  text-3xl flex items-center justify-end opacity-100 w-full  h-[1rem]  group-hover:animate-[starPop_3s_ease-in-out_infinite]  ' style={{ animationDelay: '8ms' }} ><span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out' ><IoStarSharp /></span> </div>
                                <div className=' text-xl flex items-center  opacity-60 w-full  h-[2rem]   group-hover:animate-[starPop_3s_ease-in-out_infinite]  ' style={{ animationDelay: '300ms' }}  ><span className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out'  ><IoStarSharp /></span> </div>
                            </div>
                            <p className='group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out text-lg md:text-2xl' >Launch Editor</p>
                        </button>

                    </div>
                </div>



            </div>


        </div>
    )
}

export default Features5