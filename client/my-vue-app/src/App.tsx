import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Text, Stack} from "@chakra-ui/react";

import { activity } from "./Interfaces";

function App() {
  const [activities, setActivities] = useState<activity[]>([]);

  const getData = async (): Promise<void> => {
        const res: activity[] = await axios.get("http://localhost:5000/api/activities");
        console.log(res);
        setActivities(res);
      }
    useEffect(()=> {
      try{
        getData();
      } catch(err){
        console.log(err);
      }
    },[])
  return (
    <Box>
      <Text>Chakra</Text>

      {/* {activities ? activities.map((activity: any) => (
        <Box key={activity.id}>
          <Text>{activity.title}</Text>
          <Text>{activity.city}</Text>
        </Box>
        )) : <Text>Mal alla</Text>
      } */}

    </Box>
  )
}

export default App
