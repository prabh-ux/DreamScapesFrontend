import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { TiArrowDownOutline } from "react-icons/ti";
import { TiArrowUpOutline } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLayers } from '../../../../Redux/layersSlice';
import { setDeleteClicked } from '../../../../Redux/Delete';

const Layer = ({ setActivePanel2, setActivePanel }) => {

    const elements = useSelector(state => state.layers?.layers);
    const deleteClicked = useSelector(state => state.deleteImage?.deleteClicked);
    const dispatch = useDispatch();
    const textSettings = useSelector(state => state.TextSettings);

    const darkMode = useSelector(state => state.theme?.darkMode)

    const dispatchUpdatedArray = (updatedArray) => {
        dispatch(setLayers(updatedArray));
    }





    const [movedIndex, setMovedindex] = useState(null);
    const [isSelected, setIsSelected] = useState(null);

    const handleUp = (i) => (e) => {
        e.stopPropagation();
        const newlayer = [...elements];
        setMovedindex(i - 1);
        setIsSelected(null);

        [newlayer[i - 1], newlayer[i]] = [newlayer[i], newlayer[i - 1]];
        dispatchUpdatedArray(newlayer);
    }

    const handleDown = (i) => (e) => {
        e.stopPropagation();
        const newlayer = [...elements];
        setMovedindex(i + 1);
        setIsSelected(null);
        [newlayer[i], newlayer[i + 1]] = [newlayer[i + 1], newlayer[i]];
        dispatchUpdatedArray(newlayer);
    }
    const handleSelected = (i) => {
        setIsSelected(i);
        setMovedindex(null);
    }


    const handleDelete = (i) => (e) => {
        e.stopPropagation();
        if (movedIndex !== null || isSelected !== null) {

            if (movedIndex === i || isSelected === i) {
                const newlayers = elements.filter((_, index) => index !== i);
                dispatchUpdatedArray(newlayers);
                setIsSelected(null);
                setMovedindex(null);
                dispatch(setDeleteClicked(true));
            }

        }
    }

    return (
        <div className={`transition-all duration-300 ease-in-out z-7 ${darkMode ? "text-white bg-[#473147] " : "text-gray-800 bg-white  "} w-fit  p-[1rem] rounded-md  flex-col items-center relative `} >

            <div className=' w-fit max-w-[90rem]  flex flex-col gap-[1rem] items-center max-h-[40rem]  overflow-y-auto overflow-x-hidden '>
                {/*elements drag and drop space */}
                {elements.map((item, i) => (
                    <div onClick={() => handleSelected(i)} key={i} className={`   transition-transform duration-300 ${movedIndex === i || isSelected === i ? 'scale-90 ' : 'scale-100'} flex flex-col   h-[10rem] w-[15rem]  text-2xl gap-[0.5rem] p-[0.2rem]  max-h-[927px]      ${darkMode?"bg-[#5a3d5a] border-[#a19a9a]   ":"bg-[#D9D9D9] border-[#534E4E]  "} border-2 border-dashed ${movedIndex === i || isSelected === i ? "border-orange-400 text-orange-400 " : "border-[#a79d9d] text-[#6b6565]"}  rounded-lg `} >
                        <div className={ ` ${darkMode ? "text-white  " : "text-gray-800   "}  w-full h-fit  flex justify-end text-xl items-center `}>
                            <button onClick={handleDelete(i)} className='cursor-pointer'><MdDelete /></button></div>
                        <div className='w-full h-[90%] flex gap-[0.5rem]  items-center overflow-hidden '>
                            <div className={ `text-lg p-[0.2rem] flex flex-col justify-around h-full ${darkMode ? "text-white " : "text-gray-800 "}  `} >
                                <button onClick={handleUp(i)} className={`cursor-pointer transition-all duration-100 ease-in-out hover:bg-amber-500 hover:text-white p-[0.5rem] rounded-md ${i === 0 && 'hidden'} `} ><TiArrowUpOutline /></button>
                                <button onClick={handleDown(i)} className={`cursor-pointer transition-all duration-100 ease-in-out hover:bg-amber-500 hover:text-white p-[0.5rem] rounded-md ${i === elements.length - 1 && 'hidden'}  `} ><TiArrowDownOutline /></button></div>
                            {item.type === "image" && item.imageSrc ? <img className='  object-cover ' src={item.imageSrc} /> :



                                <p style={{

                                    userSelect: 'none',
                                    color: `${textSettings.color}`, opacity: `${textSettings.opacity}%`, textShadow: `${textSettings.shadow}px ${textSettings.shadow}px ${textSettings.shadow / 2}px ${textSettings.ShadowColor}`
                                    , fontSize: `${textSettings.size}px`, fontWeight: Math.min(textSettings.stroke * 10, 900)
                                }} className=''  >{item.text}</p>}
                        </div>
                    </div>
                ))}




            </div>
            <div onClick={() => { setActivePanel(null); setActivePanel2(null) }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </div>


        </div>
    )
}

export default Layer