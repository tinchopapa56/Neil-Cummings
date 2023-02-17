// import React, {useEffect} from 'react';
// import { Activity } from '../../../app/models/Interfaces';

// import { Heading,Image, Icon, Flex, Spinner, Avatar, Box, Center, Text, Stack, Button, Link, Badge, useColorModeValue, Divider } from '@chakra-ui/react';
// import { useStore } from '../../../app/stores/store';

// import {UnlockIcon} from "@chakra-ui/icons"

// import { observer } from 'mobx-react-lite';
// import { useParams } from 'react-router-dom';
// import ActivityLiveChat from './ActivityLiveChat';

// const ActivityDetails: React.FC= () => {

//     const {activityStore} = useStore();
//     const {loadActivity, selectedActivity, loading, updateAttendance} = activityStore;

//     const {id} = useParams();

//     useEffect(() => {
//       if(id) loadActivity(id)
//     }, [id, loadActivity] )

//   return (
//     <Flex p={4} mt={4} gap={6} w={"100%"} align="flex-start" justify={"center"}>
      
//       {/* LEFT PART */}
//         <Stack flex="0.75" spacing={4}>
//           <Box borderRadius={"sm"} backgroundColor="blue.100">
//             <Box color="white" height={300} backgroundSize="cover" 
//              backgroundImage={"https://wallpapercave.com/wp/wp3638503.jpg"}
//             >
//               <Heading>{activityStore.selectedActivity?.title}</Heading>
//               <Text>{activityStore.selectedActivity?.date?.toString()}</Text>
//               <Text>{activityStore.selectedActivity?.hostUsername}</Text>
//             </Box>
//             <Flex justify={"space-between"} p={2} direction="row">
//               <Stack direction="row">
//                 <Button colorScheme="teal" onClick={updateAttendance}>
//                   {activityStore.selectedActivity?.isGoing ? "Cancel attendance" : "Join"}
//                   {/* Join */}
//                 </Button>
//                 <Button colorScheme="red"  as={Link} href="/activities">Go home</Button>
//               </Stack>
//               <Button  colorScheme="orange">Manage</Button>
//             </Flex>
//           </Box>

//           <Stack borderRadius={"sm"} backgroundColor="red.100" divider={<Divider /> }>
//             <Stack align="center" pt={2} pl={4} direction="row">
//               <UnlockIcon color="teal.200" />
//               <Text>{activityStore.selectedActivity?.title}</Text>
//             </Stack>
//             <Stack align="center" pt={2} pl={4} direction="row">
//             {/* <Icon as="" /> */}
//               <UnlockIcon color="teal.200" />
//               <Text>{activityStore.selectedActivity?.date?.toString()}</Text>
//             </Stack>
//             <Stack align="center" pt={2} pl={4} direction="row">
//             {/* <Icon as="" /> */}
//               <UnlockIcon color="teal.200"  />
//               <Text>{activityStore.selectedActivity?.city}</Text>
//             </Stack>
//           </Stack>

//           <ActivityLiveChat activityId={activityStore.selectedActivity?.id!} />

//         </Stack>

//       {/* RIGHT PART */}
//         <Box w={300} backgroundColor="green.100">
//           <Box borderTopRadius="md" p={4} textAlign="center" w="100%" backgroundColor="teal.400">
//             <Text color="white">{selectedActivity?.attendees!.length} People Going</Text>
//           </Box>
          
//           {selectedActivity?.attendees!.map((att) => (
//             <Flex p={2} gap={4} key={att.username}>
//               <Avatar src={att.image || ""} size="md" />
//               <Box>
//                 <Text fontSize={"lg"} fontWeight="semibold">{att.username}</Text>
//                 {att.following && (
//                 <Text color="orange">Following</Text>
//                 )}
//               </Box>
//             </Flex>
//           ))}
//         </Box>

//     </Flex>
    
//   );
// }
// export default observer(ActivityDetails);


import React, {useEffect} from 'react';

import { useStore } from '../../../app/stores/store';

import { observer } from 'mobx-react-lite';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ActivityLiveChat from './ActivityLiveChat';

import { chakra, Container, Stack, Text, useColorModeValue, Image, Skeleton, Box, Link, Button, Tag, Flex, Grid, Card, CardBody, CardHeader} from '@chakra-ui/react';
import ProfileCard2 from '../../Profiles/ProfileCard2';

const ActivityDetails: React.FC = () => {

    const {activityStore, userStore} = useStore();
    const {loadActivity, selectedActivity, loading, updateAttendance, editAct, deleteAct} = activityStore;

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if(id) loadActivity(id)
    }, [id, loadActivity, selectedActivity] )

    useEffect(() => {
      if(activityStore.navigateToHome){
        activityStore.setNavigateToHome(false)
        navigate("/activities")
      }
    }, [activityStore.navigateToHome])

    const IPurple = "https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    // const IGreen = "https://images.unsplash.com/photo-1574282673493-46d5ff24e086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  return (
    <Box bg="gray.100">
      <Container maxW="7xl" px={{ base: 6, md: 3 }} py={14}>
      <Stack bg="white" p={2} direction={{ base: 'column', md: 'row' }} justifyContent="center">
        <Box mr={{ base: 0, md: 5 }} pos="relative">
          {/* <DottedBox /> */}
          <Image
            boxShadow="lg"
            w="100%"
            h="100%"
            minW={{ base: 'auto', md: '30rem' }}
            maxH="20rem"
            objectFit="cover"
            src={activityStore.selectedActivity?.image ? activityStore.selectedActivity.image : IPurple}
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
        <Stack spacing={6} justifyContent="center">
          <chakra.h1 color="brand" fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
          {activityStore.selectedActivity?.title}
          </chakra.h1>

          <Stack spacing={2}>
            <Text fontSize="lg" textAlign="justify" maxW={"50ch"}  lineHeight="1.375" fontWeight="400" color="gray.700">
              <span style={{color:"black", fontWeight: "bold"}}>Description:</span> {selectedActivity?.description}  
            </Text>
            <Text fontSize="lg" textAlign="justify"  maxW={"50ch"} lineHeight="1.375" fontWeight="400" color="gray.700">
              Connecting musicians and venues to expand musical creativity, help them to get more out reach & form Music loving communities  
            </Text>
          </Stack>

          <Stack direction="row">
            <Tag>{activityStore.selectedActivity?.date?.toDateString()}</Tag>
              <chakra.span mx={2} fontSize='sm'>|</chakra.span>
            <Tag>{activityStore.selectedActivity?.city}</Tag>
            <chakra.span mx={2} fontSize='sm'>|</chakra.span>
              <Tag>{activityStore.selectedActivity?.category}</Tag>
          </Stack>
          <Link href={`/profiles/${selectedActivity?.hostUsername}`} fontSize="sm" color="blue.400">
            Hosted by {activityStore.selectedActivity?.hostUsername}
          </Link>
        </Stack>
      </Stack>

      {/* Attendes */}
      <Card my={4} p='16px'>
        <CardHeader p='12px 5px' mb='12px'>
            <Flex direction='column'>
            <Text fontSize='4xl' fontWeight='bold'>
                Confirmed
            </Text>
            <Text fontSize='sm' color='gray.500' fontWeight='400'>
                People going to the show
            </Text>
            </Flex>
        </CardHeader>
        <CardBody px='5px'>
        <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }} templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}>
          {selectedActivity?.attendees!.map(att => <ProfileCard2 profile={att} key={att.username} />)}
        </Grid>
        </CardBody>
      </Card>
      
      {/* BUTTONERA */}
      <Container margin={0} maxW="100%" py={4 }>
        <Banner
          text={activityStore.selectedActivity?.isGoing ? "Cancel attendance" : "Join"}
          updateAttendanceFX={updateAttendance}
          editActFX={editAct}
          deleteActFX={deleteAct}
          hostIsUser={activityStore.selectedActivity?.hostUsername == userStore.user?.username ? true : false}
          ActID={selectedActivity?.hostUsername == userStore.user?.username ? id : ""}
        />
      </Container>
    
    

    {/* LIVECHAT */}
      <ActivityLiveChat activityId={activityStore.selectedActivity?.id!} />

      </Container>
    </Box>
    
  );
};

interface BannerProps {
  text: string;
  updateAttendanceFX: (params: any) => void;
  editActFX: (params: any) => void;
  deleteActFX: (params: any) => void;
  hostIsUser: boolean;
  ActID?: string;
}
const Banner:React.FC<BannerProps> = ({text, updateAttendanceFX, editActFX, deleteActFX, hostIsUser, ActID} : BannerProps) => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={5}
      alignItems={{ base: 'flex-start', md: 'center' }}
      justifyContent="space-between"
      rounded="lg"
      boxShadow="md"
      bg="white"
      // bg={useColorModeValue('gray.100', 'gray.700')}
      p={{ base: 8, md: 16 }}
    >
      <Box>
        <chakra.h1 fontSize="4xl" lineHeight={1.2} color="linear-gradient(to right top, #f9f871, #fee96c, #ffdb6a, #ffcd69, #ffc06a, #ffbd6a, #ffba6a, #ffb76a, #ffbe68, #ffc566, #ffcc65, #ffd364);" fontWeight="bold">
          Ready to enjoy live music?
        </chakra.h1>
        <chakra.h2 fontSize="2xl" lineHeight={1.2} fontWeight="bold" bgGradient="linear(to-l, #0ea5e9,#2563eb)" bg="brand" bgClip="text">
          Confirm your attendance to the show.
        </chakra.h2>
      </Box>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 0, sm: 3 }} w={{ base: '100%', sm: 'auto' }}>
        <Button as={Link} href="#" color="white" variant="solid" size="lg" rounded="md" mb={{ base: 2, sm: 0 }} lineHeight={1} bgGradient="linear(to-l, #0ea5e9,#2563eb)" _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)' }}
        onClick={updateAttendanceFX}
        >
          {text}
        </Button>
        <Button size="lg" rounded="md" mb={{ base: 2, sm: 0 }} _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }} lineHeight={1}
          // onClick={() => editActFX(ActID)}
          as={Link}
          href={`/manage/${ActID}`}
          disabled= {!hostIsUser}
          bg={hostIsUser ? "linear-gradient(to right top, #f9f871, #fee96c, #ffdb6a, #ffcd69, #ffc06a, #ffbd6a, #ffba6a, #ffb76a, #ffbe68, #ffc566, #ffcc65, #ffd364);" : useColorModeValue('gray.200', 'gray.600')}
        >
          Edit (Host only)
        </Button>
        <Button size="lg" rounded="md" mb={{ base: 2, sm: 0 }} _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }} lineHeight={1}
          onClick={() => deleteActFX(ActID)}
          disabled= {!hostIsUser}
          bg={hostIsUser ? "red.300" : useColorModeValue('gray.200', 'gray.600')}
        >
          Delete (Host only)
        </Button>
        
      </Stack>
    </Stack>
  );
};

export default observer(ActivityDetails);