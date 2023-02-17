import { ViewIcon } from '@chakra-ui/icons';
import { Box, Heading, Text, Link, Image, HStack, Tag, Skeleton, SpaceProps, Stack, Button, Avatar, chakra, Flex, Icon, IconButton} from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsTelephoneX } from 'react-icons/bs';
import { Activity } from '../../../app/models/Interfaces';
import {  useStore } from '../../../app/stores/store';
import ActivityAttendees from './ActivityAttendees';

interface Props {
    activity: Activity
}

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
  const img = "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_06/3219686/200206-green-day-billie-joe-armstrong-2019-ac-521p.jpg"
  // const imgs = {
  //   music: "https://as2.ftcdn.net/v2/jpg/04/01/00/31/1000_F_401003127_6ceOdBZAQE32f0k7AqRVlm0zYCAX8W55.jpg",
  //   drinks: "https://images.pexels.com/photos/751046/pexels-photo-751046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   culture: "https://images.pexels.com/photos/1108532/pexels-photo-1108532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   travel: "https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,
  // }
  return (
    <>
        {activityStore.loading ? (<Skeleton w={250} h={250} />) : (
            <Box bg="linear-gradient(to right top, #f9f871, #fee96c, #ffdb6a, #ffcd69, #ffc06a, #ffbd6a, #ffba6a, #ffb76a, #ffbe68, #ffc566, #ffcc65, #ffd364);" color="black" 
              as={Link} href={`/activities/${activity.id}`} boxShadow={"xl"} w={280} borderRadius="lg" overflow={"hidden"} key={activity.id}
              // _hover={{   transform: "scale(1.02)", }}
            >
              <Image  transform="scale(1.0)" alt="some text" objectFit="cover" width="100%" transition="0.3s ease-in-out" _hover={{   transform: 'scale(1.05)', }} 
                src={activity.image ? activity.image : img}
              />
                
              <Stack px={2} direction="column" spacing={2} w="100%">
                <Flex mt={1} align="center" justify="space-between">
                  <chakra.h4 fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
                    {activity.title.length > 20 ? (activity.title.slice(0, 15) + "...") : activity.title }
                  </chakra.h4>
                  <chakra.h5 fontSize={{ base: 'md', md: 'lg' }} border="1px solid white" p={1} borderRadius={9999} color="white" fontWeight="400">
                    {activity.category.toUpperCase()}
                  </chakra.h5>
                </Flex>
                <Box>
                  <Text fontSize="md" fontWeight="300">
                  {activity.description.length > 36 ? (activity.description.slice(0,26) + "...") : activity.description }
                  </Text>
                </Box>
                <Flex alignItems="center" color="gray.500">
                  {["a"].map( info  => (
                    <>
                      <Fragment key={info}>
                        <Text fontSize='sm'>{activity.city}</Text>
                          <chakra.span mx={2} fontSize='sm'>
                            |     
                          </chakra.span>
                        </Fragment>
                        <Fragment key={info}>
                        <Text fontSize='sm'>{activity.hostUsername}</Text>
                          <chakra.span mx={2} fontSize={{ base: 'sm', sm: 'md' }}>
                            |
                          </chakra.span>
                      </Fragment>
                      <Fragment key={info}>
                        <Text fontSize='sm'>{activity.venue}</Text>
                      </Fragment>
                    </>
                  ))}
                </Flex>

                
            </Stack>
            <Stack p={2} direction="row">
                <ActivityAttendees act={activity} />
            </Stack>
            {/* {activity.isHost && (<Button zIndex={2} position="absolute" top="0" left="0" variant="outline" color="orange">Hosting</Button>)}
            {!activity.isHost && activity.isGoing && ( <Button zIndex={2} position="absolute" top="0" left="0" variant="outline" color="red">Going</Button>)} */}

            </Box>
        )}
    </>
  )
}