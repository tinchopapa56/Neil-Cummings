import { observer } from "mobx-react-lite";
import {  Box, Flex, Grid, Spinner} from '@chakra-ui/react';


  import React, { useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { useStore } from '../../app/stores/store';
import ProfilePageHeader from "./components/ProfilePageHeader";
import ProfilePageContent from "./components/ProfilePageContent";

import Header from "./components/Header";
import { FaAddressBook, FaCube, FaPenFancy } from "react-icons/fa";

import I1 from "../../imgs/cover.png"
import Conversations from "./components/Conversations";
import Follow from "./components/Follow";
import ProfileInformation from "./components/Info";
import Info from "./components/Info";
import Projects from "./components/Projects";
import ProfilePhotos from "./components/profilePageContent/ProfilePhotos";
import ProfileEvents from "./components/profilePageContent/ProfileEvents";


const ProfilePage = () => {
    const {username} = useParams<{username: string}>();

    const {profileStore} = useStore();
    
   useEffect(() => {
    if(username){
      profileStore.loadProfile(username)
      const ver = profileStore.loadProfileEvents(username, "default")
      console.log(ver)
    }
    
   },[username, profileStore.loadProfile])


   if(profileStore.isloadingProfile == true) {
    return <Spinner size="xl" />
   }

   const tabsARR=[
    {
      name: "OVERVIEW",
      icon: <FaCube width='100%' height='100%' />,
    },
    {
      name: "PHOTOS",
      icon: <FaAddressBook width='100%' height='100%' />,
    },
    {
      name: "EVENTS",
      icon: <FaPenFancy width='100%' height='100%' />,
    },
  ]
  // const bannerIMG = "https://thumbs.dreamstime.com/z/music-nature-man-playing-acoustic-guitar-meadow-close-up-copy-space-162109185.jpg"
  // const bI2 = "https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
   const BI3 = "https://images.unsplash.com/photo-1574282673493-46d5ff24e086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
  return (
    <Box bg="gray.100" m="0"> 
      <Flex  w="80%" m="2em auto" direction="column" gap={4}>

        <Header backgroundHeader={BI3} backgroundProfile ="prifle" 
          avatarImage ={profileStore.profile?.image} name= {profileStore.profile?.displayName!}  email ="mail"  tabs={tabsARR} 
        />

        <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
          <Info title={"Profile Information"}
            description={"Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."}
            name={"Esthera Jackson"}
            mobile={"(44) 123 1234 123"}
            email={"esthera@simmmple.com"}
            location={"United States"} 
          />
            <Conversations />
            <Follow />
        </Grid>

        <Projects />
        <ProfilePhotos photos={profileStore.profile?.photos!} />
          {/* <ProfileEvents /> */}
          {/* <ProfilePageHeader profile={profileStore.profile!} /> */}
          {/* <ProfilePageContent profile={profileStore.profile!} />  */}
          
        </Flex>
    </Box> 
)}
    
export default observer(ProfilePage)