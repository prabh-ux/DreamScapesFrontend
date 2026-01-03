import React from 'react'
import { useRef } from 'react';
import { MdFullscreen } from "react-icons/md";
import { MdOutlineGrid4X4 } from "react-icons/md";


const BottomToolBox = ({activeCanvas,dividerX,setDividerX,showGrid,setShowGrid}) => {
 
 
     const zoomRef = useRef();
    
    
      const canvasZoom = (e) => {
        
    
        const getX = (e) => {
          return e.touches ? e.touches[0].clientX : e.clientX;
    
        }
    
        const moveSlider = (e) => {
    
          const rect = zoomRef.current.getBoundingClientRect();
          const x = getX(e) - rect.left;
          const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
          setDividerX(percent);
        }
        moveSlider(e);
            const move = (event) => moveSlider(event);

    
        const stop = () => {
          window.removeEventListener('mousemove', move);
          window.removeEventListener('mouseup', stop);
          window.removeEventListener('touchmove', move);
          window.removeEventListener('touchend', stop);
    
        }
    
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', stop);
    
      }
    
  return (
    <div className='flex  h-fit w-full gap-[1rem] justify-end'>

        {/* zoomin/out */}
        <div ref={zoomRef} className=' relative min-h-[2rem] flex justify-center items-center  ' >
          <div onClick={canvasZoom} onMouseDown={canvasZoom} onTouchStart={canvasZoom} style={{ background: `linear-gradient(to right,${ ` #a0a4a0 ${dividerX}%,#d3d8d3 ${dividerX}%  `})` }} className=' w-[7rem] h-[0.2rem] bg-gray-300 rounded-b-sm cursor-pointer ' ></div>
         
          <button onMouseDown={canvasZoom} onTouchStart={canvasZoom} style={{ left: `${dividerX}%` }} className={`absolute z-5 left-1/2 -translate-x-1/2   cursor-pointer  w-[1rem] h-[1rem] rounded-full border-2 border-gray-400 bg-gray-300 `} ></button>
        </div>

        {/* grid */}
        <button onClick={() => setShowGrid((prev) => !prev)} className={`  text-2xl cursor-pointer flex flex-col justify-center items-center ${showGrid ? "text-orange-400" : "text-gray-300"} `}>
          <span  ><MdOutlineGrid4X4 /></span>
        </button>

        {/* page no */}
        <div className=' text-xl  flex flex-col justify-center items-center  text-gray-300' >
          <p>{activeCanvas.length}/1</p>
        </div>
        



      </div>
  )
}

export default BottomToolBox
