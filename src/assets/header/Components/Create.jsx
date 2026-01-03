import React, { useRef, useState } from "react";
import Resizable from "./Resizable";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import CreateSm from "./ComponetsSM/CreateSm";
import { useDispatch, useSelector } from "react-redux";
import { setSize } from "../../../Redux/CanvasSize";
import { useNavigate } from "react-router-dom";


const Create = ({ setCreateNewOpen, isToggle }) => {

    const popupRef = useRef();
    const options = [
        { value: "Mobile", sizes: [{ name: "iPhone SE", ratio: "9:16" }, { name: "iPhone 12/13", ratio: "9:19.5" }, { name: "Galaxy S21", ratio: "9:20" }] },
        { value: "Tablet", sizes: [{ name: "iPad Mini", ratio: "4:3" }, { name: "Samsung Tab S7 ", ratio: "16:10" }, { name: "Amazon Fire HD", ratio: "15:9" }] },
        { value: "Laptop", sizes: [{ name: "MacBook Air", ratio: "16:10" }, { name: "Full HD Laptop", ratio: "16:9" }] },
        { value: "Desktop", sizes: [{ name: "Desktop", ratio: "16:9" }] },
        { value: "Tv", sizes: [{ name: "Desktop", ratio: "16:9" }] },
        {
            value: "Custom", sizes: [
                { name: "Mobile Portrait", ratio: "9:16" },
                { name: "Mobile Landscape", ratio: "16:9" },
                { name: "Mobile Wide", ratio: "19.5:9" },
                { name: "Tablet Portrait", ratio: "3:4" },
                { name: "Tablet Landscape", ratio: "4:3" },
                { name: "Tablet Wide", ratio: "16:10" },
                { name: "Laptop Standard", ratio: "16:9" },
                { name: "Laptop Tall", ratio: "16:10" },
                { name: "Laptop Creative", ratio: "3:2" },
                { name: "Desktop HD/4K", ratio: "16:9" },
                { name: "Ultrawide Monitor", ratio: "21:9" },
                { name: "Super Ultrawide", ratio: "32:9" },
                { name: "TV Full HD/4K", ratio: "16:9" },
                { name: "Social Reel/Shorts", ratio: "9:16" },
                { name: "Instagram Square", ratio: "1:1" },
                { name: "Instagram Portrait", ratio: "4:5" },
                { name: "Pinterest Tall", ratio: "2:3" }
            ]
        }];

    const [selectedDevice, setSelectedDevice] = useState("Mobile");
    const [f1Open, setf1HOpen] = useState(false);
    const textColor = isToggle ? "text-[#a8a6a3]" : "text-[black]"

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const moveToEditor = (size, value) => {
        const baseWidth = 1080;
        const [wRatio, hRatio] = size.split(':').map(Number);

        const aspect = hRatio / wRatio;

        const height = Math.round(baseWidth * aspect);
        localStorage.removeItem("canvasSize");
        localStorage.removeItem("elements");
        dispatch(setSize({ width: baseWidth, height: height }));

        navigate('/editor');
        setCreateNewOpen(false);
       window.location.reload();
    }

    const getSizeClass = (ratioStr, max = 200) => {
        const [wRatio, hRatio] = ratioStr.split(":").map(Number);
        const ratio = wRatio / hRatio;
        let width = max;
        let height = width / ratio;
        if (height > max) {
            height = max;
            width = height * ratio;
        }

        // const roundedW = Math.round(width);
        // const roundedH = Math.round(height);
        // console.log("width: ", roundedW);
        // console.log("height: ", roundedH);

        return {

            width: `${Math.round(width)}px`,
            height: `${Math.round(height)}px`,
        };


    }
    function closeFun(e) {
        if (e.target === popupRef.current) {
            setCreateNewOpen(false);
        }
    }



    return (
        <div ref={popupRef} onClick={closeFun} className="fixed inset-0  z-10 flex justify-center items-center backdrop-blur-md ">

            {/* visible frame for >md */}
            <div className={` hidden md:flex w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px] ${textColor}  `}>

                <div className={`   ${isToggle ? 'bg-[#2c2a2ab1]' : 'bg-[#e4e1e1b1]'} overflow-x-hidden  flex justify-between w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px] rounded-lg shadow-md border-[#524F4F] border-1  relative `}>
                    {/* frame 1 */}
                    <div className={`  ${f1Open && 'transform -translate-x-65'} transition-transform duration-300  ${isToggle ? 'bg-[#252525]' : 'bg-[#e4e1e1]'} max-w-fit h-full rounded-lg shadow-md  p-[35px]  flex-col  space-y-6 border-[#524F4F] border-1 relative ${f1Open && "absolute z-20"} `}>
                        <div onClick={() => { setf1HOpen(prev => !prev); console.log(f1Open); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white ">{!f1Open ? <IoIosArrowBack /> : <IoIosArrowForward />}</div>

                        <h1 className={`text-${isToggle ? ["#b6b6b6"] : ["black"]}  font-bold text-[40px] text-nowrap `}>Create a Scene</h1>
                        <ul className="  space-y-[30px] text-center font-semibold">
                            {options.map((opt, index) => (

                                <li onClick={() => setSelectedDevice(opt.value)} key={index} value={opt.value} className={`flex gap-[5px] items-center justify-center  p-[2px] ${isToggle ? "hover:text-white" : "hover:text-[#717070]"} max-w-full rounded-xl transition-all duration-300 cursor-pointer ${selectedDevice === opt.value && "bg-[#EB8801]  text-white "}`}><p>{opt.value}</p><img src={`/Headerimages/${opt.value}.png`} /></li>

                            ))}

                        </ul>
                    </div>
                    {/* frame 2 */}

                    <div className={`${f1Open && "absolute z-10"}  flex  h-full w-full p-[48px]  flex-wrap gap-4  overflow-y-auto  ${selectedDevice === "Custom" && "justify-center"} `}>
                        {/* custom sizeing */}
                        {selectedDevice === "Custom" && <Resizable setCreateNewOpen={setCreateNewOpen}  ></Resizable>}
                        <div className={`mt-6 space-y-5 font-bold   ${!f1Open ? 'w-full' : 'w-[70%] '} `}>
                            {selectedDevice === "Custom" && <p className="w-full">Commonly Used Frames </p>}
                            <div className={`  flex flex-wrap gap-4  ${selectedDevice === "Custom" && 'items-center'}  justify-center`}>

                                {options
                                    .filter(opt => opt.value === selectedDevice)
                                    .flatMap((opt, i) => (
                                        // sizes
                                        opt.sizes.map((size, j) => {

                                            return (
                                                <div key={`${i}-${j}`}>
                                                    {/* normal defalut sizes    */}
                                                    <button onClick={() => moveToEditor(size.ratio, opt.value)} style={getSizeClass(size.ratio)} className={` bg-[#D9D9D9] border-1 border-[#534E4E] hover:border-[#EB8801]  border-dashed flex justify-center items-center text-[#595959] hover:text-[#EB8801]  text-center cursor-pointer transition-all duration-75 `} >
                                                        <p >{size.ratio}</p>
                                                    </button>
                                                </div>

                                            )
                                        })

                                    ))}

                            </div>
                        </div>
                    </div>

                </div>



                {/* close */}
                <button onClick={() => setCreateNewOpen(false)} className="pl-4 hidden md:flex  justify-end" ><p className="text-white text-2xl font-bold cursor-pointer h-fit ">x</p></button>
            </div>
            {/* visible frame for <md */}
            <CreateSm isToggle={isToggle} textColor={textColor} setCreateNewOpen={setCreateNewOpen} ></CreateSm>
        </div>
    )
}

export default Create