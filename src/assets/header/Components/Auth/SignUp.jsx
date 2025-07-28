import React, { useRef, useState, useEffect } from 'react'
import { RiEyeCloseFill } from "react-icons/ri";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './Hover.css';
import Logout from './Logout';



const SignUp = ({ setOpenSignup, setOpenLogin, isToggle }) => {
    const [showPass, setShowPass] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    const screenRef = useRef();
    const [signUpInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [userName, setUserName] = useState('');
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const goToLogin = () => {

        setOpenSignup(false);
        setOpenLogin(true);

    }

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) {
            setUserName(name);
            setOpenLogout(true);
        }
    }, [])


    const handleChange = (e) => {

        const { name, value } = e.target

        const copySignUpInfo = { ...signUpInfo };
        copySignUpInfo[name] = value;
        setSignUpInfo(copySignUpInfo);

    }

    const handelSubmit = async (e) => {

        e.preventDefault();

        const { name, email, password } = signUpInfo;
        if (!name || !email || !password) {
            return setErr("Invalid Data");
        }
        if (name.length < 3 || name.length > 100) {
            return setErr("Enter a valid name");
        }
        if (password.length < 4 || password.length > 100) {
            return setErr("Enter a valid password");
        }
        setErr(null);

        try {

            const url = `${BackendUrl}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpInfo)

            });
            const { msg, success, error, name, token } = await response.json();

            if (success) {
                setOpenSignup(false);
                localStorage.setItem("name", name);
                localStorage.setItem("token", token);
                setErr(null);
                window.location.reload();
            }
            if (!success) {
                setErr(msg || error || "Signup Failed");
                console.log(msg);
            }

        } catch (error) {
            console.log(error);
        }

    }




    return (
        <div ref={screenRef} onClick={(e) => { if (e.target === screenRef.current) setOpenSignup(false) }} className=' inset-0 fixed z-10 backdrop-blur-md  flex justify-center items-center '>
            <div className="w-[90vw]  max-w-[1109px] h-[80vh] md:h-[78vh] max-h-[927px] bg-red  flex   ">

                <div className={` ${userName !== "" && "hidden"} w-[90vw] max-w-[1109px] h-[80vh] md:h-[78vh] max-h-[927px] rounded-lg shadow-md  ${isToggle ? 'bg-[#2c2a2ac0]' : 'bg-[#e4e1e1b1]'} border-[#524F4F] border-1   space-y-[21px]  flex  flex-col-reverse md:flex-row  justify-between relative overflow-y-hidden overflow-x-hidden `}>

                    {/* input div */}
                    <div className=' p-[10px] md:p-[25px] w-full md:w-[50%]  h-[55%] md:h-full flex flex-col  gap-[0px] md:gap-[10px] absolute md:static z-10  '>
                        <h1 className={` font-bold text-[30px] md:text-[40px] text-nowrap ${isToggle ? 'text-[#e4e1e1b1]' : 'text-[#414040]'}  `}>Sign Up</h1>
                        <form onSubmit={handelSubmit} className='w-full  h-[90%] flex items-center flex-col  p-[24px]  gap-[20px] md:gap-[60px]  '>
                            <div className='flex flex-col gap-[10px] w-full '>
                                {err !== null && <p className='text-red-600 text-sm md:text-lg' >*{err}</p>}

                                {/* name */}
                                <input onChange={handleChange} className='border-1 border-[#524F4F] rounded-sm md:rounded-xl w-full p-1 md:p-4 bg-[#E4E1E1] font-medium shadow-xl outline-0 text-sm md:text-xl' name='name' type="text" placeholder='Enter your name' />
                                {/* email */}
                                <input onChange={handleChange} className='border-1 border-[#524F4F] rounded-sm md:rounded-xl w-full p-1 md:p-4 bg-[#E4E1E1] font-medium shadow-xl outline-0 text-sm md:text-xl' name='email' type="email" placeholder='Enter your email' />

                                {/* password */}
                                <div onChange={handleChange} className='w-full relative border-1 border-[#524F4F] rounded-sm md:rounded-xl p-1 md:p-4 bg-[#E4E1E1] font-medium shadow-xl text-sm md:text-xl flex justify-between items-center'>
                                    <input className=' w-full outline-0 pr-2' name='password' type={showPass ? "text" : "password"} placeholder='Enter your password' />

                                    <button type='button' onClick={() => setShowPass(prev => !prev)} > {showPass ? <IoEyeSharp /> : <RiEyeCloseFill />}</button>



                                </div>


                            </div>

                            {/* form btn */}
                            <div className='w-full flex flex-col justify-center items-center gap-3'>
                                {/* signup btn */}
                                <div className='w-full relative flex flex-col'>
                                    <button className={`w-full bg-black   text-white font-bold p-2 text-sm md:text-lg md:p-4 rounded-lg cursor-pointer`} type='submit' >Sign up</button>
                                    <span className='h-1 absolute w-full bottom-0 rounded-b-full  duration-300 transition-colors  rainbow-bar  ' ></span>
                                </div>
                                {/* login link */}
                                <div className={`md:flex font-medium  text-sm md:text-lg lg:text-xl text-nowrap text-center  ${isToggle ? 'text-[#e4e1e1b1]' : 'text-[#414040]'} `}><p>Already have an account?</p><button onClick={goToLogin} type='button' className='text-[#C57D1B] cursor-pointer' >&nbsp;Login Now</button></div>
                            </div>

                        </form>
                    </div>

                    {/* image div */}
                    <div className='  w-[100%] md:w-[50%] h-full overflow-hidden absolute md:static  mask-b-from-30% md:mask-b-from-100%  mask-b-to-70%  z-0'>
                        <img className='w-full h-full object-cover ' src='/AuthImages/signup.jpeg' />


                    </div>
                    <button onClick={() => setOpenSignup(false)} className="pl-4 flex md:hidden justify-end absolute top-2 right-2" ><p className="text-[#ffffff] text-2xl font-bold cursor-pointer h-fit "><IoMdCloseCircle /></p></button>

                </div>
                {openLogout && <Logout setOpenLogout={setOpenLogout} setOpen={setOpenSignup} isToggle={isToggle} />}

                {/* close */}
                <button onClick={() => setOpenSignup(false)} className="pl-4 hidden md:flex  h-fit  justify-end " ><p className="  h-fit cursor-pointer text-white text-2xl font-bold ">x</p></button>
            </div>
        </div>
    )
}

export default SignUp
