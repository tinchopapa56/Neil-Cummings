import React, { useState } from 'react'
import { Box, Flex, Grid, Icon, Heading, GridItem, Link, Image, Text, Divider, Stack, Button, Avatar} from '@chakra-ui/react';
import { useStore } from '../../../app/stores/store';
import { Photo, Profile } from '../../../app/models/Interfaces';
import { observer } from 'mobx-react-lite';
import { object } from 'yup';
import {CheckCircleIcon} from "@chakra-ui/icons"
import ImageUpload from './ImageUpload/ImageUpload';

interface Props {
    photos: Photo[]
}

 function ProfilePhotos({photos} : Props) {
    const {profileStore} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState<boolean>(false);

    const handlePhUpload = (file: Blob) => {
        profileStore.uploadPhoto(file)
            .then(() => setAddPhotoMode(false));
    }

  return (
    <>
        <Stack align="center" p={4} bg="red.100" direction={"row"} justify="space-between" divider={<Divider />}>
            <CheckCircleIcon boxSize={8} color="green.300" />
            {/* {profileStore.isCurrentUser && ( */}
            <Button onClick={() => setAddPhotoMode(!addPhotoMode)}>
                {addPhotoMode ? "Cancel":"Add Photo"}
            </Button>
            {/* )} */}
        </Stack>
        {addPhotoMode ? ((<ImageUpload uploadPhoto={handlePhUpload} isUploading={profileStore.uploading} />)
            ):(photos ? (
                <Grid p={4} templateColumns='repeat(5, 1fr)' gap={6}>
                {photos.map(ph => (
                    <GridItem key={ph.id}>
                        <Image src={ph.url} />
                    </GridItem>
                ))}
                </Grid>
            ):("No fotos")
        )}
    </>
    
  )
}

export default observer(ProfilePhotos)