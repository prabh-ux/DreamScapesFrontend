import React, { useRef, useEffect, useState } from 'react'
import './Scroll.css'
import { IoStarSharp } from "react-icons/io5";
const Features1 = ({isToggle,textColor}) => {
    const handref = useRef();
    const [hideImage, setHideImage] = useState(false);
    const [isSmall, setIsSmall] = useState(false);
    const scrollRef = useRef(800);

    useEffect(() => {
        const handelScroll = () => {
            const scrollY = window.scrollY;

            if (handref.current) {

                handref.current.style.transform = `translate(${scrollY * 0.2}px,${scrollY * 0.2}px)`
            }

            setHideImage(prev => {
                if (scrollY > scrollRef.current && !prev) return true;
                if (scrollY <= scrollRef.current && prev) return false;
                return prev;
            })


        }

        const checkSmall = () => {
            const width = window.innerWidth;

            if (width < 768) {             // sm
                scrollRef.current = 800
                setIsSmall(true);
              
            } else if (width < 1280) {     // md to lg
                scrollRef.current = 1100;
                setIsSmall(false);
                
            } else {                       // xl and above
                scrollRef.current = 800;
                setIsSmall(false);
               
            }
        };

        checkSmall();

        window.addEventListener('resize', checkSmall);
        window.addEventListener('scroll', handelScroll);
        return () => {
            window.removeEventListener('scroll', handelScroll);
            window.removeEventListener('resize', checkSmall);
        }
    }, [])

    return (
        <div className={` ${isToggle?"bg-[#7e7e7e4d]":"bg-[#ffffff4d]"}      w-[90%] h-fit max-h-[120rem] overflow-hidden m-[3rem] rounded-2xl flex flex-col justify-center items-center py-[4rem] xl:py-[3rem]  xl:px-[4rem] space-y-[1rem]  `}  >


            {/* div1 */}
            <div className={` ${textColor} text-center   flex flex-col w-full xl:w-auto `}  >
                <div className='hidden xl:flex  flex-col '>
                    <p className=' text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Craft Images From</p>
                    <p className=' font-bold   text-[5rem] drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Scrach</p>
                </div>

                <div className='flex flex-col xl:hidden '>
                    <p className='  text-center xl:text-auto md:text-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Craft Images From</p>
                    <p className=' font-bold text-[2rem] md:text-[4rem] lg:text-[8rem] text-center xl:text-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Scrach</p>
                </div>
            </div>

            {/* div2 */}
            <div className='flex  justify-center   items-center  w-[80rem] max-w-full h-[25rem] md:h-fit'>



                {/* main image */}
                <div style={{
                    backgroundImage: `url(/HomePageImgs/${!hideImage ? 'images.png' : 'sky.png'})`,
                    backgroundSize: !hideImage ? 'auto' : 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    backgroundPositionX: isSmall ? 'left ' : 'center',
                }} className={` h-[25rem] md:h-[25rem]  w-[25rem] mx-[2rem] md:w-[55rem] max-w-full relative  rounded-2xl   `}>


                    <div ref={handref} className={`  ${hideImage ? 'opacity-0 pointer-events-none ' : 'opacity-100 pointer-events-auto'} transition-opacity duration-200  ease-in-out absolute  -top-30 -left-30 z-10 `} >
                        {/* imagesdiv */}
                        <div className='w-[13rem] h-[8rem] p-[0.5rem] bg-white/40 rounded-2xl ' >
                            <img className='object-cover  h-full w-full outline-1 rounded-2xl p-[0.5rem] bg-black/60 ' src='/HomePageImgs/sky.png' />
                        </div>
                        <img className='  absolute z-20 -bottom-10  object-contain w-[10rem] h-[7rem]  ' src='/HomePageImgs/hand.png' />


                    </div>
                   
                        <div className={`${hideImage &&"hidden"} z-0  bg-black text-orange-500 opacity-0 sm:opacity-100 md:text-3xl lg:text3xl w-fit rounded-lg p-[1rem] absolute top-[30%] left-[34%] font-bold  `}  >Drag And Drop</div>

                   
                    <img className='object-cover object-right md:object-center  w-full h-full rounded-b-2xl ' src='/HomePageImgs/land.png' />



                </div>

            </div>


        </div>
    )
}

export default Features1