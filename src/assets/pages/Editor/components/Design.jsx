import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { LuPencilRuler } from "react-icons/lu";
import { FaPenFancy } from "react-icons/fa";
import { FaMarker } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { FaEraser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ToolColor from './features/ToolColor';
import ColorPicker from './features/ColorPicker';
import ToolSizeSetter from './features/ToolSizeSetter';
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { setLayers } from '../../../../Redux/layersSlice';

const Design = forwardRef((props, ref) => {
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [selectedSubTool, setSelectedSubTool] = useState(null);
    const isDrawing = useRef(false);
    const [selectedColor, setSelectedColor] = useState("#ffffff");
    const [toolSize, setToolSize] = useState(4);
    const dispatch = useDispatch();
    const Layers = useSelector(state => state.layers?.layers);
    const hasMoved = useRef(false);
    const darkMode = useSelector(state => state.theme?.darkMode)

    const lastPos = useRef({
        x: 0, y: 0
    })
    const toolSizeRef = useRef();
    const { setActivePanel2 } = props;


    const hexttoRgba = (hex, alpha = 1) => {

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`
    }


    const getToolsSettings = (tools) => {

        switch (tools) {
            case "Pen":
                return {
                    lineWidth: toolSize,
                    strokeStyle: selectedColor,
                    lineCap: "round",
                    lineJoin: "round",
                    compositeMode: "source-over",
                };
            case "Marker":
                return {
                    lineWidth: toolSize,
                    strokeStyle: hexttoRgba(selectedColor, 0.3),
                    lineCap: "round",
                    lineJoin: "round",
                    compositeMode: "source-over",
                };
            case "Pencil":
                return {
                    lineWidth: toolSize,
                    strokeStyle: hexttoRgba(selectedColor, 0.7),
                    lineCap: "round",
                    lineJoin: "round",
                    compositeMode: "source-over",
                };
            case "Erase":
                return {
                    lineWidth: toolSize,
                    strokeStyle: '#fff',
                    lineCap: "round",
                    lineJoin: "round",
                    compositeMode: "destination-out",
                };

            default:
                return {
                    lineWidth: toolSize,
                    strokeStyle: selectedColor,
                    lineCap: "round",
                    lineJoin: "round",
                    compositeMode: "source-over",
                };

        }


    }

    const getCanvasCoods = (e, canvas) => {

      const getx=(e)=>{
       return e.touches?e.touches[0].clientX:e.clientX;
      }
      const gety=(e)=>{
       return e.touches?e.touches[0].clientY:e.clientY;
      }
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (getx(e) - rect.left) * scaleX,
            y: (gety(e) - rect.top) * scaleY
        }

    }

    useImperativeHandle(ref, () => ({

        startDraw(e, canvas) {
            if (selectedSubTool === null) return;
            isDrawing.current = true
            hasMoved.current = false;
            lastPos.current = getCanvasCoods(e, canvas);

        },

        draw(e, canvas) {
            if (!isDrawing.current) return;

            hasMoved.current = true;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            const { x, y } = getCanvasCoods(e, canvas);

            const setting = getToolsSettings(selectedSubTool);

            ctx.lineWidth = setting.lineWidth;
            ctx.strokeStyle = setting.strokeStyle;
            ctx.lineCap = setting.lineCap;
            ctx.lineJoin = setting.lineJoin;
            ctx.globalCompositeOperation = setting.compositeMode;

            ctx.beginPath();
            ctx.moveTo(lastPos.current.x, lastPos.current.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            lastPos.current = {
                x,
                y
            }

        },

        endDraw(e, canvas) {

            isDrawing.current = false;
            if (!hasMoved.current) return;
            const dataUrl = canvas.toDataURL('image/png');

            const newLayer = {
                id: Date.now(),
                type: 'image',
                imageSrc: dataUrl,
                x: 0,    // or wherever you want it placed
                y: 0,
                editSettings: {
                    whiteBalance: [],
                    light: [],
                    color: [],
                    texture: [],
                    opacity: 100,
                }
            };
            // dispatch(setLayers([...Layers, newLayer]));
            // const ctx = canvas.getContext('2d');
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
        }


    })
    );









    const Designtools = [
        { name: "DrawingTools", icon: LuPencilRuler, tools: [{ name: "Pen", icon: FaPenFancy }, { name: "Marker", icon: FaMarker }, { name: "Pencil", icon: TiPencil }, { name: "Erase", icon: FaEraser }, { name: "Color", icon: () => <ToolColor selectedColor={selectedColor} /> }, { name: "Setting", icon: IoMdSettings }] }

    ]

    return (
        <div className={`w-fit ${darkMode?"bg-[#58375d]":"bg-[#d5b1db]"}  p-[0.5rem]  rounded-lg gap-[0.5rem] absolute  -bottom-15 flex `}>
            {Designtools.map((items, index) => (
                <div key={index} className='flex gap-[0.5rem] relative items-center' >
                    <button onClick={() => setSelectedOpt(items.name)} className={`text-2xl ${selectedOpt === items.name && "bg-orange-400"} cursor-pointer p-[0.5rem]  rounded-lg  `} ><items.icon /></button>
                    {items.name === selectedOpt && (
                        <div className={`w-fit ${darkMode?"bg-[#58375d]":"bg-[#c29dc8]"} p-[0.5rem]  rounded-lg gap-[0.5rem] flex absolute -bottom-17 origin-top-left  -left-10 `}>
                            <div className='flex relative'>
                                {items.tools.map((Subtools, subIndex) => (
                                    <button key={subIndex} onClick={() => setSelectedSubTool(Subtools.name)} className={`text-2xl cursor-pointer p-[0.5rem]  rounded-lg   ${selectedSubTool === Subtools.name && "bg-orange-400"} `} ><Subtools.icon /></button>
                                ))}

                                {selectedSubTool === "Color" && <ColorPicker onChange={(hex) => setSelectedColor(hex)} />}
                                {selectedSubTool === "Setting" && <ToolSizeSetter toolSizeRef={toolSizeRef} toolSize={toolSize} setToolSize={setToolSize} />}



                            </div>

                        </div>
                    )}
                    <div onClick={() => { setSelectedOpt("Cross"); setTimeout(() => setActivePanel2(null), 100) }} className={`text-2xl ${selectedOpt === "Cross" && "bg-orange-400"}  cursor-pointer p-[0.5rem]  rounded-lg  text-lg `}  ><ImCross /></div>
                </div>
            ))}
        </div>
    )
})

export default Design