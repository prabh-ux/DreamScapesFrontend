import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSize as updateCanvasSize } from '../../../Redux/CanvasSize';


const Resizable = ({ setCreateNewOpen }) => {

    const [size, setSize] = useState({ width: 200, height: 200 });
    const Max_Width = 500;
    const Max_Height = 500;
    const [dragType, setDragType] = useState(null);
    const boxRef = useRef();
    const [units, setUnits] = useState("px");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const unitToPx = {
        px: 1,
        in: 96,
        mm: 3.78,
        cm: 37.8
    }
    const widthinPx = size.width * unitToPx[units];
    const heightinPx = size.height * unitToPx[units];
    const scale = Math.min(1, Max_Width / widthinPx, Max_Height / heightinPx);


    const moveToEditor2 = () => {
    
        dispatch(updateCanvasSize({ width: widthinPx * scale, height: heightinPx * scale }));
        navigate('/editor');
        setCreateNewOpen(false);

    }


    const simplifyRatio = (width, height) => {
        const gcd = (a, b) => { return b === 0 ? a : gcd(b, a % b) };
        const d = gcd(width, height);
        return `${Math.round(width / d)}:${Math.round(height / d)}`;
    }

    useEffect(() => {


        const onMouseMove = (e) => {

            if (!boxRef.current || !dragType) return;

            const rect = boxRef.current.getBoundingClientRect();
            let newWidth = size.width;
            let newHeight = size.height;

            if (dragType.includes("left")) {
                newWidth = rect.right - e.clientX;
            }
            if (dragType.includes("right")) {
                newWidth = e.clientX - rect.left;
            }
            if (dragType.includes("top")) {
                newHeight = rect.bottom - e.clientY;
            }
            if (dragType.includes("bottom")) {
                newHeight = e.clientY - rect.top;
            }

            setSize({
                width: Math.min(Math.max(50, newWidth), Max_Width),
                height: Math.min(Math.max(50, newHeight), Max_Height)
            })

        }

        const OnMouseUp = () => setDragType(null);

        if (dragType) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", OnMouseUp);
        }

        return () => {

            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", OnMouseUp);
        }
    }, [dragType, size]);

    const handelMouseDown = (type) => (e) => {
        e.preventDefault();
        setDragType(type);
    }

    const handelStyle = `absolute w-3 h-3 bg-orange-500 z-10 cursor pointer`;




    return (
        <div className='relative flex justify-center items-center flex-col gap-9 py-5  '>
            <div ref={boxRef} className={` hidden md:flex ${dragType && 'border-[#EB8801] text-[#EB8801] '}  flex justify-center items-center bg-[#D9D9D9] border-1 border-[#534E4E] hover:border-[#EB8801]  border-dashed  text-[#595959] hover:text-[#EB8801] relative `}
                style={{ width: widthinPx * scale, height: heightinPx * scale }}>
                {/* ratio display */}
                <div className=' w-fit  text-md px-1 py-0.5 rounded-br'>
                    {Math.round(size.width)}x{Math.round(size.height)}
                    {/* {(simplifyRatio(Math.round(size.width),Math.round(size.height)))} */}
                </div>

                {/* handels corners */}
                <div onMouseDown={handelMouseDown('top-left')} className={` ${handelStyle} top-0 left-0 cursor-nwse-resize`}></div>
                <div onMouseDown={handelMouseDown('top-right')} className={`${handelStyle} top-0 right-0 cursor-nesw-resize`}></div>
                <div onMouseDown={handelMouseDown('bottom-left')} className={`${handelStyle} bottom-0 left-0 cursor-nesw-resize`}></div>
                <div onMouseDown={handelMouseDown('bottom-right')} className={`${handelStyle} bottom-0 right-0 cursor-nwse-resize`}></div>

            </div>
            <form onSubmit={moveToEditor2}  className=' w-full flex flex-col  space-x-2 space-y-5'>
                <div className=' placeholder-gray-700   w-full flex flex-col sm:flex-row  space-x-2 overflow-x-auto justify-center items-center  '>


                    <div className='flex flex-col  '>
                        <label className='text-sm '>Height</label>
                        <input type='number' onChange={(e) => setSize((prev) => ({ ...prev, height: Number(e.target.value) }))} value={size.height} className='border-1 focus:border-[#EB8801] border-black bg-[#cecaca] p-1 outline-none w-26 min-w-2 rounded-md text-gray-800 ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm '>Width</label>
                        <input type='number' onChange={(e) => setSize((prev) => ({ ...prev, width: Number(e.target.value) }))} value={size.width} className='border-1 focus:border-[#EB8801] border-black bg-[#cecaca] p-1 outline-none w-26 rounded-md text-gray-800' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm '>Px</label>
                        <select value={units} onChange={(e) => setUnits(e.target.value)} className='outline-none w-26 border-1 focus:border-[#EB8801] border-black bg-[#cecaca] p-1  rounded-md text-gray-800'>
                            <option className='' >px</option>
                            <option>in</option>
                            <option>mm</option>
                            <option>cm</option>
                        </select>
                    </div>

                </div>
                <button type='submit' className={` cursor-pointer flex gap-[5px] items-center justify-center hover:bg-[#eb8a01c0] p-[2px] bg-[#EB8801] text-white max-w-full rounded-xl transition-all duration-75 }`}><p>Create</p></button>

            </form>

        </div>
    )
}

export default Resizable