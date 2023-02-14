import { Heading,  Divider, Box, WrapItem,  Container, Skeleton,} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useStore } from '../../../app/stores/store';
import ActivityCard from './ActivityCard';


const ActivityList: React.FC = () => {

  const {activityStore} = useStore();
  

  return (
    <Container maxW={'8xl'} p="6" w={"100%"}>
    <Box>

    
      {/* <Heading as="h1">All Activities</Heading> */}
      <Divider marginTop="5" />
    {/* <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}> */}
        <WrapItem justifyContent={"center"} flexWrap="wrap" maxW={1200} width={"100%"} gap="30px">

          {activityStore.loadingInitial ? (
            <>
              <Skeleton w={250} h={250} />
              <Skeleton w={250} h={250} />
              <Skeleton w={250} h={250} />
              <Skeleton w={250} h={250} />
              <Skeleton w={250} h={250} />
              <Skeleton w={250} h={250} />
            </>
            ) : (
            activityStore.activitiesByDate?.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            )) 
            
          )}
          
        </WrapItem>
        </Box>
     </Container>
  );
};

export default ActivityList;