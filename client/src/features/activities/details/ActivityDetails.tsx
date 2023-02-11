import React, {useEffect} from 'react';
import { Activity } from '../../../app/models/Interfaces';

import { Heading,Image, Icon, Flex, Spinner, Avatar, Box, Center, Text, Stack, Button, Link, Badge, useColorModeValue, Divider } from '@chakra-ui/react';
import { useStore } from '../../../app/stores/store';

import {UnlockIcon} from "@chakra-ui/icons"

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import ActivityLiveChat from './ActivityLiveChat';

const ActivityDetails: React.FC= () => {

    const {activityStore} = useStore();
    const {loadActivity, selectedActivity, loading, updateAttendance} = activityStore;

    const {id} = useParams();

    useEffect(() => {
      if(id) loadActivity(id)
    }, [id, loadActivity] )

  return (
    <Flex p={4} mt={4} gap={6} w={"100%"} align="flex-start" justify={"center"}>
      
      {/* LEFT PART */}
        <Stack flex="0.75" spacing={4}>
          <Box borderRadius={"sm"} backgroundColor="blue.100">
            <Box color="white" height={300} backgroundSize="cover" 
             backgroundImage={"https://wallpapercave.com/wp/wp3638503.jpg"}
            >
              <Heading>{activityStore.selectedActivity?.title}</Heading>
              <Text>{activityStore.selectedActivity?.date?.toString()}</Text>
              <Text>{activityStore.selectedActivity?.hostUsername}</Text>
            </Box>
            <Flex justify={"space-between"} p={2} direction="row">
              <Stack direction="row">
                <Button colorScheme="teal" onClick={updateAttendance}>
                  {activityStore.selectedActivity?.isGoing ? "Cancel attendance" : "Join"}
                  {/* Join */}
                </Button>
                <Button colorScheme="red"  as={Link} href="/activities">Go home</Button>
              </Stack>
              <Button  colorScheme="orange">Manage</Button>
            </Flex>
          </Box>

          <Stack borderRadius={"sm"} backgroundColor="red.100" divider={<Divider /> }>
            <Stack align="center" pt={2} pl={4} direction="row">
              <UnlockIcon color="teal.200" />
              <Text>{activityStore.selectedActivity?.title}</Text>
            </Stack>
            <Stack align="center" pt={2} pl={4} direction="row">
            {/* <Icon as="" /> */}
              <UnlockIcon color="teal.200" />
              <Text>{activityStore.selectedActivity?.date?.toString()}</Text>
            </Stack>
            <Stack align="center" pt={2} pl={4} direction="row">
            {/* <Icon as="" /> */}
              <UnlockIcon color="teal.200"  />
              <Text>{activityStore.selectedActivity?.city}</Text>
            </Stack>
          </Stack>

          <ActivityLiveChat activityId={activityStore.selectedActivity?.id!} />

        </Stack>

      {/* RIGHT PART */}
        <Box w={300} backgroundColor="green.100">
          <Box borderTopRadius="md" p={4} textAlign="center" w="100%" backgroundColor="teal.400">
            <Text color="white">{selectedActivity?.attendees!.length} People Going</Text>
          </Box>
          
          {selectedActivity?.attendees!.map((att) => (
            <Flex p={2} gap={4} key={att.username}>
              <Avatar src={att.image || ""} size="md" />
              <Box>
                <Text fontSize={"lg"} fontWeight="semibold">{att.username}</Text>
                {att.following && (
                <Text color="orange">Following</Text>
                )}
              </Box>
            </Flex>
          ))}
        </Box>

    </Flex>
    
  );
}
export default observer(ActivityDetails);