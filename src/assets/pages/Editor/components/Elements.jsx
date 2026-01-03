import axios from 'axios';

import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setUplodedUrl } from '../../../../Redux/ImageUrl';
import toast from 'react-hot-toast';

const Elements = ({ setActivePanel }) => {

    const [searchText, setSearchText] = useState('');
    const [images, setimages] = useState([]);
    const [brokenImages, setBrokenImages] = useState(new Set());
    const debounceRef = useRef(null);
    const [page, setPage] = useState(1);
    const [isloading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme?.darkMode)
    const didFetch = useRef(false);
     const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchData = async () => {
        setIsLoading(true);
        const data = await handleSearch(searchText);
        setimages(data || []);
        setIsLoading(false);
    }
    useEffect(() => {
        if (didFetch.current) return;
        setPage(1);
        didFetch.current = true;
        fetchData();

    }, [])

    const handelMore = async () => {
        setIsLoading(true);

        const nextPage = page + 1;
        setPage(nextPage);
        const data = await handleSearch(searchText, nextPage);
        setimages((prev) => [...prev, ...(data || [])]);
        setIsLoading(false);

    }

    const handleChange = (e) => {

        setSearchText(e.target.value);
        setPage(1);
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);

            const data = await handleSearch(e.target.value);
            setimages(data);
            setIsLoading(false);
        }, 500);


    }
    const handleSearch = async (query, page = 1) => {

        const token = localStorage.getItem("token");
        try {

            const url = `${BackendUrl}/editor/search`;
            const res = await toast.promise(axios.post(url, { query: query, page: page }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }), {
                loading: 'fetching data...',
                
                error: <b>Sorry,can't fetch data.</b>,
            });

            return res.data.results;

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`transition-all   duration-300 ease-in-out  z-7  ${darkMode ? "bg-[#473147]  " : "bg-white "} w-fit p-[1rem] rounded-md  flex-col items-center relative `} >

            <div className='w-full max-h-[50rem] overflow-y-auto flex flex-col gap-[1rem]  '>

                {/* search */}
                <div className='w-full rounded-sm  p-[0.5rem] gap-[0.2rem] px-[0.5rem] text-gray-400 placeholder-gray-500 border-1 border-gray-400 font-semibold text-sm text-nowrap flex items-center   ' > <IoSearch />
                    <input onChange={handleChange} placeholder='Search' className=' outline-none ' /></div>
                <div className=' flex flex-col h-full space-y-[2rem] ' >
                    <div className='grid grid-cols-2 gap-[0.5rem] max-h-[20rem] lg:max-h-[30rem]  overflow-y-auto ' >
                        {images.filter(item => !brokenImages.has(item.thumbnail)).map((items, index) => (
                            <div key={index} >
                                <img referrerPolicy="no-referrer" draggable onClick={() => dispatch(setUplodedUrl(items.url))} onDragStart={(e) => e.dataTransfer.setData("ImageSrc", items.url)} loading='lazy' className=' size-30 object-cover cursor-grab' src={items.thumbnail} onError={() => setBrokenImages((prev) => new Set(prev).add(items.thumbnail))} />

                            </div>
                        ))}

                    </div>
                    <button onClick={() => handelMore()} className={`  w-full rounded-sm ${isloading ? "bg-gray-800 cursor-not-allowed text-gray-400 " : "bg-orange-400 cursor-pointer text-white"} p-[0.5rem] px-[1rem]  font-semibold text-sm text-nowrap     `}>Load More</button>

                </div>


            </div>
            <div onClick={() => { setActivePanel(null); }} className="bg-[#EB8801] cursor-pointer absolute z-30  shadow-lg  border-black flex justify-center items-center w-fit p-1 py-2  rounded-lg  -right-3 transform -translate-y-1/2 top-1/2 text-white "><IoIosArrowBack /> </div>


        </div>
    )
}

export default Elements