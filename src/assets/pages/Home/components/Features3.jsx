import React, { useRef, useEffect, useState } from 'react'
import './Scroll.css'
const Features3 = ({isToggle,textColor}) => {
   

   

    return (
        <div className={`${isToggle?"bg-[#7e7e7e4d]":"bg-[#ffffff4d]"}     w-[90%] h-fit   m-[3rem] rounded-2xl flex flex-col justify-center items-center py-[4rem] xl:py-[3rem]  xl:px-[4rem] space-y-[1rem] overflow-hidden gap-5 `}  >


             {/* div1 */}
            <div className={` ${textColor}  text-center   flex flex-col w-full xl:w-auto  `}  >
                <div className='hidden xl:flex  flex-col '>
                    <p className=' text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >More Features To</p>
                    <p className=' font-bold   text-[5rem] drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Explore</p>
                </div>

                <div className='flex flex-col xl:hidden '>
                    <p className='  text-center xl:text-auto md:text-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >More Features To</p>
                    <p className=' font-bold text-[2rem] md:text-[4rem] lg:text-[8rem] text-center xl:text-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Explore</p>
                </div>
            </div>


            {/* div2 */}
            <div className='flex  lg:flex-col flex-row justify-center  gap-[1rem]  items-center  w-[80rem] max-w-full h-full md:h-fit'>

                <div className=' flex lg:flex-col  flex-row px-[1rem] space-x-0 md:space-x-[2rem] lg:space-x-0  '>
                  {/* //menu */}
                    <div className='flex flex-col lg:flex-row justify-center lg:justify-start    '>

                        <img className='size-[6rem] lg:size-[7rem] p-1 md:p-3 rounded-t-xl lg:rounded-none lg:rounded-l-2xl   bg-black object-fill ' src='/Headerimages/Menu.png' />
                        <div className='bg-[#F9DBD2] rounded-b-2xl lg:rounded-none lg:rounded-r-2xl flex flex-col lg:flex-row   justify-around  items-center  space-y-[3.3rem] lg:space-y-0 lg:space-x-[7rem] px-[0.5rem] py-[1rem] p-0 lg:p-[1rem] pt-[2.5rem]  '>
                            <img className='md:size-[5rem] p-[0.3rem] size-[2.5rem]     w-fit object-contain ' src='/Headerimages/toggleBtnooff.png' />
                            <img className=' size-[3rem] md:size-[5rem] p-[0.3rem] md:p-[0.5rem] rounded-lg bg-black w-fit object-fill ' src='/Headerimages/randombtn.png' />
                            <img className='  size-[3rem] md:size-[5rem] p-[0.3rem] md:p-[0.5rem] rounded-lg bg-black w-fit object-fill ' src='/Headerimages/playlistbtn.png' />
                            <img className=' size-[3rem] md:size-[5rem] p-[0.3rem] md:p-[0.5rem] rounded-lg bg-black  w-fit object-fill ' src='/Headerimages/soundonBtn.png' />

                        </div>
                    </div>
                    {/* arrows */}
                    <div className='flex flex-col justify-center   lg:justify-end lg:flex-row  '>

                        <img className='flex  opacity-0 lg:hidden size-[6rem] p-2  bg-black object-cover' src='/Headerimages/Menu.png' />
                        <div className='flex flex-col lg:flex-row  justify-around  items-center  space-y-[2rem] md:space-y-[1rem]  lg:space-x-[5rem]  py-[1rem]'>
                            <img className=' p-[0.5rem] size-[4rem] md:size-[7rem]   w-fit object-cover -rotate-140 lg:-rotate-50  ' src='/Headerimages/bigarrow.png' />
                            <img className='  size-[4rem] md:size-[7rem] p-[0.5rem] rounded-lg  w-fit object-cover -rotate-140 lg:-rotate-50  ' src='/Headerimages/bigarrow.png' />
                            <img className=' size-[4rem] md:size-[7rem] p-[0.5rem]  rounded-lg  w-fit object-cover -rotate-140 lg:-rotate-50  ' src='/Headerimages/bigarrow.png' />
                            <img className=' size-[4rem] md:size-[7rem]  p-[0.5rem] rounded-lg w-fit object-cover -rotate-140 lg:-rotate-50  ' src='/Headerimages/bigarrow.png' />

                        </div>
                    </div>
                    {/* text */}
                    <div className='flex flex-col   justify-center lg:justify-end lg:flex-row    '>

                        <img className=' flex lg:hidden size-[6rem] p-2  bg-black object-cover opacity-0 ' src='/Headerimages/Menu.png' />

                        <div className={` ${textColor} flex   text-sm md:text-xl flex-col lg:flex-row  justify-center  items-center lg:items-start  space-y-[3rem] md:space-y-[1rem] lg:space-x-[4.5rem] py-[1rem]`}>
                            <p className='  size-[4rem] md:size-[7rem] h-fit  w-fit text-center  font-bold drop-shadow-2xl drop-shadow-[#961796] '>Switch to<br /><span className={` ${isToggle?"text-purple-500":"text-purple-600"} `} >Dark/Light</span><br />mode</p>
                            <p className='  size-[4rem] md:size-[7rem] h-fit  w-fit text-center  font-bold drop-shadow-2xl drop-shadow-[#961796] '>Generate a<br /><span className={`${isToggle?"text-purple-500":"text-purple-600"}`} >RANDOM</span><br />Project</p>
                            <p className='  size-[4rem] md:size-[7rem] h-fit  w-fit text-center  font-bold drop-shadow-2xl drop-shadow-[#961796] b '>Play Your<br /><span className={`${isToggle?"text-purple-500":"text-purple-600"}`} >Favroite</span><br />Song</p>
                            <p className='   size-[4rem] md:size-[7rem]  md:max-h-fit lg:h-fit   w-fit text-center  font-bold drop-shadow-2xl drop-shadow-[#961796] '><span className={`${isToggle?"text-purple-500":"text-purple-600"}`} >Mute/Unmute</span><br />songs</p>

                        </div>
                    </div>


                </div>



            </div>


        </div>
    )
}

export default Features3