import { observer } from "mobx-react-lite";
import { Activity } from "../../../app/models/Interfaces";
import { Box, Heading, Link, Image, Text, Divider, HStack, Tag, Wrap, WrapItem, SpaceProps, useColorModeValue, Container, VStack, Stack, Button, Avatar} from '@chakra-ui/react';
import ProfileCard from "../../Profiles/ProfileCard";
import { useState } from "react";

import {Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor,
  } from '@chakra-ui/react'

interface Props {
    act: Activity
}

const ActivityAttendees: React.FC<Props> = ({act}) =>{

    return(
        <>
            {act.attendees.map(attendee => (
                <Popover>
                <PopoverTrigger>
                    <Avatar cursor={"pointer"} size='sm' _hover={{   transform: "scale(1.2)", }}
                        name= { attendee.username ? `${attendee.username}` : 'TemplateName'} 
                        src={ attendee.image ? `${attendee.image}` : 'https://bit.ly/dan-abramov'} 
                    />
                </PopoverTrigger>
                <PopoverContent>
                    {/* <PopoverArrow /> */}
                    {/* <PopoverCloseButton /> */}
                    {/* <PopoverHeader>Attendee: </PopoverHeader> */}
                    <PopoverBody w={40}>
                        <ProfileCard profile={attendee} />
                    </PopoverBody>
                </PopoverContent>
                </Popover>
                
            ))}
        </>
    )
}


export default observer(ActivityAttendees);