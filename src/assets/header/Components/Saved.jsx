import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSize } from '../../../Redux/CanvasSize';
import { setLayers } from '../../../Redux/layersSlice';
import toast from 'react-hot-toast';

const Saved = ({ setOpenSavedProjects }) => {

    const [savedProjects, setSavedProjects] = useState([]);
    const savePopUp = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector(state => state.theme?.darkMode)
    const didFetch = useRef(false);    
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;


    const [isDeleting, setIsDeleting] = useState(false);
    const fetchProjects = async () => {
        const token = localStorage.getItem("token");
        try {
            const url = `${BackendUrl}/savedProjects`;
            const res = await toast.promise(axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }), {
                loading: 'Fetching projects...',

                error: <b>Sorry,can't fetch project.</b>,
            });
            const data = res.data;

            setSavedProjects(data);

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;


        fetchProjects();

    }, []);


    const handleDelete = async (item) => {
        const token = localStorage.getItem("token");
        try {
            setIsDeleting(true);

            const url = `${BackendUrl}/deleteProjects`;
            const res = await toast.promise(axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data:
                    { name: item.name, user: item.user }

            }), {
                loading: 'deleting...',
                
                error: <b>Sorry,can't delete project.</b>,
            })


            if (res.status === 200) {
                console.log("success");
                fetchProjects();
            }
            setIsDeleting(false);
        } catch (error) {
            console.log(error);

        }
    }

    const handleClick = (item) => {

        localStorage.removeItem("canvasSize");
        localStorage.removeItem("elements");
        dispatch(setSize(item.size));
        dispatch(setLayers(item.droppedElements));

        navigate('/editor');
        setOpenSavedProjects(false);

    }

    const closeSaved = (e) => {
        if (e.target === savePopUp.current) {
            setOpenSavedProjects(false);
        }
    }

    const textColor = darkMode ? "text-[#b6b6b6]" : "text-[black]"

    return (
        <div ref={savePopUp} onClick={closeSaved} className="fixed inset-0  z-10 backdrop-blur-md flex justify-center items-center  ">
            {/* visible frame */}
            <div className="w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px] bg-red  flex justify-center items-center gap-2 ">
                <div className={`w-[90vw] max-w-[1109px] h-[78vh] md:h-[88vh] max-h-[927px] rounded-lg shadow-md  ${darkMode ? 'bg-[#2c2a2ab1]' : 'bg-[#e4e1e1b1]'}   border-[#524F4F] border-1  p-[35px] space-y-[41px]   relative `}>
                    <h1 className={` ${textColor} font-bold text-[30px] text-center md:text-left  md:text-[40px] text-nowrap`}>Saved Projects</h1>
                    {/* project showcase frame */}
                    <div className='flex flex-col gap-4 overflow-y-auto max-h-[400px] md:max-h-[500px]'>

                        {savedProjects.length >= 1 ? savedProjects.map((item, i) => (
                            <div key={i} className={`${darkMode ? "bg-[#847e7e] text-white " : "bg-[#d5d0d0] text-black"} hover:text-[#EB8801] border-[#534E4E] border-1 hover:border-[#EB8801]  space-y-[4px] p-[1rem]  rounded-xl flex justify-around items-center transition-colors duration-50 ease-in-out `}>
                                {/* project name */}
                                <p className=' text-center overflow-hidden text-sm md:text-md  w-[50%] '>{item.name.toUpperCase()}</p>

                                <div className='flex gap-[1rem] justify-center items-center  w-[50%] '>
                                    <button onClick={() => handleClick(item)} className=' cursor-pointer w-fit rounded-sm bg-orange-400 p-[0.5rem] px-[0.5rem] md:px-[1rem] text-white font-semibold text-xs md:text-sm text-nowrap    '>Open</button>
                                    <button onClick={() => handleDelete(item)} className={` cursor-pointer w-fit rounded-sm ${isDeleting ? "bg-gray-900 cursor-not-allowed " : "bg-red-400"}  p-[0.5rem] px-[0.5rem] md:px-[1rem] text-white font-semibold text-xs md:text-sm text-nowrap `}>Delete</button>

                                </div>
                            </div>
                        )) : <p className={` text-center ${darkMode ? "text-white" : "text-black"}`}>Your projects will be shown here</p>}

                    </div>
                    <button onClick={() => setOpenSavedProjects(false)} className="pl-4 flex md:hidden justify-end absolute top-2 right-2" ><p className="text-[#bba282] text-2xl font-bold cursor-pointer h-fit "><IoMdCloseCircle /></p></button>

                </div>
                {/* close */}
                <button onClick={() => setOpenSavedProjects(false)} className="pl-4 hidden md:flex justify-end " ><p className="  h-fit cursor-pointer text-white text-2xl font-bold absolute top-12 ">x</p></button>
            </div>
        </div>
    )
}

export default Saved