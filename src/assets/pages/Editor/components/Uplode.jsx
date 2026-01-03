import React, { useRef, useState, useEffect } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import { RotateLoader } from "react-spinners";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { data } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUplodedUrl } from '../../../../Redux/ImageUrl';
import toast from 'react-hot-toast';

const Uplode = ({ setActivePanel }) => {

    const [uplodedImage, setUplodedImage] = useState([]);
    const fileref = useRef();
    const dragRef = useRef();
    const [isUploding, setIsUploding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const darkMode = useSelector(state => state.theme?.darkMode)
    const dispatch = useDispatch();
   const didFetch=useRef(false);
       const BackendUrl = import.meta.env.VITE_BACKEND_URL;

     const fetchData = async () => {
            try {
                const url = `${BackendUrl}/editor/all`;
                const token = localStorage.getItem("token");
                const res = await toast.promise(
                    axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }),
                    {
                        loading: 'Fetching images...',
                        success: <b>Images loaded!</b>,
                        error: <b>Failed to fetch images.</b>,
                    });
                const imageurls = res.data.map((img) => img.url);
                setUplodedImage(imageurls);


            } catch (error) {
                console.log("cant get image error " + error);
            }
        }

    useEffect(() => {
        if(didFetch.current)return;
        didFetch.current=true;
        fetchData();

    }, [])




    const handleDelete = async (e, src) => {
        e.stopPropagation();
        setIsDeleting(true);

        const token = localStorage.getItem("token");

        try {
            const url = `${BackendUrl}/editor/delete`;

           await toast.promise( axios.delete(url, {
                data: { url: src }, headers: {
                    Authorization: `Bearer ${token}`
                }
            }),{
                loading:"Deleting...",
                success:<b>Image deleted</b>,
                error:<b>Sorry,can't delete image</b>
            }

            )
            setUplodedImage(prev => prev.filter(url => url != src));

        } catch (error) {
            console.log("failed to delete image");
        }
        setIsDeleting(false);
    }

    const getData = async (files) => {
        setIsUploding(true);

        for (let file of files) {
            const formData = new FormData();
            formData.append("image", file);

            const token = localStorage.getItem("token");


            try {
                const url = `${BackendUrl}/editor/uplode`
         const res = await  toast.promise( axios.post(url, formData, {

                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "multipart/form-data"
                    }

                }),{
               loading:"Uploding image...",
               success:<b>Image uploded successfully</b>,
               error:<b>Error uploded successfully</b>
                })

                if (!res) {
                    console.log("uplode failed res not avalible");
                }
                setUplodedImage(prev => [...prev, res.data.url]);
                console.log("sucess");

            } catch (error) {
                console.log("uplode failed" + error);
            }
        };

        setIsUploding(false);
    }

    const handleClick = () => {

        fileref.current.click();

    }

    const handleChange = (e) => {


        const files = Array.from(e.target.files);

        getData(files);

    }

    const handleDragDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files);
        getData(files);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleImages = (url) => {

        dispatch(setUplodedUrl(url));
    }


    return (
        <div className={`transition-all duration-300 ease-in-out z-7 ${darkMode ? "bg-[#473147]  " : "bg-white "} max-h-full w-fit p-[1rem] rounded-md  flex-col items-center relative `} >

            <div className='w-full flex flex-col gap-[1rem] h-full justify-top '>
                {/* button */}
                <button onClick={handleClick} className=' cursor-pointer w-full rounded-sm bg-orange-400 p-[0.5rem] px-[1rem] text-white font-semibold text-sm text-nowrap    '>Uplode Image</button>
                <input
                    className='hidden'
                    type="file"
                    accept='image/*'
                    multiple
                    ref={fileref}
                    onChange={handleChange}
                />

                {/*images drag and drop space */}
                <div onClick={handleClick} ref={dragRef} onDragOver={handleDragOver} onDrop={handleDragDrop} className={`  flex justify-center items-center h-fit p-[2rem] px-[3rem]  max-h-[927px] w-full 
                    ${darkMode ? "bg-[#5a3d5a] border-[#a19a9a]   " : "bg-[#D9D9D9] border-[#534E4E]  "} 
                     border-1  border-dashed cursor-grab`} >
                    <p className={`text-sm md:text-lg text-center ${darkMode ? `text-[#eeecec]` : `text-[#595959]`}   `}>Drag media here to upload</p>
                </div>

                <div className='flex  relative max-h-[14rem] lg:max-h-[35rem]  overflow-y-auto ' >

                    {/* uploded files */}
                    <div className={`   grid grid-cols-2 gap-1 h-full  overflow-x-hidden  `}  >
                        {isUploding && <div className={` inset-0 backdrop-blur-xs  absolute  gap-1   overflow-y-auto overflow-x-hidden  `}  ></div>}
                        {uplodedImage.map((url, index) => (
                            <div key={index} className='relative h-full w-full' >
                                <button onClick={(e) => handleDelete(e, url)} disabled={isDeleting} className={`absolute   ${isDeleting ? "text-gray-500 cursor-not-allowed " : "text-red-500 cursor-pointer"} drop-shadow-lg top-0.5 left-0.5 drop-shadow-black`} ><RiDeleteBin4Fill /></button>
                                <img draggable onClick={() => handleImages(url)} onDragStart={(e) => e.dataTransfer.setData("ImageSrc", url)} className=' size-30 object-cover cursor-grab ' src={url} ></img>
                            </div>
                        ))}


                    </div>

                    {/* loader */}
                    {isUploding && <div className=" inset-0 absolute flex flex-col justify-center items-center w-full drop-shadow-2xl gap-[1rem] drop-shadow-black">
                        <RotateLoader
                            color={"orange"}
                            loading={isUploding}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <p className="mt-2 text-orange-300 font-medium">Uploading...</p>

                    </div>}

                </div>


            </div>
            <div onClick={() => { setActivePanel(null); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </div>


        </div>
    )
}

export default Uplode