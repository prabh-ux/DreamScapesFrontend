import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import sadLand from './images/sad_landScape.jpeg';
import sadPortrait from './images/sad_Portrait.jpeg';
import smilePortrait from './images/smile_land.jpeg';
import smileLand from './images/smile_land.jpeg';


const Logout = ({ isToggle, setOpen, setOpenLogout }) => {

    const [userName, setUserName] = useState('');
    const [hovering, setHovering] = useState(false);

    useEffect(() => {

        const name = localStorage.getItem("name");
        if (name) {
            setUserName(name);
        }
    }, [])

    const handleLogout = () => {


        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("canvasSize");
        localStorage.removeItem("elements");
        setOpen(false);
        setOpenLogout(false);
        window.location.reload();

    }


    return (
        <div>
            <div className={`   ${userName === "" && "hidden"} w-[90vw] max-w-[1109px] h-[80vh] md:h-[78vh] max-h-[927px] rounded-lg shadow-md  ${isToggle ? 'bg-[#2c2a2ac0]' : 'bg-[#e4e1e1b1]'} border-[#524F4F] border-1   space-y-[21px]  flex  flex-col-reverse md:flex-row  justify-between relative overflow-y-hidden overflow-x-hidden `}>

                {/*  div */}
                <div className=' p-[25px] w-full  h-full md:h-full flex flex-col  items-center justify-center space-y-[3rem] z-10   '>
                    <div className='flex flex-col md:flex-row gap-[1rem] w-fit'>
                        <h1 className={` font-bold text-[30px] md:text-[40px] text-nowrap ${isToggle ? 'text-[#e4e1e1b1]' : 'text-[#414040]'} text-center `}>Welcome</h1>
                        <h1 className={` font-bold text-[30px] md:text-[40px] text-nowrap ${isToggle ? 'text-[#f69a21]' : 'text-[#d67128]'} text-center  `}>{userName.toUpperCase()}!</h1>
                    </div>
                    <div className='relative size-70  ' >
                        <img className={` absolute size-full inset-0  rounded-2xl object-cover transition-all duration-200 ease-in-out ${hovering ? "opacity-0" : "opacity-100"} `} src={smileLand} />
                        <img className={` absolute  size-full inset-0  rounded-2xl object-cover transition-all duration-200 ease-in-out  ${hovering ? "opacity-100" : "opacity-0"} `} src={sadLand} />

                    </div>
                    <div className='flex  flex-col gap-[1rem]' >
                        <h1 className={` ${hovering ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in-out font-bold text-[10px] md:text-[20px]  ${isToggle ? 'text-[#f5f1f1d2]' : 'text-[#414040]'} text-wrap text-center `}>Wait… you’re leaving? But we were just getting emotionally attached!</h1>
                        {/* logout btn */}
                        <button onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={handleLogout} className='w-full relative flex flex-col'>
                            <button className={`w-full bg-black   text-white font-bold p-4 rounded-lg cursor-pointer`} type='submit' >Logout</button>
                            <span className='h-1 absolute w-full bottom-0 rounded-b-full  duration-300 transition-colors  rainbow-bar  ' ></span>
                        </button>
                    </div>
                </div>



            </div>
            <button onClick={() => setOpen(false)} className="pl-4 flex md:hidden justify-end absolute top-12 right-2" ><p className="text-[#ffffff] text-2xl font-bold cursor-pointer h-fit "><IoMdCloseCircle /></p></button>

        </div>
    )
}

export default Logout