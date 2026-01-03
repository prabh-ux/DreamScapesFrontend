import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';
const Save = ({ bgColor, setActivePanel }) => {
    const size = useSelector(state => state.Canvassize?.size);
    const droppedElements = useSelector(state => state.layers?.layers);
    const [err, setErr] = useState(null);
    const [saving, setSaving] = useState(false);
    const darkMode = useSelector(state => state.theme?.darkMode)
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formdata = new FormData(e.target);
        const name = formdata.get('name');

        const BGColor = bgColor

        const projectData = {
            name, size, droppedElements,
            BGColor
        }

        const token = localStorage.getItem('token');
        try {
            const url = `${BackendUrl}/editor/save`;

            const res = await toast.promise(  axios.post(url, projectData, {
                headers: {
                    Authorization: `Bearer ${token}`,

                }

            }),{
                 loading: 'Saving...',
                    success: <b>Project saved!</b>,
                    error: <b>Sorry,can't save project.</b>,
            });



        } catch (error) {


            setErr(error?.response?.data?.msg);
        }
        setSaving(false);

    }


    return (
        <div className={`transition-all duration-300 ease-in-out z-7 ${darkMode ? "text-white bg-[#473147] " : "text-gray-800 bg-white  "}   w-fit p-[1rem] rounded-md  flex-col items-center relative `} >



            <form className='flex flex-col gap-[1rem]' onSubmit={handleSubmit} >
                {/* name input */}
                <div className='flex flex-col  gap-[0.5rem]'>
                    <p className='font-bold text-lg flex items-center gap-[0.3rem] '>Save Your Project<span><FaLongArrowAltRight /></span></p>
                    {err !== null && <p className='text-red-600 ' >*{err}</p>}

                    <p className='flex text-xs  items-center gap-[0.3rem]  ' >Name your Project</p>

                    {/* search */}
                    <div className='w-full rounded-sm  p-[0.5rem] gap-[0.2rem] px-[0.5rem] text-gray-400 placeholder-gray-500 border-1 border-gray-400 font-semibold text-sm text-nowrap flex items-center   ' >
                        <input type='text' name='name' placeholder='Name' className=' outline-none ' />
                    </div>
                </div>




                {/* save button */}
                <button type='submit' disabled={saving} className={`cursor-pointer w-full rounded-sm ${saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400'} p-[0.5rem] px-[1rem] text-white font-semibold text-sm text-nowrap    `}> Save</button>

            </form>


            <div onClick={() => { setActivePanel(null); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </div>


        </div>
    )
}

export default Save