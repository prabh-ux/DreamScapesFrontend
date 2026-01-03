import React, { useRef, useEffect, useState } from 'react'
import './Scroll.css'
import { IoCloudUpload } from "react-icons/io5";
import { TbAppsFilled } from "react-icons/tb";
import { MdOutlineTextFields } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdInsertPageBreak } from "react-icons/md";
import { IoLayers } from "react-icons/io5";
import { FaCrop } from "react-icons/fa";
import { CgDropOpacity } from "react-icons/cg";
import { TbBackground } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { RiExpandHorizontalSFill } from "react-icons/ri";





const Features4 = ({isToggle,textColor}) => {

    const BigToolBox = [
        { text: "Uplodes", icon: IoCloudUpload },
        { text: "Elements", icon: TbAppsFilled },
        { text: "Text", icon: MdOutlineTextFields },
        { text: "Edit", icon: RiImageEditFill },
        { text: "Save", icon: FaSave },
        { text: "Undo", icon: FaUndoAlt },
        { text: "Redo", icon: FaRedoAlt },
        { text: "Delete", icon: MdDelete },
        { text: "Generate", icon: FaWandMagicSparkles },
    ]

    const SmallToolBox = [
        { text: "Insert Page", icon: MdInsertPageBreak },
        { text: "Layers", icon: IoLayers },
        { text: "Crop", icon: FaCrop },
        { text: "Opacity", icon: CgDropOpacity },
        { text: "Remove BG", icon: TbBackground },
        { text: "Downlaad", icon: IoMdDownload },
    ]
    const ContainerRef = useRef(null);
    const [dividerX, setDividerX] = useState(50);
    const [isSmall, setIsSmall] = useState(false);


    useEffect(() => {


        const checkSmall = () => {
            const width = window.innerWidth;

            if (width < 1280) {     // md to lg
                setIsSmall(true);
              
            } else {                       // xl and above
                setIsSmall(false);
               
            }
        };

        checkSmall();

        window.addEventListener('resize', checkSmall);

        return () => {

            window.removeEventListener('resize', checkSmall);
        }
    }, [])

    const DragX = (e) => {

        e.preventDefault();

        const getX = (e) => {
           return e.touches ? e.touches[0].clientX : e.clientX;
        }

        const handelMouseMove = (e) => {

            const rect = ContainerRef.current.getBoundingClientRect();
            const x = getX(e) - rect.left;
            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setDividerX(percent);
        }

        const handelMouseUp = () => {
            window.removeEventListener('mousemove', handelMouseMove);
            window.removeEventListener('mouseup', handelMouseUp);
            window.removeEventListener('touchmove', handelMouseMove);
            window.removeEventListener('touchend', handelMouseUp);
        }
        window.addEventListener('mousemove', handelMouseMove);
        window.addEventListener('mouseup', handelMouseUp);
        window.addEventListener('touchmove', handelMouseMove);
        window.addEventListener('touchend', handelMouseUp);

    }

    return (
        <div className={` ${isToggle?"bg-[#7e7e7e4d]":"bg-[#ffffff4d]"}    w-[90%] h-fit   m-[3rem] rounded-2xl flex flex-col justify-center items-center py-[4rem] xl:py-[3rem]  xl:px-[4rem] space-y-[1rem] overflow-hidden gap-5  `}  >


            {/* div1 */}
            <div className={` ${textColor} text-center   flex flex-col w-full xl:w-auto  `}  >
                <div className='hidden xl:flex  flex-col '>
                    <p className=' text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Your</p>
                    <p className=' font-bold   text-[5rem] drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >WorkSpace</p>
                </div>

                <div className='flex flex-col xl:hidden '>
                    <p className='  text-center xl:text-auto md:text-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Your</p>
                    <p className=' font-bold text-[2rem] md:text-[4rem] lg:text-[8rem] text-center xl:text-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >WorkSpace</p>
                </div>
            </div>


            {/* div2 */}
            <div className='flex  flex-col  justify-center  gap-[1rem]  items-center  w-[80rem] max-w-full h-full md:h-fit'>

                <div className=' flex  gap-[1rem] md:gap-[2rem]  px-[1rem] space-x-0 md:space-x-[2rem] lg:space-x-0  '>

                    {/* tools */}
                    <div className='flex flex-col bg-white/40 md:p-[0.5rem] justify-evenly rounded-xl gap-[0.5rem] py-[1rem] ' >
                        {BigToolBox.map((item, index) => (
                            <div key={index} className={` ${isToggle?"text-[#ddd5de]":"text-black"}  flex flex-col  justify-center items-center ${item.text === "Generate" && " p-[0.5rem] md:p-[1rem] "}`} >
                                <span className={` text-lg md:text-2xl ${item.text === "Generate" && `${isToggle?"text-purple-700":"text-purple-500"}   drop-shadow-xl drop-shadow-purple-400 text-3xl `} `} ><item.icon /></span>
                                <p className={`text-xs ${item.text === "Generate" && ` ${isToggle?"text-purple-700":"text-purple-500"}   drop-shadow-xl drop-shadow-purple-400 text-lg `}`} >{item.text}</p>
                            </div>

                        ))}

                    </div>

                    {/* image and small tool box */}
                    <div className='w-full flex flex-col gap-[1rem] md:gap-[2rem] '>

                        {/* small tool box */}
                        <div className=' hidden sm:flex justify-end '  >
                            <div className=' w-full md:w-[90%] lg:w-[70%] flex bg-white/40 p-[0.5rem] justify-between md:justify-evenly rounded-xl ' >
                                {SmallToolBox.map((item, index) => (
                                    <div key={index} className={` ${isToggle?"text-[#ddd5de]":"text-black"} flex flex-col justify-center items-center`} >
                                        <span className=' text-lg md:text-2xl' ><item.icon /></span>
                                        <p className='text-xs' >{item.text}</p>
                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* images */}
                        <div className='relative w-full h-full ' ref={ContainerRef} >
                            <div className={`absolute h-full  `} style={{ width: `${dividerX}%` }}>
                                <div className='h-full w-full relative  '>
                                    <span style={{
                                        left: '100%',
                                        transform: 'translate(-50%,-50%)',
                                    }} onMouseDown={DragX} onTouchStart={DragX} className='  text-2xl cursor-pointer text-white absolute top-1/2  z-10'>
                                        <RiExpandHorizontalSFill />
                                    </span>

                                    <div className='bg-black/35 backdrop-blur-xs rounded-l-2xl  border-r-2 border-white h-full w-full ' ></div>

                                </div>



                            </div>
                            <img className='  rounded-2xl pointer-events-none h-full object-cover' src={`/HomePageImgs/${isSmall ? 'male' : 'female'}.jpeg`} />
                        </div>

                    </div>

                </div>



            </div>


        </div>
    )
}

export default Features4