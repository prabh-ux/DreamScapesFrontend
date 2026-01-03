import React, { useRef, useState, useEffect } from 'react'
import DefaultSongs from '../../../Data/defaultSongs';
import userSongs from '../../../Data/userSongs';
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";




const Songs = ({ setOpenSongs,isToggleMode }) => {


    const [isToggle, setIsToggle] = useState(false);
    const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(null);
    const Defaultoffset = 1000;
    const audioRef = useRef();

    useEffect(() => {
        if (!audioRef.current) return;


        if (currentlyPlayingIndex === null) {
            audioRef.current.pause();
            audioRef.current.src = '';
        }
        else {
            const isUserSong = currentlyPlayingIndex < Defaultoffset;
            const song = isUserSong ? userSongs[currentlyPlayingIndex] : DefaultSongs[currentlyPlayingIndex - Defaultoffset];

            audioRef.current.src = song.audio.src;
            audioRef.current.play();
        }


    }, [currentlyPlayingIndex])


    useEffect(() => {
        audioRef.current.pause();
        audioRef.current.src = '';
        setCurrentlyPlayingIndex(null);

    }, [isToggle])

    const toggleFunction = () => {
        setIsToggle(prev => !prev);
    }


    const closeSongs = useRef();

    return (
        <div ref={closeSongs} onClick={(e) => { if (e.target === closeSongs.current) setOpenSongs(false) }} className="fixed inset-0  z-10 backdrop-blur-md flex justify-center items-center  ">
            {/* visible frame */}
            <div className="w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px] bg-red  flex  ">
                <div className={`w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px] rounded-lg shadow-md  ${isToggleMode?'bg-[#2c2a2ab1]':'bg-[#e4e1e1b1]'} border-[#524F4F] border-1  p-[35px] space-y-[21px]  overflow-y-auto relative `}>
                    <h1 className={` ${isToggleMode?"text-[#cbcaca]":"text-[#595959]"} font-bold text-[30px] md:text-[40px] text-nowrap`}>Songs</h1>

                    <div className=' flex flex-wrap gap-10 '>
                        {/*song drag and drop space */}
                        <div className=' flex justify-center items-center h-[120px] md:h-[196px] max-h-[927px] w-full bg-[#D9D9D9] border-1  border-dashed border-[#534E4E] cursor-grabbing' >
                            <p className={`text-[26px] md:text-[36px] text-[#595959]`}>Drag and Drop</p>
                        </div>

                        {/* your songs showcase  */}
                        <div className='w-full space-y-[15px]'>
                            <p className={`${isToggleMode?"text-[#cbcaca]":"text-[#595959]"}  font-bold  text-[15px] md:text-[20px] text-nowrap`}>Your Songs</p>
                            {/* your songs list */}
                            <div className=' space-y-[10px]'>
                                {userSongs.map((song, index) => (

                                    <div key={index} className={`group rounded-2xl bg-[#D9D9D9] border border-[#AEAEAE] w-full h-70 max-h-[70px] flex justify-between p-[10px]  hover:border-[#EB8801] ${currentlyPlayingIndex===index?'border-[#EB8801]':''}`} >
                                        {/* song name  */}
                                        <div className='flex justify-center items-center space-x-[10px]  md:space-x-[15px]  '><img className={` ${currentlyPlayingIndex===index?'animate-spin duration-[1s]':''} size-5 md:size-6 object-cover  `}  src="/Headerimages/DVD.png" /> <p className={`text-[#595959] font-medium  group-hover:text-[#EB8801] text-sm md:text-lg   ${currentlyPlayingIndex===index?'text-[#EB8801]':''} `}>{song.name.toUpperCase()}</p></div>
                                        {/* song options  */}
                                        <div className='flex gap-[20px]  md:gap-[34px] justify-evenly items-center '>
                                            <button onClick={() => setCurrentlyPlayingIndex(index === currentlyPlayingIndex ? null : index)} className='cursor-pointer'>{currentlyPlayingIndex === index ? <FaPause /> : <FaPlay />}</button>
                                            <button className=' cursor-pointer bg-gradient-to-b from-[#EB8801] from-0% to-[#AA660A] to-100% rounded-md md:rounded-xl h-fit py-[3.5px] px-[6.5px] md:px-[19.5px]  '><p className=' font-bold group text-sm md:text-md  text-[#D5D5D5] '>Set</p></button>
                                            <button className='cursor-pointer text-xl '><RiDeleteBin2Fill /></button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* default songs showcase  */}
                        <div className='w-full space-y-[15px]'>
                            <div className='w-full flex justify-between'>
                                <p className={`${isToggleMode?"text-[#cbcaca]":"text-[#595959]"} font-bold  text-[15px] md:text-[20px] text-nowrap `}>Our Library</p>
                                {/* togglebtn */}
                                <button onClick={() => toggleFunction()} className=' mt-1 relative group cursor-pointer drop-shadow-lg/20 group  '>
                                    <div className={` absolute z-10 h-1 w-9  flex justify-center items-center  rounded-full  transition-all ${isToggle ? 'right-0' : 'left-0'} `} ><img className='group-hover:animate-bounce  ' src={`/Headerimages/${isToggle ? 'Demon.png' : 'Angel.png'}`} /></div>
                                    <div className={` rounded-xl drop-shadow-lg/20 ${isToggle ? 'bg-red-500' : 'bg-white'}  w-[70px] h-[17px] border-1 border-t-2 border-b-4 border-t-black ${isToggle ? 'border-b-black' : 'border-b-[#1cb7d2]'} `} ></div>
                                </button>
                            </div>


                            {/* default songs list */}
                            <div className=' space-y-[10px]'>
                                {DefaultSongs.map((song, index) => {

                                    if ((isToggle && song.type !== 'demonic') || (!isToggle && song.type !== 'angelic')) return null;
                                  
                                    return (
                                        <div key={index} className={`group rounded-2xl bg-[#D9D9D9] border border-[#AEAEAE] w-full h-70 max-h-[70px] flex justify-between p-[10px]  hover:border-[#EB8801] ${currentlyPlayingIndex===index+Defaultoffset?'border-[#EB8801]':''}  `} >
                                            {/* song name  */}
                                            <div className='flex justify-center items-center space-x-[10px]  md:space-x-[15px]'><img className={`${currentlyPlayingIndex===index+Defaultoffset?'animate-spin duration-[1s]':''} size-5 md:size-6 object-cover`} src="/Headerimages/DVD.png" /> <p className={`text-[#595959] font-medium  group-hover:text-[#EB8801] text-sm md:text-lg  ${currentlyPlayingIndex===index+Defaultoffset?'text-[#EB8801]':''}   `}>{song.name.toUpperCase()}</p></div>
                                            {/* song options  */}


                                            <div className='flex gap-[20px]  md:gap-[34px] justify-evenly items-center '>
                                                <button onClick={() => setCurrentlyPlayingIndex(index + Defaultoffset === currentlyPlayingIndex ? null : index + Defaultoffset)} className='cursor-pointer'>{currentlyPlayingIndex === index + Defaultoffset ? <FaPause /> : <FaPlay />}</button>
                                                <button className=' cursor-pointer bg-gradient-to-b from-[#EB8801] from-0% to-[#AA660A] to-100% rounded-md md:rounded-xl h-fit py-[3.5px] px-[6.5px] md:px-[19.5px]  '><p className=' font-bold group  text-[#D5D5D5]  text-sm md:text-md'>Set</p></button>
                                            </div>
                                        </div>

                                    )


                                })}

                            </div>
                        </div>

                    </div>
                    <button onClick={() => setOpenSongs(false)} className="pl-4 flex md:hidden justify-end absolute top-2 right-2" ><p className="text-[#bba282] text-2xl font-bold cursor-pointer h-fit "><IoMdCloseCircle /></p></button>

                </div>
                {/* close */}
                <button onClick={() => setOpenSongs(false)} className="pl-4 hidden md:flex justify-end " ><p className="  h-fit cursor-pointer text-white text-2xl font-bold ">x</p></button>
            </div>
            <audio ref={audioRef} hidden ></audio>
        </div>
    )
}

export default Songs