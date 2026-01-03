import React, { useRef, useState, useEffect } from 'react';
import FullScreen from '../Components/FullScreen';
import { RiDeleteBin4Fill } from "react-icons/ri";

import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const Gallery = ({ setOpenGallery, isToggle }) => {
    const didFetch = useRef(false);
    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    const darkMode = useSelector(state => state.theme?.darkMode)

    const [gallery, setGallery] = useState([
    ]);
    const galleryPopUp = useRef();
    const [expandImage, setExpandImage] = useState(null);
    // const[imageOpen,setImageOpen]=useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    function closeGallery(e) {
        if (e.target === galleryPopUp.current) {
            setOpenGallery(false);
        }
    }

    const fetchImages = async () => {

        try {
            const token = localStorage.getItem("token");
            const url = `${BackendUrl}/fetchDownloads`;
            const res = await toast.promise(axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
                {
                    loading: 'Fetching images...',

                    error: <b>Sorry,can't fetch images.</b>,
                });

            if (res.status === 200) {

                setGallery(res.data);
            }
        } catch (error) {
            console.log("error fetching images ", error);
        }



    }

    useEffect(() => {
         if (didFetch.current) return;
         didFetch.current=true;
        fetchImages();
    }, []);

    const handleDownload = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.download = 'my-design.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        toast.success("Download started");

    }

    const handleDelete = async (item) => {
        const token = localStorage.getItem("token");
        try {
            setIsDeleting(true);

            const url = `${BackendUrl}/deleteDownloades`;
            const res = await toast.promise( axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data:
                    { url: item.url }

            }),
            {
                loading: 'deleting...',
                
                error: <b>Sorry,can't delete image.</b>,
            });


            if (res.status === 200) {
                console.log("success");
                fetchImages();

            }
            setIsDeleting(false);
        } catch (error) {
            console.log(error);

        }
    }

    const textColor = isToggle ? "text-[#b6b6b6]" : "text-[black]"

    return (
        <div ref={galleryPopUp} onClick={closeGallery} className="fixed inset-0  z-10 backdrop-blur-md flex justify-center items-center  ">
            {/* visible frame */}
            <div className="w-[90vw] max-w-[1109px] h-[88vh] max-h-[927px] bg-red  flex  justify-center items-center gap-2 ">
                <div className={`w-[90vw] max-w-[1109px] h-[78vh] md:h-[88vh] max-h-[927px] rounded-lg shadow-md  ${isToggle ? 'bg-[#2c2a2ab1]' : 'bg-[#e4e1e1b1]'} border-[#524F4F] border-1  p-[35px] space-y-[21px]  overflow-y-auto relative `}>
                    <h1 className={` ${textColor}  font-bold text-[30px] md:text-[40px] text-nowrap text-center md:text-left `}>Gallery</h1>
                    {/* project showcase frame */}
                    <div className={` flex flex-wrap gap-16 justify-evenly items-center ${expandImage && 'pointer-events-none'} `}>

                        {gallery.length >= 1 ? gallery.map((item, i) => (
                            <div style={{ width: `200px`, height: `200px` }} key={i} className={`${isToggle ? "text-[#cbcaca]" : "text-[#595959]"} hover:text-[#EB8801] border-[#534E4E] hover:border-[#EB8801]  space-y-[4px]  flex flex-col justify-center items-center `}>

                                <div className='h-full w-full overflow-hidden  bg-[#D9D9D9] border-1 border-dashed  relative ' >
                                    <img src={item.url} className='object-contain absolute top-1/2 -translate-y-1/2 ' />
                                    {/* download btn */}
                                    <button onClick={() => handleDownload(item.url)} className='drop-shadow-sm drop-shadow-black  absolute top-0 right-1 size-5 cursor-pointer opacity-70 hover:opacity-100'><img src='/Headerimages/downlode.png '></img></button>
                                    {/* fullscreen btn */}
                                    <button onClick={(e) => {
                                        const img = new Image();
                                        img.src = item.url;
                                        img.onload = () => {
                                            setExpandImage({ width: img.naturalWidth, height: img.naturalHeight, url: item.url })
                                        }

                                    }} className='drop-shadow-sm drop-shadow-black  absolute bottom-1 right-1 size-4 cursor-pointer opacity-70 hover:opacity-100'><img src='/Headerimages/FullScreen.png '></img></button>

                                    <button onClick={(e) => handleDelete(item)} disabled={isDeleting} className={`absolute   ${isDeleting ? "text-gray-500 cursor-not-allowed " : "text-red-500 cursor-pointer"}  top-0.5 left-0.5 drop-shadow-sm drop-shadow-black`} ><RiDeleteBin4Fill /></button>

                                </div>
                                {/* project name */}
                                {/* <p className=' text-center  '>{item.name}</p> */}
                            </div>
                        )) : <p className={` text-center ${darkMode ? "text-white" : "text-black"}`}>Your Downloded Images will be shown here</p>}

                    </div>
                    <button onClick={() => setOpenGallery(false)} className="pl-4 flex md:hidden justify-end absolute top-2 right-2" ><p className="text-[#bba282] text-2xl font-bold cursor-pointer h-fit "><IoMdCloseCircle /></p></button>

                </div>
                {/* image expand screen */}
                {expandImage && <FullScreen url={expandImage.url} width={parseInt(expandImage.width)} height={parseInt(expandImage.height)} setExpandImage={setExpandImage}  ></FullScreen>}
                {/* close */}
                <button onClick={() => setOpenGallery(false)} className="pl-4 hidden md:flex justify-end " ><p className="  h-fit cursor-pointer text-white text-2xl font-bold absolute top-12">x</p></button>
            </div>
        </div>
    )
}

export default Gallery