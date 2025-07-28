import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLayers } from '../../../../../Redux/layersSlice';
const Opacity = () => {
    const selectedElement = useSelector(state => state.selectedElement?.selectedElement);
    const canvasSize = useSelector(state => state.Canvassize?.size);
    const layers = useSelector(state => state.layers.layers);
    const darkMode = useSelector(state => state.theme?.darkMode)

    const OpacityRef = useRef();
    const [val, setVal] = useState(100);

    useEffect(() => {
        if (!selectedElement) return;
        const layer = layers.find(item => item?.id === selectedElement.id);
        if (layer?.editSettings?.opacity != null) {
            setVal(layer.editSettings.opacity);
        }
    }, [selectedElement, layers]);

    const dispatch = useDispatch();

    const MoveSlider = (e) => {

        if (!OpacityRef.current || !selectedElement || selectedElement.type !== 'image') return;

        const getX = (e) => {
            return e.touches ? e.touches[0].clientX : e.clientX;
        }


        const setValue = () => {
            const rect = OpacityRef.current.getBoundingClientRect();
            const x = getX(e) - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setVal(percentage);

            const newLayers = layers.map(item =>
                item.id === selectedElement.id ? {
                    ...item,
                    editSettings: {
                        ...item.editSettings,
                        opacity: Math.round(percentage)
                    }
                } : item
            )

            dispatch(setLayers(newLayers));
        }
        setValue();
    }
    const dragX = (e) => {
        e.preventDefault();
        const handelMove = (e) => {
            MoveSlider(e);
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

    return <div className=' inset-0 h-full w-full' >
        <div ref={OpacityRef} className={`absolute top-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 w-[50%] h-full text-sm  ${darkMode?"bg-[#58375d] text-gray-300  ":"bg-[#d5b1db] text-white "} flex flex-col  gap-[0.6rem] px-[0.2rem]  rounded-2xl `}  >
            <div className=' h-full w-full flex flex-col justify-around p-[0.5rem]  '>
                <p className=' text-xs'>Opacity</p>
                <div className='relative flex items-center '>
                    <div onClick={MoveSlider} style={{ background: `linear-gradient(to right,${val === "Temperature" ? `#a0a4a0 ${val}%,#d3d8d3 ${val}% ` : ` #a0a4a0 ${val}%,#d3d8d3 ${val}%  `})` }} className=' w-full rounded-sm h-[0.2rem] cursor-pointer' ></div>
                    <button onMouseDown={dragX} onTouchStart={dragX} style={{ left: `${val}%` }} className='cursor-pointer absolute border-1 border-gray-300 bg-white w-[1rem] rounded-full h-[1rem] transform -translate-x-1/2' ></button>
                </div>
            </div>
        </div>
    </div>;
}

export default Opacity
