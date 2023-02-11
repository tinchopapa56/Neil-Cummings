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
  return (
    <>
        {activityStore.loading ? (<Skeleton w={250} h={250} />) : (
            <Box w={250} borderRadius="lg" overflow="hidden" key={activity.id}>
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image transform="scale(1.0)" src={'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80' } alt="some text" objectFit="contain" width="100%" transition="0.3s ease-in-out" _hover={{   transform: 'scale(1.05)', }}
                />
                </Link>
                <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
                <Heading fontSize="xl" marginTop="2">{activity.title}</Heading>
                <Text as="p" fontSize="md" marginTop="2">{activity.description}</Text>
                
                {activity.isHost && (<Button variant="outline" color="orange">You are hosting</Button>)}
                {activity.isGoing && ( <Button variant="outline" color="green">You are going</Button>)}

                <Stack justify="space-between" pt={2} direction={"row"}>
                    <Button as={Link} href={`/activities/${activity.id}`} p={4} colorScheme='teal' size='xs'>View</Button>
                    <Button onClick={() => handleDelete(activity.id, true)} p={4} colorScheme="red" size='xs'> Delete</Button>
                </Stack>

                <Stack pt={4} pb={4} direction="row">
                    <ActivityAttendees act={activity} />
                </Stack>
                
                    
                <Stack direction="row" align="center" justify={"space-between"}>
                 <Avatar/>
                 {/* src={activity.attendees.filter(attendee => attendee.username === activity.hostUsername)}  */}
                 {/* <Text>{new Date('2021-04-06T19:01:27Z')}</Text> */}
                 <Text>{ activity.hostUsername ? `${activity.hostUsername}` : 'John Doe'}</Text>
                </Stack>  
            </Box>
        )}
        
    </>
    
    
  )
}
