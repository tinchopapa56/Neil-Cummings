import { Heading,  Divider, Box, WrapItem,  Container, Skeleton,} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useStore } from '../../../app/stores/store';
import ActivityCard from './ActivityCard';


const ActivityList: React.FC = () => {

  const {activityStore} = useStore();
  

  return (
    <Container maxW={'1600'} p="6" w={"100%"}>
    <Box>

    {/* <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}> */}
        <WrapItem justifyContent={"center"} flexWrap="wrap" maxW={1500} width={"100%"} gap="30px">

          {activityStore.loadingInitial ? (
            <>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(sk => (
                <Skeleton borderRadius={"lg"} key={sk} w={300} h={350} />
              ))}
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