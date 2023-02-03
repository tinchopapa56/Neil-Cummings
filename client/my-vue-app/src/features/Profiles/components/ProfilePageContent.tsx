import React, { useEffect } from 'react'
import { Box, Flex, Grid, Icon, Heading, Link, Image, Text, Divider, Stack, Button, Avatar} from '@chakra-ui/react';
// import ProfileCard from "../../Profiles/ProfileCard";
import { useState } from "react";
import {CheckCircleIcon} from "@chakra-ui/icons"
import { Profile } from '../../../app/models/Interfaces';
import { observer } from 'mobx-react-lite';
import ProfilePhotos from './ProfilePhotos';

interface Props {
    profile: Profile;
}
function ProfilePageContent({profile}: Props) {

  const[renderedComponent, setRenderedComponent] = useState<any>({
      About : false,
      Photos : false,
      Events : false,
      Followers : false,
      Following : false,
    })

  const handleRenderedComponent = (section: string) => {
    setRenderedComponent((prev: any) => {
      return {
        // ...prev,
        About : false,
        Photos : false,
        Events : false,
        Followers : false,
        Following : false,
        [section] : !prev[section],
        
      }
    })
  }

  return (
    <Stack direction="row" spacing={4}>
      {/* Selected section */}
      <Box flex="0.7">
        {/* <Stack align="center" p={4} bg="red.100" direction={"row"} justify="space-between" divider={<Divider />}>
          <CheckCircleIcon boxSize={8} color="green.300" />
          <Button> Add photo </Button>
        </Stack> */}
        <Box bg="teal.100">
          {renderedComponent.Photos && <ProfilePhotos photos={profile.photos!} /> }
          {/* {renderedComponent.Events && <ProfileEvents events={profile.events!} /> } */}
          {/* {renderedComponent.Followers && <ProfileFollowers followers={profile.followers!}*/}
          
        </Box>
      </Box>

      {/* {Selector} */}
      <Stack spacing={1} flex="0.3">
        {["About", "Photos", "Events", "Followers", "Following"].map( (section,i) => (
          <Box onClick={() => handleRenderedComponent(section)}
           key={i} p={2} bg="red.100" _hover={{ bg:"red.300" }}>
            <Text fontWeight={"semibold"} fontSize="md">{section}</Text>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}

export default observer(ProfilePageContent)