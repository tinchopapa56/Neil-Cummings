import {useEffect} from "react";
import {Box} from "@chakra-ui/react";

import Navbar from "./Navbar";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { observer } from "mobx-react-lite";

import { Outlet } from "react-router-dom";

import { useStore } from '../stores/store';
import Footer from "./Footer";

function App() {

  const {commonStore, userStore} = useStore()
  
  useEffect(() => {
    if(localStorage.getItem("jwt")){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }
  },[commonStore.token])

  return (
    <>
      <Box>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
        <ToastContainer />
      </Box>
    
    </>
    
  )
}

export default observer(App)
