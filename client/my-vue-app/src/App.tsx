import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Text, Stack} from "@chakra-ui/react";

import { activity } from "./Interfaces";

function App() {

  const [activities, setActivities] = useState<activity[]>([]);

    useEffect(()=> {

      const getData = async (): Promise<void> => {
        const res: activity[] = await axios.get("")
        console.log(res);
        setActivities(res);
      }
      getData();

    },[activities])
  return (
    <Box>
      <Text>Chakra</Text>

      {activities.map((activity: any) => (
        <Box key={activity.id}>
          <Text>{activity.title}</Text>
          <Text>{activity.title}</Text>
        </Box>
      ))}

    </Box>
  )
}

export default App
