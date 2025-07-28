import React, { useRef, useState } from "react";
import Resizable from "../Resizable";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSize } from "../../../../Redux/CanvasSize";

const CreateSm = ({ setCreateNewOpen, isToggle, textColor }) => {
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

    const getSizeClass = (ratioStr, max = 100) => {
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const moveToEditor = (size) => {
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

    function closeFun(e) {
        if (e.target === popupRef.current) {
            setCreateNewOpen(false);
        }
    }
    return (
        <div>
            <div onClick={closeFun} ref={popupRef} className=" md:hidden  w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px]   flex justify-center items-center ">
                <div className={` ${textColor} overflow-x-hidden  flex justify-center w-[90vw] max-w-[1109px]  h-[78vh] md:h-[88vh] max-h-[927px] rounded-lg    relative    `}>
                    {/* frame 1 */}
                    <div className={`  ${f1Open && 'transform -translate-x-65'} transition-transform duration-300  w-full h-full ${isToggle ? 'bg-[#2c2a2af0]' : 'bg-[#e4e1e1b1]'} rounded-lg shadow-md  p-[35px] flex flex-col  space-y-6 border-[#524F4F] border-1 relative ${f1Open && "absolute z-20"} overflow-y-auto `}>

                        <h1 className={`  font-bold text-[30px] text-nowrap w-full text-center`}>Create a Scene</h1>
                        <ul className="  space-y-[30px] text-center font-semibold">
                            {options.map((opt, index) => (

                                <div key={index} >
                                    <li onClick={() => setSelectedDevice(opt.value)} value={opt.value} className={`flex gap-[5px] items-center justify-center p-[2px] hover:text-white max-w-full rounded-xl transition-all duration-75 cursor-pointer ${selectedDevice === opt.value && "bg-[#EB8801]  text-white "}`}><p>{opt.value}</p><img src={`/Headerimages/${opt.value}.png`} /></li>


                                    {/* frame 2 */}
                                    <div className={` ${selectedDevice === opt.value ? "flex" : "hidden"} h-full w-full p-[8px] flex-col     gap-4   ${selectedDevice === "Custom" && "justify-center"} `}>
                                        {/* custom sizeing */}
                                        {selectedDevice === "Custom" && <Resizable></Resizable>}

                                        <div className="mt-6 space-y-5 font-bold  flex flex-col  ">
                                            {selectedDevice === "Custom" && <p className="w-full">Commonly Used Frames </p>}
                                            <div className={` flex flex-nowrap gap-4 ${selectedDevice === "Custom" && 'items-center justify-center overflow-x-auto'}`}>

                                                {options
                                                    .filter(opt => opt.value === selectedDevice)
                                                    .flatMap((opt, i) => (
                                                        // sizes
                                                        opt.sizes.map((size, j) => {

                                                            return (
                                                                <div key={`${i}-${j}`}>
                                                                    {/* normal defalut sizes    */}
                                                                    <div onClick={() => moveToEditor(size.ratio)} style={getSizeClass(size.ratio)} className={` bg-[#D9D9D9] border-1 border-[#534E4E] hover:border-[#EB8801]  border-dashed flex justify-center items-center text-[#595959] hover:text-[#EB8801]  text-center cursor-pointer transition-all duration-75 `} >
                                                                        <p className="text-[11px]" >{size.ratio}</p>
                                                                    </div>
                                                                </div>

                                                            )
                                                        })

                                                    ))}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </ul>
                        {/* close */}
                        <button onClick={() => setCreateNewOpen(false)} className="pl-4 flex justify-end absolute top-2 right-2" ><p className="text-[#bba282] text-2xl font-bold cursor-pointer h-fit "><IoMdCloseCircle />
                        </p></button>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default CreateSm
