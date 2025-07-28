import React, { useRef, useEffect, useState } from 'react'
import './Scroll.css'
import { IoStarSharp } from "react-icons/io5";
const Features2 = ({isToggle,textColor}) => {
    const handref = useRef();
    const [hideImage, setHideImage] = useState(false);
    const [isSmall, setIsSmall] = useState(false);
    const scrollRef = useRef(800);

    const lgImages = [
        { text: "realistic superheroes protecting a city", img: '/HomePageImgs/superhero.jpeg' },
        { text: "sylvan ranger, longbow, brown cloak, in a deep forest, ancient trees, whispering leaves, close up", img: '/HomePageImgs/ranger.jpeg' },
        { text: "cyberpunk women, neon hair, laser monocle, in a electron city, holographic billboards, poster-covered walls, close up", img: '/HomePageImgs/Disney3d.jpeg' },
        { text: "retro woman, goggles, bodice, in a industrial-era cityscape, clockwork machines, gravel streets, close up", img: '/HomePageImgs/Disney2D.jpeg' },

    ]
    const mdImages = [
        { text: "Generate an image of a college girl from Sweden", img: '/HomePageImgs/g1.jpeg' },
        { text: "Generate an image of a girl enjoying a swing", img: '/HomePageImgs/swing.jpeg' },
        { text: "Generate an image of a girl holding Flowers", img: '/HomePageImgs/g2.jpeg' },
        { text: "woman, at a lake, rowing a boat, playful grin, close-up", img: '/HomePageImgs/boat.jpeg' },

    ]


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

             if (width < 1280) {     // md to lg
                scrollRef.current = 1400;
                setIsSmall(true);
                
            } else {                       // xl and above
                scrollRef.current = 900;
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
        <div className={`  ${isToggle?"bg-[#7e7e7e4d]":"bg-[#ffffff4d]"}     w-[90%] h-fit   m-[3rem] rounded-2xl flex flex-col justify-center items-center py-[4rem] xl:py-auto  xl:px-[4rem] space-y-[1rem] md:space-y-[3rem] `}  >


            {/* div1 */}
            <div className={` ${textColor} text-center   flex flex-col w-full xl:w-auto `}  >
                <div className='hidden xl:flex  flex-col '>
                    <p className='text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Describe It and Watch It Come</p>
                    <p className=' font-bold   text-[5rem] drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Alive</p>
                </div>

                <div className='flex flex-col xl:hidden '>
                    <p className='  text-center xl:text-auto md:text-3xl drop-shadow-[0_0_8px_rgba(0,0,0,0.4))]  ' >Describe It and Watch It Come </p>
                    <p className=' font-bold text-[2rem] md:text-[4rem] lg:text-[8rem] text-center xl:text-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.3))] ' >Alive</p>
                </div>
            </div>


            {/* div2 */}
            <div className='flex flex-col grid-cols-2   items-center  w-[80rem] max-w-full h-fit gap-[3rem]   '>

                {
                   (isSmall? mdImages:lgImages).map((items, index) => (

                        <div key={index} className={`relative ${index % 2 == 0 ? 'md:-left-30' : 'md:-right-30'}  `}  >
                            <div className={` text-xs sm:text-lg animate-bounce  absolute bottom-0  ${index % 2 == 0 ? '-left-5' : '-right-5'}  ${index % 2 == 0 ? 'md:-left-30' : 'md:-right-30'}  ${isToggle?"bg-black/85":"bg-[#e4aedd]/85"} rounded-xl p-[0.5rem] pr-[1rem]  flex flex-col items-start border-3 border-[#b617ab] drop-shadow-xl drop-shadow-[#8000808b]   `}>
                                <p className={`${isToggle?"text-[#717171]":"text-[#2b2b2bce]"}  font-bold `} >Prompt</p>
                                <div className='flex'>

                                    <p className={`${isToggle?"text-white":"text-black"} w-[5rem] md:w-[15rem] font-semibold text-wrap relative `}>{items.text}<span className={`  ${isToggle?"bg-white":"bg-black"} h-[0.8rem] md:h-[1.5rem] w-[0.1rem] ml-1 inline-block  animate-[pulse_0.4s_ease-in-out_infinite]  absolute bottom-0`} ></span></p>
                                  
                                </div>
                            </div>
                            <img className={` rounded-2xl  h-[20rem] w-[15rem]  sm:h-[30rem] sm:w-[20rem]  xl:h-[25rem] xl:w-[40rem] object-cover  `} src={`${items.img}`} />
                        </div>

                    ))
                }




            </div>


        </div>
    )
}

export default Features2