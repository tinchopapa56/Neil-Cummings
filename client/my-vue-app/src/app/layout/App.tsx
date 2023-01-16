import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Text, Stack, Spinner} from "@chakra-ui/react";

import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import { Activity } from "../models/Interfaces";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  
    useEffect(()=> {
      try{
        const getData = async (): Promise<void> => {
          const res = await axios.get("http://localhost:5000/api/activities");
          const resData: Activity[] = res.data
          // console.log(resData);
          setActivities(resData);
        }
        getData();
      } catch(err){
        console.log(err);
      }
    },[])
  return (
    <Box>
      <Navbar />
      <Text>Chakra</Text>
      <ActivityDashboard activityArr={activities} />
    </Box>
  )
}

export default App
