import React from 'react'
import { useSelector } from 'react-redux'

const ToolSizeSetter = ({toolSizeRef,toolSize,setToolSize}) => {
    const darkMode = useSelector(state => state.theme?.darkMode)

const handelToolSizeDrag=(e)=>{

const getX=(e)=>{
return e.touches?e.touches[0].clientX:e.clientX;
}

const setSize=(e)=>{
const rect=toolSizeRef.current.getBoundingClientRect();
const x=getX(e)-rect.left;
const percentage=Math.max(0,Math.min(95,(x/rect.width)*100));
setToolSize(percentage);
}

 const stop = () => {
      window.removeEventListener('mousemove', setSize);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', setSize);
      window.removeEventListener('touchend', stop);

    }

    window.addEventListener('mousemove', setSize);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', setSize);
    window.addEventListener('touchend', stop);


}


    return (
        <div className={`p-[1rem] rounded-lg ${darkMode?"bg-[#3d2840]":"bg-[#9f6ca8]"} w-full origin-top-left flex flex-col justify-end items-start absolute top-[3.2rem] `}>
            <div className='w-full flex items-center justify-between' >
                <p>Size</p>
                <p>{Math.round(toolSize)}%</p>
            </div>
            {/* toolsize*/}
            <div ref={toolSizeRef} className='  relative min-h-[2rem] flex justify-center items-center w-full ' >
                <div className=' w-full h-[0.2rem] bg-gray-300 rounded-b-sm ' ></div>
                <div onMouseDown={handelToolSizeDrag} onTouchStart={handelToolSizeDrag} style={{ left: `${toolSize}%` }} className={`absolute z-10   cursor-pointer  w-[1rem] h-[1rem] rounded-full border-2 border-gray-400 bg-gray-300 `} ></div>
            </div>
        </div>
    )
}

export default ToolSizeSetter