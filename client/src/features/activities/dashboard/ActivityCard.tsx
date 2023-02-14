import { ViewIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Link, Image, HStack, Tag, Skeleton, SpaceProps, Stack, Button, Avatar} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Activity } from '../../../app/models/Interfaces';
import {  useStore } from '../../../app/stores/store';
import ActivityAttendees from './ActivityAttendees';

interface Props {
    activity: Activity
}
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

export default function ActivityCard({activity}: Props) {
    const {activityStore} = useStore();

    const handleDelete = (id: string, ActToDelete?: boolean) => {
        if(ActToDelete){
          activityStore.deleteAct(id);
        }
    }
    useEffect(() => {
      console.log(activity)
    })

    const img ='https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'; 

  return (
    <>
        {activityStore.loading ? (<Skeleton w={250} h={250} />) : (
          // <Link href={`/activities/${activity.id}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Box bg="green.200"
            // bg="linear-gradient(to right top, #f9f871, #fcef6c, #fde569, #ffdc66, #ffd364);"
                  as={Link} href={`/activities/${activity.id}`} boxShadow={"xl"} w={250} borderRadius="lg" overflow="hidden" key={activity.id}>
              
                  <Image transform="scale(1.0)" src={img} alt="some text" objectFit="contain" width="100%" transition="0.3s ease-in-out" _hover={{   transform: 'scale(1.05)', }} />
                
                <Box p={2}>
                  {/* <BlogTags tags={activity.category} marginTop="3" /> */}
                  <Tag mr={2} size={'md'} variant="solid" colorScheme="orange">
                    {activity.category}
                  </Tag>
                  <Text fontSize="xl" marginTop="2" fontWeight={"bold"}>{activity.title}</Text>
                  <Stack align="center" direction="row"> 
                    <ViewIcon />
                    <Text>{activity.city}</Text>
                  </Stack>
                  <Stack align="center" direction="row"> 
                    <ViewIcon />
                    <Text>{activity.hostUsername}</Text>
                  </Stack>
                  {/* <Text as="p" fontSize="md" marginTop="2">{activity.description}</Text> */}
                  
                  {activity.isHost && (<Button variant="outline" color="orange">You are hosting</Button>)}
                  {activity.isGoing && ( <Button variant="outline" color="green">You are going</Button>)}

                  {/* <Stack justify="space-between" pt={2} direction={"row"}>
                      <Button as={Link} href={`/activities/${activity.id}`} p={4} colorScheme='teal' size='xs'>View</Button>
                      <Button onClick={() => handleDelete(activity.id, true)} p={4} colorScheme="red" size='xs'> Delete</Button>
                  </Stack> */}
                  <Text fontWeight={"bold"}>{activity.date?.toLocaleString().slice(0,10)}</Text>
                  <Stack pt={4} pb={4} direction="row">
                      <ActivityAttendees act={activity} />
                  </Stack>

                  
                </Box>
                
                
                    
                {/* <Stack direction="row" align="center" justify={"space-between"}> */}
                  {/* <Avatar/> */}
                  {/* src={activity.attendees.filter(attendee => attendee.username === activity.hostUsername)}  */}
                  {/* <Text>{new Date('2021-04-06T19:01:27Z')}</Text> */}
                  {/* <Text>{ activity.hostUsername ? `${activity.hostUsername}` : 'John Doe'}</Text> */}
                {/* </Stack>   */}
            </Box>
            // </Link>
        )}
        
    </>
    
    
  )
}
