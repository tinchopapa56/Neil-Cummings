import React, {useEffect} from 'react';
import { Activity } from '../../../app/models/Interfaces';

import { Heading, Flex, Spinner, Avatar, Box, Center, Text, Stack, Button, Link, Badge, useColorModeValue } from '@chakra-ui/react';
import { useStore } from '../../../app/stores/store';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

const ActivityDetails: React.FC= () => {

    const {activityStore} = useStore();
    const {loadActivity, selectedACT, loading} = activityStore;

    const {id} = useParams();

    useEffect(() => {
      if(id) loadActivity(id)
    }, [id, loadActivity] )
    

    const handleClick = (edit: boolean) =>{
      const clickedACT = (activityStore.selectedACT?.id)
      if(edit)    activityStore.openForm(clickedACT);
      if(!edit) activityStore.closeForm();
    }

  return (
    <Flex w={"100%"} align={"center"} justify={"center"} h={"80vh"}>
      {loading ? (<Spinner />
        ):(
        <Box maxW={'320px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
          <Avatar size={'xl'} src={'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'} mb={4} pos={'relative'} _after={{   content: '""',   w: 4,   h: 4,   bg: 'green.300',   border: '2px solid white',   rounded: 'full',   pos: 'absolute',   bottom: 0,   right: 3, }}/>
          <Heading fontSize={'2xl'} fontFamily={'body'}> {activityStore.selectedACT?.title} </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}> {selectedACT?.date} </Text>
          <Text textAlign={'center'} color='gray.700' px={3}>{selectedACT?.description} </Text>
        
            {/* 2 BUTTONS */}
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button as={Link} href={`/manage/${selectedACT?.id}`} onClick={() => handleClick(true) } flex={1} fontSize={'sm'} rounded={'full'} _focus={{   bg: 'gray.200', }}>
              Edit
            </Button>
            <Button as={Link} href={"/join"} onClick={() => handleClick(false) } flex={1} fontSize={'sm'} rounded={'full'} bg={'blue.400'} color={'white'} boxShadow={   '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)' } _hover={{ bg: 'blue.500', }} _focus={{ bg: 'blue.500', }}>
              Join
            </Button>

          </Stack>
        </Box>
      )}
    </Flex>
    
  );
}
export default observer(ActivityDetails);