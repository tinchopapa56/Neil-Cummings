import React, {useEffect, useState} from 'react';
import { Box, Heading, Link, Image, Text, Divider, HStack, Tag, Wrap, WrapItem, SpaceProps, useColorModeValue, Container, VStack, Stack, Button} from '@chakra-ui/react';
import { Activity } from '../../../app/models/Interfaces';
import { store, useStore } from '../../../app/stores/store';
import ActivityAttendees from './ActivityAttendees';


// 30 ch por llinea las cards

interface IBlogTagsProps {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTagsProps> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop} justify="space-between">
      <Box>
        {props.tags.map(tag => (
            <Tag mr={2} size={'md'} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          ))}
      </Box>
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date | any;
  name: string;
  // userImg: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        // src={props}
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      {/* <Text>_</Text> */}
      {/* <Text>{props.date.toLocaleDateString()}</Text> */}
      <Text>{props.date}</Text>
    </HStack>
  );
};

interface Props {
  activities: Activity[] | undefined,
}






const ActivityList: React.FC<Props> = ({activities}) => {

  const {activityStore, userStore} = useStore();


  const handleDelete = (id: string, ActToDelete?: boolean) => {
    

    if(ActToDelete){
      activityStore.deleteACT(id);
    } else {
      activityStore.selectACT(id);
    }
  }
  console.log(activities?.forEach(act => {
    console.log(act)
    console.log(act.isHost);
    console.log(act.isHost);
  }))

  return (
    <Container maxW={'7xl'} p="6" w={"100%"}>
      <Heading as="h1">All Activities</Heading>
      <Divider marginTop="5" />
    {/* <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}> */}
        <WrapItem flexWrap="wrap" maxW={800} width={"100%"} gap="15px">

          {activities?.map(activity => (
            <Box w={250} borderRadius="lg" overflow="hidden" key={activity.id}>
                  <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image transform="scale(1.0)" src={activity.image ? `${activity.image}` : 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80' } alt="some text" objectFit="contain" width="100%" transition="0.3s ease-in-out" _hover={{   transform: 'scale(1.05)', }}
                    />
                  </Link>
                  <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
                <Heading fontSize="xl" marginTop="2">{activity.title}</Heading>
                <Text as="p" fontSize="md" marginTop="2">{activity.description}</Text>
                
                {activity.isHost && (
                  <Button variant="outline" color="orange">You are hosting</Button>
                )}
                {activity.isGoing && (
                  <Button variant="outline" color="green">You are going</Button>
                )}

                <Stack justify="space-between" pt={2} direction={"row"}>
                  <Button as={Link} href={`/activities/${activity.id}`} p={4} colorScheme='teal' size='xs'>View</Button>
                  <Button onClick={() => handleDelete(activity.id, true)} p={4} colorScheme="red" size='xs'> Delete</Button>
                </Stack>

                <Stack pt={4} pb={4} direction="row">
                  <ActivityAttendees act={activity} />
                </Stack>
                
                  
                <BlogAuthor
                  name={ activity.hostUsername ? `${activity.hostUsername}` : 'John Doe'}
                  date={activity.date}
                  // userImg={activity.attendees.filter(attendee => attendee.username === activity.hostUsername)}
                  // date={new Date('2021-04-06T19:01:27Z')}
                />
            </Box>
          ))}
        </WrapItem>

    </Container>
  );
};

export default ActivityList;