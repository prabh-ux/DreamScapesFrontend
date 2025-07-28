import React, { useRef, useState, useEffect } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaBalanceScaleRight } from "react-icons/fa";
import { GiPlayButton } from 'react-icons/gi';
import { FaRegLightbulb } from "react-icons/fa";
import { MdInvertColors } from "react-icons/md";
import { TbTexture } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { updateEditSetting } from '../../../../Redux/Edit';



const Edit = ({ setActivePanel, }) => {


    // Filter categories with only valid CSS filters
    const [whiteBalance, setWhiteBalance] = useState([
        { name: "Temperature", value: 50 }, // mapped to hue-rotate
        { name: "Tint", value: 50 },         // mapped to hue-rotate
    ]);
    const darkMode = useSelector(state => state.theme?.darkMode)

    const [light, setLight] = useState([
        { name: "Brightness", value: 50 },
        { name: "Contrast", value: 50 },
        { name: "Opacity", value: 100 },
    ]);

    const [color, setColor] = useState([
        { name: "Saturation", value: 50 },
        { name: "Grayscale", value: 0 },
        { name: "Sepia", value: 0 },
        { name: "Invert", value: 0 },
    ]);

    const [texture, setTexture] = useState([
        { name: "Blur", value: 0 },
    ]);

    const selectedElement = useSelector(state => state.selectedElement?.selectedElement);
    const updatedElementSetting = useSelector(state => state.editsettings?.EditSettings);

    const wbRef = useRef([]);
    const lightRef = useRef([]);
    const colorRef = useRef([]);
    const textureRef = useRef([]);
    const dispatch = useDispatch();


   useEffect(() => {
    if (!selectedElement || !selectedElement.editSettings) return;

    const { whiteBalance: wb, light: l, color: c, texture: t } = selectedElement.editSettings;

    if (wb?.length > 0) setWhiteBalance(wb);
    if (l?.length > 0) setLight(l);
    if (c?.length > 0) setColor(c);
    if (t?.length > 0) setTexture(t);

}, [selectedElement]);




   useEffect(() => {
  if (!selectedElement) return;

  dispatch(updateEditSetting({
    selectedElement,
    edit: { whiteBalance, light, color, texture }
  }));
}, [ whiteBalance, light, color, texture]);



    const MoveSlider = (e, index, setState, arrRef) => {
        const getX = (e) => {

            return e.touches ? e.touches[0].clientX : e.clientX;
        }

        const setValue = (e) => {

            const el = arrRef.current[index];
            if (!el) return;              // ← guard here

            // ...rest unchanged...


            const rect = el.getBoundingClientRect();
            const x = getX(e) - rect.left
            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))

            setState(prev =>
                prev.map((item, i) =>
                    i === index ? { ...item, value: percent } : item
                )
            );

        }

        setValue(e);
    }



    const dragX = (index, setState, arrRef) => (e) => {

        e.preventDefault();
        const handelMove = (e) => {
            MoveSlider(e, index, setState, arrRef);
        }



        const stop = () => {

            window.removeEventListener('mousemove', handelMove);
            window.removeEventListener('mouseup', stop);
            window.removeEventListener('touchmove', handelMove);
            window.removeEventListener('touchend', stop);

        }

        window.addEventListener('mousemove', handelMove);
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchmove', handelMove);
        window.addEventListener('touchend', stop);

    }

  


    return (
        <div className={`transition-all duration-300 ease-in-out ${darkMode ? "text-white bg-[#473147] " : "text-gray-800 bg-white  "}  z-7  w-fit  p-[1rem]  rounded-md   items-center relative  `} >


            <div className='flex flex-col px-[0.5rem]  items-center justify-around h-full overflow-y-auto overflow-x-hidden'>


                {/* white balance */}
                <div className='w-full min-w-[12rem] flex flex-col gap-[0.5rem] '>
                    <p className='flex items-center gap-[0.2rem] text-sm font-semibold  '><FaBalanceScaleRight /><span className='text-nowrap' >White Balance </span></p>
                    <div className='flex flex-col gap-[0.5rem]'>


                        {whiteBalance.map((items, index) => (
                            <div ref={(e1) => wbRef.current[index] = e1} className='text-sm  flex flex-col  gap-[0.6rem] px-[0.2rem]' key={index} >
                                <p className=' text-xs'>{items.name}</p>
                                <div className='relative flex items-center'>
                                    <div onClick={(e) => MoveSlider(e, index, setWhiteBalance, wbRef)} style={{ background: `linear-gradient(to right,${items.name === "Temperature" ? `#0033FF ${items.value}%,#FFCC00 ${items.value}% ` : ` #25ca2a ${items.value}%,#c323ff ${items.value}%  `})` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                    <button onMouseDown={dragX(index, setWhiteBalance, wbRef)} onTouchStart={dragX(index, setWhiteBalance, wbRef)} style={{ left: `${items.value}%` }} className='cursor-pointer absolute border-1 border-gray-300 bg-white w-[1rem] rounded-full h-[1rem] transform -translate-x-1/2' ></button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* light */}
                <div className='w-full flex flex-col gap-[0.5rem]' >
                    <p className='flex items-center gap-[0.2rem] text-sm font-semibold  '><FaRegLightbulb /><span className='text-nowrap' >light</span></p>

                    <div className='flex flex-col gap-[0.5rem] '>


                        {light.map((items, index) => (
                            <div ref={(e1) => lightRef.current[index] = e1} className='text-sm  flex flex-col  gap-[0.6rem] px-[0.2rem] ' key={index} >
                                <p className=' text-xs'>{items.name}</p>
                                <div className='relative flex items-center'>
                                    <div onClick={(e) => MoveSlider(e, index, setLight, lightRef)} style={{ background: `linear-gradient(to right,#a0a4a0 ${items.value}%,#d3d8d3 ${items.value}%)` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer ' ></div>
                                    <button onMouseDown={dragX(index, setLight, lightRef)} onTouchStart={dragX(index, setLight, lightRef)} style={{ left: `${items.value}%` }} className='cursor-pointer absolute border-1 border-gray-300 bg-white w-[1rem] rounded-full h-[1rem] transform -translate-x-1/2 ' ></button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* color */}
                <div className='w-full flex flex-col gap-[0.5rem]' >
                    <p className='flex items-center gap-[0.2rem] text-sm font-semibold  '><MdInvertColors /><span className='text-nowrap' >Color</span></p>

                    <div className='flex flex-col gap-[0.5rem] '>


                        {color.map((items, index) => (
                            <div ref={(e1) => colorRef.current[index] = e1} className='text-sm  flex flex-col  gap-[0.6rem] px-[0.2rem] ' key={index} >
                                <p className=' text-xs'>{items.name}</p>
                                <div className='relative flex items-center'>
                                    <div onClick={(e) => MoveSlider(e, index, setColor, colorRef)} style={{ background: `linear-gradient(to right,#a0a4a0 ${items.value}%,#d3d8d3 ${items.value}%)` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                    <button onMouseDown={dragX(index, setColor, colorRef)} onTouchStart={dragX(index, setColor, colorRef)} style={{ left: `${items.value}%` }} className='cursor-pointer absolute border-1 border-gray-300 bg-white w-[1rem] rounded-full h-[1rem] transform -translate-x-1/2' ></button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                {/* texture */}
                <div className='w-full flex flex-col gap-[0.5rem]' >
                    <p className='flex items-center gap-[0.2rem] text-sm font-semibold  '><TbTexture /><span className='text-nowrap' >Texture</span></p>

                    <div className='flex flex-col gap-[0.5rem] '>


                        {texture.map((items, index) => (
                            <div ref={(e1) => textureRef.current[index] = e1} className='text-sm  flex flex-col  gap-[0.6rem] px-[0.2rem]' key={index} >
                                <p className=' text-xs'>{items.name}</p>
                                <div className='relative flex items-center'>
                                    <div onClick={(e) => MoveSlider(e, index, setTexture, textureRef)} 
                                    style={{
                                         background: `linear-gradient(to right,#a0a4a0 ${items.value}%,#d3d8d3 ${items.value}%)` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                                    <button onMouseDown={dragX(index, setTexture, textureRef)} onTouchStart={dragX(index, setTexture, textureRef)} style={{ left: `${items.value}%` }} className='cursor-pointer absolute border-1 border-gray-300 bg-white w-[1rem] rounded-full h-[1rem] transform -translate-x-1/2' ></button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={() => { setActivePanel(null); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </button>


        </div>
    )
}

export default Edit