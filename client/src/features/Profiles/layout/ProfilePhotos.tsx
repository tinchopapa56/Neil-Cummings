import React, { SyntheticEvent, useState } from 'react'
import { Box, Flex, Grid, Icon, Heading, GridItem, Link, Image, Text, Divider, Stack, Button, Avatar} from '@chakra-ui/react';
import { useStore } from '../../../app/stores/store';
import { Photo, Profile } from '../../../app/models/Interfaces';
import { observer } from 'mobx-react-lite';
import { object } from 'yup';
import {CheckCircleIcon} from "@chakra-ui/icons"
import ImageUpload from '../components/ImageUpload/ImageUpload';
import { FaPlus } from 'react-icons/fa';

import { Card, CardBody, CardHeader,  useColorModeValue} from "@chakra-ui/react";

interface Props {
    photos: Photo[]
}

 function ProfilePhotos({photos} : Props) {
    const {profileStore} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState<boolean>(false);
    const [target, setTarget] = useState<string>("");

    const handlePhUpload = (file: Blob) => {
        profileStore.uploadPhoto(file)
            .then(() => setAddPhotoMode(false));
    }
    const handleSetMainPH = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        profileStore.setProfileMainPhoto(photo)
    }
    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        profileStore.deletePhoto(photo);
    }



  const textColor = useColorModeValue("gray.700", "white");

  const avatar = "https://bit.ly/dan-abramov"

  return (
    <>
    <Card p='16px'>
        <CardHeader p='12px 5px' mb='12px'>
        <Flex direction='column' justify={"flex-start"}>
          <Text fontSize='4xl' color={textColor} fontWeight='bold'>
            Your Photos
          </Text>
          {/* <Text fontSize='sm' color='gray.500' fontWeight='400'>
            You are attending
          </Text> */}
          <Button variant={"outline"} colorScheme="teal" fontWeight='400' w="120px" onClick={() => setAddPhotoMode(!addPhotoMode)}>
                {addPhotoMode ? "Cancel":"Add Photo"}
            </Button>
        </Flex>
        </CardHeader>
        <CardBody px='5px'>
            {addPhotoMode ? ((<ImageUpload uploadPhoto={handlePhUpload} isUploading={profileStore.uploading} />)
                ):(photos ? (
                    <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }} templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }} gap='24px'>
                    {photos.map(ph => (
                        <GridItem key={ph.id}>
                            <Image src={ph.url} />
                            {/* {profileStore.isCurrentUser && ( */}
                                <Stack pt={4} justify="space-around" direction={"row"}>
                                    <Button 
                                    size={"sm"}
                                    colorScheme={"green"} 
                                    onClick={(e) => handleSetMainPH(ph, e)}
                                    // isLoading={isUploading ? true : false}
                                    isLoading={target === ph.id && profileStore.loading}
                                    > Set as Main 
                                    </Button>
                                    <Button onClick={e => handleDeletePhoto(ph, e)} size={"sm"} colorScheme={"red"}>Delete</Button>
                                </Stack>
                            {/* )} */}
                        </GridItem>
                    ))}

                    <Button onClick={() => setAddPhotoMode(true)} p={photos.length == 0 ? "150px" : "0px"} bg='transparent' color='gray.500' border='1px solid lightgray' borderRadius='15px' minHeight={{ sm: "200px", md: "100%" }}>
                        <Flex direction='column' justifyContent='center' align='center'>
                        <Icon as={FaPlus} fontSize='lg' mb='12px' />
                        <Text fontSize='lg' fontWeight='bold'>
                            Add a New Photo
                        </Text>
                        </Flex>
                    </Button>
                    </Grid>
                ):(<Text>NO HAY NADA</Text>))
            }
        </CardBody>
    </Card>

    </>


    
  )
}

export default observer(ProfilePhotos)