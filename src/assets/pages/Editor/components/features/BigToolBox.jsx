import React, { useEffect, useState } from 'react'
import Uplode from '../Uplode';
import Elements from '../Elements';
import Text from '../Text';
import Edit from '../Edit';
import Save from '../Save';
import Generate from '../Generate';
import Layer from '../Layer';

// icons
import { IoCloudUpload } from "react-icons/io5";
import { TbAppsFilled } from "react-icons/tb";
import { MdOutlineTextFields } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteClicked } from '../../../../../Redux/Delete';
import UndoandRedu from './UndoandRedu';
import getScreenSize from '../getScreenSize';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const BigToolBox = ({ bgColor, pastRef, futureRef, activePanel, setActivePanel, activePanel2, setActivePanel2 }) => {
  const category = getScreenSize();
  const [toolBoxHidden, setToolBoxHidden] = useState(false);
  const [arrowHidden, setArrowHidden] = useState(false);
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
  useEffect(() => {
  if (activePanel === null || activePanel === "Undo" || activePanel === "Redo") {
    setArrowHidden(false);
  } else {
    setArrowHidden(true);
  }
}, [activePanel]);

  const dispatch = useDispatch();

  const handleClick = (items) => {
    setActivePanel(items.text);

    if (items.text === "Delete") {
      dispatch(setDeleteClicked(true));
    }
    if (items.text === "Undo" || items.text === "Redo") {
      UndoandRedu(items.text, pastRef, futureRef);
    }

  }

  return (
    <div className={`flex  ${category !== "large" ? " max-h-[35rem]" : " max-h-[45rem]"}  `} >

      <div className={`relative backdrop-blur flex-col w-fit justify-around items-center  ${category !== "large" ? " gap-[0.5rem] p-[0.2rem]" : " gap-[1rem] p-[0.5rem]"}   `} >
        <div className={` text-white bg-white/25 backdrop-blur-lg rounded-2xl ${toolBoxHidden ? "hidden" : "flex"} flex-col w-fit justify-around items-center  ${category !== "large" ? " gap-[0.5rem] p-[0.2rem]" : " gap-[1rem] p-[0.5rem]"}   `} >
          {BigToolBox.map((items, index) => {

            return <button onClick={() => handleClick(items)}
              className={`p-[0.5rem] rounded-xl transition-colors duration-300 ease-in-out w-full ${activePanel === items.text && "bg-orange-400"} cursor-pointer flex flex-col justify-center  items-center `} key={index} ><span className={`  ${category !== "large" ? "text-sm" : "text-xl"} `}>{<items.icon />}</span><p className={`  ${category !== "large" ? "text-xs" : "text-sm"} `}>{items.text}</p></button>

          })}
        </div>
        <div onClick={() => { setToolBoxHidden(prev => !prev) }} className={`bg-[#EB8801]  cursor-pointer absolute z-30  shadow-lg  border-black ${arrowHidden ? "hidden" : "flex"}  justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white `}>{toolBoxHidden ? <IoIosArrowForward /> : <IoIosArrowBack />} </div>

      </div>

      {activePanel === "Uplodes" && <Uplode setActivePanel={setActivePanel} />}
      {activePanel === "Elements" && <Elements setActivePanel={setActivePanel} />}
      {activePanel === "Text" && <Text setActivePanel={setActivePanel} />}
      {activePanel === "Edit" && <Edit setActivePanel={setActivePanel} />}
      {activePanel === "Save" && <Save bgColor={bgColor} setActivePanel={setActivePanel} />}
      {activePanel === "Generate" && <Generate setActivePanel={setActivePanel} />}
      {activePanel === "Layers" && activePanel2 === "Layers" && <Layer setActivePanel2={setActivePanel2} setActivePanel={setActivePanel} />}




    </div>
  )

}
export default BigToolBox
