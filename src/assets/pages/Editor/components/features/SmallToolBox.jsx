import React from 'react'
import Design from '../Design';
import ColorPicker from './ColorPicker';
// Icons 
import { MdInsertPageBreak } from "react-icons/md";
import { IoLayers } from "react-icons/io5";
import { FaCrop } from "react-icons/fa";
import { CgDropOpacity } from "react-icons/cg";
import { TbBackground } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import Opacity from './Opacity';
import getScreenSize from '../getScreenSize';

const SmallToolBox = ({ setBgColor, activePanel2,setActivePanel2,DesignRef}) => {

const category=getScreenSize();
    const SmallToolBox = [
        // { text: "Insert Page", icon: MdInsertPageBreak },
        { text: "Design", icon: FaPencil },
        { text: "Layers", icon: IoLayers },
        { text: "Opacity", icon: CgDropOpacity },
        { text: "BG Color", icon: TbBackground },
        { text: "Downlode", icon: IoMdDownload },
      ]
  return (
     <div className='  w-full hidden md:flex justify-end  relative z-7  '>


            <div className={` text-white bg-white/25 backdrop-blur-lg rounded-2xl p-[0.5rem] flex   justify-end  items-center gap-[1rem]  `} >
              <div className='flex justify-around items-center w-full relative ' >
                {SmallToolBox.map((items, index) => {

                  return <button onClick={() => setActivePanel2(items.text)} className={`p-[0.5rem] px-[1rem] rounded-xl transition-colors duration-300 ease-in-out w-full text-nowrap ${activePanel2 === items.text && "bg-orange-400"} cursor-pointer flex flex-col justify-center  items-center `} key={index} ><span className={` ${category!=="large"?"text-sm":"text-xl"}`}>{<items.icon />}</span><p className={`  ${category!=="large"?"text-xs":"text-sm"} `}>{items.text}</p></button>

                })}

                {activePanel2 === "Design" && <Design setActivePanel2={setActivePanel2} ref={DesignRef} />}
                {activePanel2 === "BG Color" && <ColorPicker className="scale-[0.65] origin-top-right absolute  top-[4.5rem] w-[20rem] " onChange={(hex) => setBgColor(hex)} />}
                {activePanel2 === "Opacity" && <Opacity  />}
              </div>
            </div>
          </div>
  )
}

export default SmallToolBox
