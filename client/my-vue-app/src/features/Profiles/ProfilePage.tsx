import { observer } from "mobx-react-lite";
// import { Activity } from "../../../app/models/Interfaces";
import { Box, Flex, Spinner, Grid, Icon, Heading, Link, Image, Text, Divider, Stack, Button, Avatar} from '@chakra-ui/react';
// import ProfileCard from "../../Profiles/ProfileCard";
import { useState } from "react";

import {Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor, } from '@chakra-ui/react'
  import React, { useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  // import LoadingComponent from '../../app/layout/LoadingComponent';
  import { useStore } from '../../app/stores/store';
import ProfilePageHeader from "./components/ProfilePageHeader";
import ProfilePageContent from "./components/ProfilePageContent";
  // import ProfileContent from './ProfileContent';
  // import ProfileHeader from './ProfileHeader';


const ProfilePage = () => {
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    
   useEffect(() => {
    if(username){
      profileStore.loadProfile(username)
    }
    
   },[username, profileStore.loadProfile])

//    useEffect(() => {
//     loadProfile(username);
//     return () => {
//         setActiveTab(0);
//     }
// }, [profileStore.loadProfile, username, setActiveTab])

   if(profileStore.isloadingProfile == true) {
    return <Spinner size="xl" />
   }

    return (
        <Flex w="80%" m="2em auto" direction="column" gap={4}>
          
          <ProfilePageHeader profile={profileStore.profile!} />
          <ProfilePageContent profile={profileStore.profile!} />
        </Flex>
)}
    
export default observer(ProfilePage)