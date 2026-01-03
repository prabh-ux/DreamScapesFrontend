import React, { useState, useEffect, useRef } from 'react'

const FullScreen = ({ width, height, setExpandImage,url }) => {

  const [size, setSize] = useState({ width, height });

  //image enlarge function
  useEffect(() => {
    const imageEnlarger = () => {
      const newHeight = size.height ;
      const newWidth = size.width;

      setSize({ width: newWidth, height: newHeight });
    }

    imageEnlarger();
  }, [width, height])

  const closeImage = useRef();


  return (
    <div ref={closeImage} onClick={(e) => { if (e.target === closeImage.current) setExpandImage(null) }} className='bg-[#83818164]  inset-0 fixed z-10  flex justify-center items-center cursor-auto '>
      <div className='flex' style={{ width: `${size.width}px`, height: `${size.height}px` }}>
        <img src={url}  className='bg-[#e4e1e1] border-[#524F4F]' style={{ width: `${size.width}px`, height: `${size.height}px` }}/>

        
        {/* close */}
        <button onClick={() => setExpandImage(null)} className="pl-4  flex justify-end " ><p className="  h-fit cursor-pointer text-white text-2xl font-bold ">x</p></button>
      </div>
    </div>
  )
}

export default FullScreen