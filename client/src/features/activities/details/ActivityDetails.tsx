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
import { Activity } from '../../../app/models/Interfaces';

import { useStore } from '../../../app/stores/store';

import {UnlockIcon} from "@chakra-ui/icons"

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import ActivityLiveChat from './ActivityLiveChat';


import { PropsWithChildren } from 'react';
import { chakra, Container, Stack, Text, useColorModeValue, Image, Skeleton, Box, Link, TextProps, Button, Tag, Flex, Avatar, Grid, Card, CardBody, CardHeader} from '@chakra-ui/react';
import ProfileCard2 from '../../Profiles/ProfileCard2';

const ActivityDetails: React.FC = () => {

      const {activityStore} = useStore();
    const {loadActivity, selectedActivity, loading, updateAttendance} = activityStore;

    const {id} = useParams();

    useEffect(() => {
      if(id) loadActivity(id)
    }, [id, loadActivity] )

    const IPurple = "https://images.unsplash.com/photo-1605722243979-fe0be8158232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    const IGreen = "https://images.unsplash.com/photo-1574282673493-46d5ff24e086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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
            src={IGreen}
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
        <Stack spacing={6} justifyContent="center">
          <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
          {activityStore.selectedActivity?.title}
            <Tag>{activityStore.selectedActivity?.date?.toDateString()}</Tag>
            <Tag>{activityStore.selectedActivity?.city}</Tag>
          </chakra.h1>
          <Box>
            <Content>
              EVENT Description: {selectedActivity?.description}  <br />
              Event Category: {selectedActivity?.category}
            </Content>
            <Content mt={4}>
              Connecting musicinas and venues to expand musical creativity, help them to get more out reach & form Music loving communities
            </Content>
            <Content mt={4}>
              EVENT CITY: {selectedActivity?.city}  <br />
              Venue: {selectedActivity?.venue}
            </Content>
          </Box>
          <Link href="#" fontSize="sm" color="blue.400">
            Hosted by {activityStore.selectedActivity?.hostUsername}
          </Link>
        </Stack>
      </Stack>

      
      
      <Container margin={0} maxW="100%" py="6">
        <Banner
          text={activityStore.selectedActivity?.isGoing ? "Cancel attendance" : "Join"}
          updateAttendanceFX={updateAttendance}
        />
      </Container>
    
      <Card p='16px'>
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
      
      <ActivityLiveChat activityId={activityStore.selectedActivity?.id!} />

      </Container>
    </Box>
    
  );
};

const Content = ({ children, ...props }: PropsWithChildren<TextProps>) => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

function DottedBox() {
  return (
    <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
      <svg
        color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
      </svg>
    </Box>
  );
}

interface BannerProps {
  text: string;
  updateAttendanceFX: (params: any) => void;
}
const Banner:React.FC<BannerProps> = ({text, updateAttendanceFX} : BannerProps) => {
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
        <chakra.h1 fontSize="4xl" lineHeight={1.2} fontWeight="bold">
          Ready to enjoy live music?
        </chakra.h1>
        <chakra.h2
          fontSize="2xl"
          lineHeight={1.2}
          fontWeight="bold"
          bgGradient="linear(to-l, #0ea5e9,#2563eb)"
          // bg="brand"
          bgClip="text"
        >
          Confirm your attendance to the show.
        </chakra.h2>
      </Box>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 0, sm: 3 }} w={{ base: '100%', sm: 'auto' }}>
        <Button as={Link} href="#" color="white" variant="solid" size="lg" rounded="md" mb={{ base: 2, sm: 0 }} lineHeight={1} bgGradient="linear(to-l, #0ea5e9,#2563eb)" _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)' }}
        onClick={updateAttendanceFX}
        >
          {text}
        </Button>
        <Button
          as={Link}
          href="#"
          size="lg"
          rounded="md"
          mb={{ base: 2, sm: 0 }}
          bg={useColorModeValue('gray.200', 'gray.600')}
          _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }}
          lineHeight={1}
        >
          Manage (host)
        </Button>
      </Stack>
    </Stack>
  );
};



export default observer(ActivityDetails);