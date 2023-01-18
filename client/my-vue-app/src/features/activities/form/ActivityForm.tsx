import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue, } from '@chakra-ui/react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../app/models/Interfaces';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
  
  const ActivityForm = () => {

    const {activityStore} = useStore();
    const {loadActivity, selectedACT} = activityStore;

    const {id} = useParams();

    useEffect(() => {
      if(id) loadActivity(id);
    }, [id, loadActivity])


    return (
      <Flex w={"100%"} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
        
        <Stack spacing={8} w="80%" py={12} px={6}>
            <Heading fontSize={'4xl'}>Create/Edit activity</Heading>
          <Box rounded={'md'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            
            <Stack spacing={2}>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input placeholder={selectedACT?.title} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Description</FormLabel>
                <Input placeholder={selectedACT?.description} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Category</FormLabel>
                <Input placeholder={selectedACT?.category} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Date</FormLabel>
                <Input placeholder={selectedACT?.date} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>City</FormLabel>
                <Input placeholder={selectedACT?.city} />
              </FormControl>

              <Stack pt={4} justify={"flex-end"} direction="row">
                <Button w="15%" p={4} bg={'blue.300'} color={'white'} _hover={{   bg: "blue.500", }}>
                  Cancel
                </Button>
                <Button w="15%" p={4} bg={'green.300'} color={'white'} _hover={{   bg: 'green.500', }}>
                  Create Act
                </Button>
              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}

export default observer(ActivityForm)