import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaPortrait } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { BsPersonVideo } from "react-icons/bs";
import { useSelector } from 'react-redux';


const Generate = ({ setActivePanel }) => {
    const darkMode = useSelector(state => state.theme?.darkMode)

    const sizes = [
        { name: "Landscape", icon: BsPersonVideo },
        { name: "Square", icon: BsPersonSquare },
        { name: "Portrait", icon: FaPortrait },
    ];

    const [isApiAvalible, setIsAvalible] = useState(false);

    const [selected, setSelected] = useState(null);

    return (
        <div className={`transition-all  duration-300 ease-in-out z-7 ${darkMode ? "text-white bg-[#473147] " : "text-gray-800 bg-white  "}  w-fit min-w-[13rem] p-[1rem] rounded-md  flex-col items-center relative  `} >
            <div className='h-full w-full relative'>

                {!isApiAvalible &&
                    <div className='absolute flex flex-col  w-full h-full backdrop-blur-sm   ' >
                        
                        <div className='bg-red-400 rounded-xl w-[80%] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-1 border-red-900 ' ><p className='text-red-900 font-bold text-center text-xl '>Sorry<br/><span className='text-sm font-normal ' >because of api rate limits this feature is currently Unavalible</span></p> </div>
                        
                        </div>}
                <div className='flex flex-col gap-[2rem]' >



                    {/* name input */}
                    <div className='flex flex-col  gap-[0.5rem] '>
                        <p className='font-bold text-lg flex items-center gap-[0.3rem] '>Generate Image<span><FaLongArrowAltRight /></span></p>
                        <p className='flex text-xs  items-center gap-[0.3rem] text-gray-600 ' >Prompt:</p>

                        {/* prompt */}
                        <div className='w-full rounded-sm  p-[0.5rem] gap-[0.2rem] px-[0.5rem] text-gray-400 placeholder-gray-500 border-1 border-gray-400 font-semibold text-sm text-nowrap flex items-center   ' >
                            <textarea placeholder='Decribe an element or world you want to generate' className=' outline-none min-h-[13rem] w-full resize-none ' />
                        </div>
                    </div>


                    {/* size */}
                    <div className='w-full flex justify-end gap-[0.5rem] text-xs  '>
                        {sizes.map((item, index) => (
                            <button onClick={() => setSelected(index)} key={index} className={` ${selected === index && 'text-orange-400'} flex flex-col justify-center items-center cursor-pointer`} >
                                <span className='h-[1rem] w-[1rem]'><item.icon /></span>
                                <p>{item.name}</p>
                            </button>
                        ))}


                    </div>

                    {/* save button */}
                    <button className='cursor-pointer w-full rounded-sm bg-orange-400 p-[0.5rem] px-[1rem] text-white font-semibold text-sm text-nowrap'> Generate</button>
                </div>
            </div>





            <div onClick={() => { setActivePanel(null); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </div>


        </div>
    )
}

export default Generate