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

  return (isLoading ? <div className={`min-h-screen bg-gradient-to-b ${gradientClass} bg-[#351b35] flex justify-center items-center`}>
 <DotLottieReact
      src="https://lottie.host/55bec8c2-e4a4-4849-b335-b78d856b7148/ZeVTFlN1Es.lottie"
      loop
      autoplay
    /> </div>
    :
    <div className={`min-h-screen bg-gradient-to-b ${gradientClass} relative  bg-[#351b35] `}>


      <Header setOpenLogin={setOpenLogin} setOpenSongs={setOpenSongs} setCreateNewOpen={setCreateNewOpen} setOpenSavedProjects={setOpenSavedProjects} setOpenGallery={setOpenGallery}></Header>
      {/* bottom header */}
      <BottomHeader setOpenSavedProjects={setOpenSavedProjects} setCreateNewOpen={setCreateNewOpen} setOpenGallery={setOpenGallery}  ></BottomHeader>

      {/* create new pop window */}
      {createNewOpen && <Create setCreateNewOpen={setCreateNewOpen} isToggle={isToggle}  ></Create>}

      {/* saved projects pop up window */}
      {openSavedProjects && <Saved setOpenSavedProjects={setOpenSavedProjects} isToggle={isToggle}></Saved>}


      {/* gallery pop up window */}
      {openGallery && <Gallery setOpenGallery={setOpenGallery} isToggle={isToggle}></Gallery>}

      {/* songs pop up window */}
      {openSongs && <Songs setOpenSongs={setOpenSongs} isToggleMode={isToggle}></Songs>}

      {/* login pop up window  */}
      {openLogin && <Login openLogout={openLogout} setOpenLogout={setOpenLogout} setOpenSignup={setOpenSignup} setOpenLogin={setOpenLogin} isToggle={isToggle}></Login>}

      {/* signup pop up window */}
      {openSignup && <SignUp openLogout={openLogout} setOpenLogout={setOpenLogout} setOpenSignup={setOpenSignup} setOpenLogin={setOpenLogin} isToggle={isToggle} />}


      {/* home page */}


      {/* <RefereshHandler setIsAuthenticated={setIsAuthenticated} /> */}
      <Routes>
        <Route path='/' element={<Home setCreateNewOpen={setCreateNewOpen} setOpenLogin={setOpenLogin} />} />
        <Route path='/editor' element={<Editor />} />
      </Routes>

      <Footer setOpenLogin={setOpenLogin} />
    </div>


  )
}

export default App
