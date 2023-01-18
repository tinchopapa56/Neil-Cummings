import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Text} from "@chakra-ui/react";

import Navbar from "./Navbar";

import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

import { Outlet } from "react-router-dom";

function App() {

  

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <Box>
      <Navbar />
      <Outlet />
    </Box>
    </>
    
  )
}

export default observer(App)
