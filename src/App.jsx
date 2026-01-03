import { useState } from 'react'
import './App.css'
import Create from './assets/header/Components/Create'
import Header from './assets/header/header'
import Saved from './assets/header/Components/Saved';
import Gallery from './assets/header/Components/Gallery.jsx';
import Songs from './assets/header/Components/Songs';
import Login from './assets/header/Components/Auth/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './assets/header/Components/Auth/SignUp';
import BottomHeader from './assets/header/Components/ComponetsSM/BottomHeader';
import Home from './assets/pages/Home/Home';
import Footer from './assets/footer/Footer';
import { useSelector } from 'react-redux';
import Editor from './assets/pages/Editor/Editor';
import { useEffect } from 'react';
import RefereshHandler from './assets/RefereshHandler';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import loading from './loading.gif'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function App() {
  const [createNewOpen, setCreateNewOpen] = useState(false);
  const [openSavedProjects, setOpenSavedProjects] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [openSongs, setOpenSongs] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const isToggle = useSelector((state) => state.theme.darkMode);
  const [isLoading, setIsLoading] = useState(false);
  const gradientClass = isToggle
    ? 'from-[#3a0d3c] from-25% via-[#351b35] via-52% to-[#2e282e] to-88%'
    : 'from-[#A67CB4] from-25% via-[#B493AD] via-52% to-[#B4B4B4] to-88%';
  // const [isAuthenticated,setIsAuthenticated]=useState(false);

  //    const PrivateRouting=({children})=>{
  //     return isAuthenticated?children:<Navigate to="/" />
  //    }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${backendUrl}/ping`)
    .catch(() => {})
   .finally(()=>setIsLoading(false)) ;

  }, [])



  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("canvasSize");
        localStorage.removeItem("elements");
        setOpenLogout(false);

      }
    }


  }, [])

 return (
  <div className={`min-h-screen bg-gradient-to-b ${gradientClass} relative bg-[#351b35]`}>
    
    {/* 1. Subtle Loading Bar (Only shows when Render is waking up) */}
    {isLoading && (
      <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-blue-500 animate-pulse">
        <div className="h-full bg-white w-1/3 animate-[loading_2s_infinite]"></div>
      </div>
    )}

    <Header setOpenLogin={setOpenLogin} setOpenSongs={setOpenSongs} setCreateNewOpen={setCreateNewOpen} setOpenSavedProjects={setOpenSavedProjects} setOpenGallery={setOpenGallery} />
    
    <BottomHeader setOpenSavedProjects={setOpenSavedProjects} setCreateNewOpen={setCreateNewOpen} setOpenGallery={setOpenGallery} />

    {/* ... your other components (Create, Saved, etc.) ... */}

    <Routes>
      <Route path='/' element={<Home setCreateNewOpen={setCreateNewOpen} setOpenLogin={setOpenLogin} />} />
      <Route path='/editor' element={<Editor />} />
    </Routes>

    <Footer setOpenLogin={setOpenLogin} />
    
    {/* 2. Optional: A small "Wake up" notification in the corner */}
    {isLoading && (
      <div className="fixed bottom-5 right-5 bg-black/50 text-white text-xs p-2 rounded shadow-lg">
        Waking up server... (Render Free Tier)
      </div>
    )}
  </div>
);
}

export default App
