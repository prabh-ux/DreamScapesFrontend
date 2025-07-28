import React from 'react'
import Hero from './components/Hero'
import Features1 from './components/Features1'
import Features2 from './components/Features2'
import Features3 from './components/Features3'
import Features4 from './components/Features4'
import { Features } from 'tailwindcss'
import Features5 from './components/Features5'
import { useSelector } from 'react-redux'

const Home = ({setCreateNewOpen ,setOpenLogin }) => {

    const isToggle=useSelector((state)=>state.theme.darkMode);
        const textColor=isToggle?"text-[#e5c0d5]":"text-[black]"

    return (
        <div className='relative w-full min-h-screen flex flex-col items-center z-0  ' >
            <Hero isToggle={isToggle} textColor={textColor} setCreateNewOpen={setCreateNewOpen}  setOpenLogin={setOpenLogin}    ></Hero>
            <Features1 isToggle={isToggle} textColor={textColor} />
            <Features2 isToggle={isToggle} textColor={textColor}/>
            {/* <Features3 isToggle={isToggle} textColor={textColor}/> */}
            <Features4 isToggle={isToggle} textColor={textColor}/>
            <Features5 isToggle={isToggle} textColor={textColor} setCreateNewOpen={setCreateNewOpen}  setOpenLogin={setOpenLogin}  />
        </div>
    )
}

export default Home