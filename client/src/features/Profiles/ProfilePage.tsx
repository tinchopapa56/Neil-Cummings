import { observer } from "mobx-react-lite";
import {  Box, Flex, Spinner} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../app/stores/store';

import Header from "./layout/Header";
import { FaAddressBook, FaCube, FaPenFancy } from "react-icons/fa";

import ProfilePhotos from "./layout/ProfilePhotos";
import ProfileEvents from "./layout/ProfileEvents";
import ProfileInfo from "./layout/ProfileInfo";


const ProfilePage = () => {
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();

    const[renderedComponent, setRenderedComponent] = useState<any>({
      Info : true,
      Photos : false,
      Events : false,
    })
    const handleRenderedComponent = (section: string) => {
      setRenderedComponent((prev: any) => {
        return {
          Info : false,
          Photos : false,
          Events : false,
          [section] : !prev[section],
          
        }
      })
    }
    
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
      doRender: handleRenderedComponent,
    },
    {
      name: "PHOTOS",
      icon: <FaAddressBook width='100%' height='100%' />,
      doRender: handleRenderedComponent,
    },
    {
      name: "EVENTS",
      icon: <FaPenFancy width='100%' height='100%' />,
      doRender: handleRenderedComponent,
    },
  ]
  // const bannerIMG = "https://thumbs.dreamstime.com/z/music-nature-man-playing-acoustic-guitar-meadow-close-up-copy-space-162109185.jpg"
  const BI3 = "https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  //  const BI3 = "https://images.unsplash.com/photo-1574282673493-46d5ff24e086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
  
  return (
    <Box bg="gray.100" m="0"> 
      <Flex p={4}  w="80%" m="2em auto" direction="column" gap={4}>

        <Header backgroundHeader={BI3} backgroundProfile ="prifle" 
          avatarImage ={profileStore.profile?.image} name= {profileStore.profile?.displayName!}  email ="MUSICIAN vs VENUE"  tabs={tabsARR} 
        />

        {renderedComponent.Info && <ProfileInfo />}
        {renderedComponent.Events && <ProfileEvents />}
        {renderedComponent.Photos && <ProfilePhotos photos={profileStore.profile?.photos!} />}

          
        </Flex>
    </Box> 
)}
    
export default observer(ProfilePage)