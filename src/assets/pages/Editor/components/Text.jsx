import React, { useRef, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import ColorPicker from './features/ColorPicker';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { updateTextSettings } from '../../../../Redux/TextSettings';
import { useEffect } from 'react';
import { setText } from '../../../../Redux/TextSlice';

const Text = ({ setActivePanel }) => {

    const darkMode = useSelector(state => state.theme?.darkMode)

    const [color, setColor] = useState(darkMode ? "white" : "black");
    const StrokeRef = useRef();
    const SizeRef = useRef();
    const ShadowRef = useRef();
    const opacityRef = useRef();
    const [StrokeX, setStrokeX] = useState(40);
    const [SizeX, setSizeX] = useState(50);
    const [ShadowX, setShadowX] = useState(0);
    const [opacityX, setOpacityX] = useState(100);
    const [ShadowColor, setShadowColor] = useState("black");
    const dispatch = useDispatch();
    const textSettings = useSelector(state => state.TextSettings);



    useEffect(() => {
        if (!textSettings) return;

        setStrokeX(textSettings.stroke);
        setColor(textSettings.color);
        setSizeX(textSettings.size);
        setShadowX(textSettings.shadow);
        setOpacityX(textSettings.opacity);
        setShadowColor(textSettings.ShadowColor);
    }, [textSettings])


    const handlechange = (color) => {
        setColor(color.hex);

    }

    useEffect(() => {

        const timeout = setTimeout(() => {
            dispatch(updateTextSettings({
                color: color,
                stroke: Math.round(StrokeX),
                size: Math.round(SizeX),
                shadow: Math.round(ShadowX),
                opacity: Math.round(opacityX),
                ShadowColor: ShadowColor,
                LineHeight: 20
            }));

        }, 100);

        return () => clearTimeout(timeout);
    }, [color, StrokeX, SizeX, ShadowX, opacityX, ShadowColor]);



    const valueIncreaser = (setValue, ref) => {
        return (e) => {
            const getX = (event) =>
                event.touches ? event.touches[0].clientX : event.clientX;

            const updateValue = (event) => {
                const rect = ref.current.getBoundingClientRect();
                const x = getX(event) - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                setValue(percentage);
            };

            // Initial click
            updateValue(e);

            const move = (event) => updateValue(event);

            const stop = () => {
                window.removeEventListener("mousemove", move);
                window.removeEventListener("mouseup", stop);
                window.removeEventListener("touchmove", move);
                window.removeEventListener("touchend", stop);
            };

            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", stop);
            window.addEventListener("touchmove", move);
            window.addEventListener("touchend", stop);
        };
    };


    const handleClick = (heading, stroke, size, lineHeight) => {
        dispatch(setText({ text: heading }))
        dispatch(updateTextSettings({ color: color, stroke: Math.round(stroke), size: Math.round(size), shadow: Math.round(ShadowX), opacity: Math.round(opacityX), ShadowColor: ShadowColor, LineHeight: lineHeight }));

    }

    return (
        <div className={`transition-all duration-300 ease-in-out  z-7  ${darkMode ? "bg-[#473147]  " : "bg-white "} max-h-full  w-fit p-[1rem] rounded-md  flex-col items-center relative `} >

            <div className='w-full flex flex-col gap-[2rem] max-h-[28rem] lg:max-h-[38rem] overflow-y-auto  p-[1rem ] '>

                {/* search 
                <div className='w-full rounded-sm  p-[0.5rem] gap-[0.2rem] px-[0.5rem] text-gray-400 placeholder-gray-500 border-1 border-gray-400 font-semibold text-sm text-nowrap flex items-center   ' > <IoSearch />
                    <input placeholder='Search Font' className=' outline-none ' />
                </div>*/}

                {/* default text styles  */}
                <div className='flex flex-col gap-[0.5rem]' >
                    <p className={`flex text-sm  items-center gap-[0.3rem]  ${darkMode ? "text-white " : "text-gray-600 "}  `} >Default Text Styles<span><FaLongArrowAltRight /></span></p>

                    {/* text buttons */}

                    <div style={{ color: `${color}` }} className='flex flex-col gap-[0.5rem]  '>
                        <button onClick={() => handleClick("Your Heading", 70, 30, 36)} className="cursor-pointer text-nowrap font-bold border-1 w-full rounded-2xl text-3xl p-[0.4rem] border-gray-400 " >Your Heading</button>
                        <button onClick={() => handleClick("Your Subheading", 60, 20, 28)} className="cursor-pointer text-nowrap font-semibold border-1 w-full rounded-2xl text-xl p-[0.4rem]  border-gray-400" >Your Subheading</button>
                        <button onClick={() => handleClick("Your body text", 40, 14, 20)} className="cursor-pointer text-nowrap  border-1 w-full rounded-2xl text-sm p-[0.4rem] border-gray-400 " >Your body text</button>
                    </div>

                </div>

                {/* text color selector */}

                <div className=' flex flex-col gap-[0.5rem]  '>
                    <p className={`flex text-sm  items-center gap-[0.3rem] ${darkMode ? "text-white " : "text-gray-600 "} `} >Select Text Color <span style={{ backgroundColor: `${color}` }} className={`  rounded-full h-[1rem] w-[1rem]`} /></p>
                    <div style={{ backgroundColor: `${color}` }} className={`w-full h-[1rem]  rounded-md `} ></div>
                    <div className='flex justify-center max-w-[20rem] ' >
                        <SketchPicker
                            color={color}
                            onChange={handlechange}
                            styles={{
                                default: {
                                    picker: {

                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        padding: "1rem",
                                        width: "90%",
                                        color: darkMode ? "white" : "black",
                                        background: darkMode ? "#5a3d5a" : "#D9D9D9",
                                        border: `1px solid ${darkMode ? "#a19a9a" : "#534E4E"}`,

                                    },
                                    head: {

                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* setting */}
                <div >
                    {/* stroke ,size ,shadow*/}
                    <div className=' flex flex-col gap-[0.5rem]  '>
                        <p className={`flex text-sm  items-center gap-[0.3rem] ${darkMode ? "text-white " : "text-gray-600 "} font-semibold `} >Text Settings<span><FaLongArrowAltRight /></span></p>
                        <button onClick={() => handleClick("Aa", StrokeX, SizeX, 36)} className=' my-[1rem] rounded-sm  cursor-pointer w-[100%] h-[10rem] flex justify-center items-center border-1 border-gray-500 '  >
                            <div style={{
                                opacity: `${opacityX}%`,
                                textShadow: `${ShadowX}px ${ShadowX}px ${ShadowX / 2}px ${ShadowColor}`
                                , fontSize: `${SizeX}px`, color: `${color}`, fontWeight: Math.min(StrokeX * 10, 900)
                            }} className=" text-nowrap  w-fit h-fit rounded-md    p-[0.4rem] " >Aa</div>

                        </button>


                        {/* stroke slider */}
                        <div className='flex flex-col items-start min-w-[100%] gap-[0.1rem] px-[0.5rem] '>

                            <div className={`w-full flex justify-between ${darkMode ? "text-white " : "text-gray-800 "}`}>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem] ' >Stroke</p>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem] ' >{Math.round(StrokeX)}%</p>
                            </div>
                            <div ref={StrokeRef} className=' b relative min-h-[1rem] w-full flex justify-center items-center touch-none ' >
                                <div onClick={valueIncreaser(setStrokeX, StrokeRef)} style={{ background: `linear-gradient(to right,${` #a0a4a0 ${StrokeX}%,#d3d8d3 ${StrokeX}%  `})` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                <button onMouseDown={valueIncreaser(setStrokeX, StrokeRef)} onTouchStart={valueIncreaser(setStrokeX, StrokeRef)} style={{ left: `${StrokeX}%` }} className={`absolute z-10   cursor-pointer  w-[1rem] h-[1rem] rounded-full border-2 border-gray-400 bg-gray-300  transform -translate-x-1/2 `} ></button>
                            </div>
                        </div>

                        {/* Size Slider */}
                        <div className='flex flex-col items-start min-w-[100%] gap-[0.1rem] px-[0.5rem] '>

                            <div className={`w-full flex justify-between ${darkMode ? "text-white " : "text-gray-800 "}`}>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem]  ' >Size</p>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem]  ' >{Math.round(SizeX)}%</p>
                            </div>
                            <div ref={SizeRef} className=' b relative min-h-[1rem] w-full flex justify-center items-center  ' >
                                <div onClick={valueIncreaser(setSizeX, SizeRef)} style={{ background: `linear-gradient(to right,${` #a0a4a0 ${SizeX}%,#d3d8d3 ${SizeX}%  `})` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                <button onMouseDown={valueIncreaser(setSizeX, SizeRef)} onTouchStart={valueIncreaser(setSizeX, SizeRef)} style={{ left: `${SizeX}%` }} className={`absolute z-10   cursor-pointer  w-[1rem] h-[1rem] rounded-full border-2 border-gray-400 bg-gray-300  transform -translate-x-1/2 `} ></button>
                            </div>
                        </div>
                        {/* opacity Slider */}
                        <div className='flex flex-col items-start min-w-[100%] gap-[0.1rem] px-[0.5rem] '>

                            <div className={`w-full flex justify-between ${darkMode ? "text-white " : "text-gray-800 "}`}>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem] ' >Opacity</p>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem] ' >{Math.round(opacityX)}%</p>
                            </div>
                            <div ref={opacityRef} className=' b relative min-h-[1rem] w-full flex justify-center items-center  ' >
                                <div onClick={valueIncreaser(setOpacityX, opacityRef)} style={{ background: `linear-gradient(to right,${` #a0a4a0 ${opacityX}%,#d3d8d3 ${opacityX}%  `})` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                <button onMouseDown={valueIncreaser(setOpacityX, opacityRef)} onTouchStart={valueIncreaser(setOpacityX, opacityRef)} style={{ left: `${opacityX}%` }} className={`absolute z-10   cursor-pointer  w-[1rem] h-[1rem] rounded-full border-2 border-gray-400 bg-gray-300  transform -translate-x-1/2 `} ></button>
                            </div>
                        </div>
                        {/* shadow Slider */}
                        <div className='flex flex-col items-start min-w-[100%] gap-[0.1rem] px-[0.5rem] '>

                            <div className={`w-full flex justify-between ${darkMode ? "text-white " : "text-gray-800 "}`}>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem] ' >Shadow</p>
                                <p className='  flex text-xs text-left  items-center gap-[0.3rem] ' >{Math.round(ShadowX)}%</p>
                            </div>
                            <div ref={ShadowRef} className=' b relative min-h-[1rem] w-full flex justify-center items-center  ' >
                                <div onClick={valueIncreaser(setShadowX, ShadowRef)} style={{ background: `linear-gradient(to right,${` #a0a4a0 ${ShadowX}%,#d3d8d3 ${ShadowX}%  `})` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                <button onMouseDown={valueIncreaser(setShadowX, ShadowRef)} onTouchStart={valueIncreaser(setShadowX, ShadowRef)} style={{ left: `${ShadowX}%` }} className={`absolute z-10   cursor-pointer  w-[1rem] h-[1rem] rounded-full border-2 border-gray-400 bg-gray-300  transform -translate-x-1/2 `} ></button>
                            </div>

                            <div className='flex justify-center max-w-[20rem] mt-[1rem]  ' >
                                <SketchPicker
                                    color={ShadowColor}
                                    onChange={(color) => setShadowColor(color.hex)}
                                    styles={{
                                        default: {
                                            picker: {

                                                borderRadius: '8px',
                                                boxShadow: 'none',
                                                padding: "1rem",
                                                width: "90%",
                                                color: darkMode ? "white" : "black",
                                                background: darkMode ? "#5a3d5a" : "#D9D9D9",
                                                border: `1px solid ${darkMode ? "#a19a9a" : "#534E4E"}`,


                                            },
                                            head: {

                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    </div>



                </div>

            </div >
            <div onClick={() => { setActivePanel(null); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </div>


        </div >
    )
}

export default Text