import { Avatar, Card, CardBody, CardHeader, Flex, Link, Popover, PopoverBody, PopoverContent, PopoverTrigger, Stack, Switch, Text, useColorModeValue } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import React from "react";
import { useStore } from "../../../../app/stores/store";
import ProfileCard2 from "../../ProfileCard2";
import I1 from "../../../../imgs/cover3.png"

const Follow:React.FC = () => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const {profileStore} = useStore(); 
  console.log(profileStore.followings)

  
  return (
    <Card p='16px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          Followers/Followings
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column'>
          <Text fontSize='xl' color='gray.700' fontWeight='600' mb='20px'>
            Followers {profileStore.profile?.followersCount}
          </Text>
          <Stack spacing={4} mb={4}  direction="row">
            {profileStore.followings.map(attendee => (
                  <Popover trigger={'hover'} key={attendee.username}>
                  <PopoverTrigger>
                      <Avatar 
                          as={Link} href={`/profiles/${attendee.username}`}
                          cursor={"pointer"} size='xl' _hover={{   transform: "scale(1.2)", }}
                          name= { attendee.username ? `${attendee.username}` : 'TemplateName'} 
                          src={ attendee.image ? `${attendee.image}` : 'https://bit.ly/dan-abramov'} 
                      />
                  </PopoverTrigger>
                  <PopoverContent>
                      <PopoverBody>
                          <ProfileCard2 profile={attendee} />
                      </PopoverBody>
                  </PopoverContent>
                  </Popover>
                  
              ))}
          </Stack>
           

          <Text
            fontSize='xl'
            color='gray.500'
            fontWeight='600'
            mt= {4}>
            Following {profileStore.profile?.followingsCount}
          </Text>
          <Stack spacing={4}direction="row-reverse" justify="flex-end">
            {profileStore.followings.map(attendee => (
                  <Popover trigger={'hover'} key={attendee.username}>
                  <PopoverTrigger>
                      <Avatar 
                          as={Link} href={`/profiles/${attendee.username}`}
                          cursor={"pointer"} size='xl' _hover={{   transform: "scale(1.2)", }}
                          name= { attendee.username ? `${attendee.username}` : 'TemplateName'} 
                          src={ attendee.image ? `${attendee.image}` : `${I1}` } 
                      />
                  </PopoverTrigger>
                  <PopoverContent>
                      <PopoverBody>
                          <ProfileCard2 profile={attendee} />
                      </PopoverBody>
                  </PopoverContent>
                  </Popover>
                  
              ))}
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default observer(Follow);
