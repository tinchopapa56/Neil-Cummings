import { Wrap, Stack, Box, Flex} from '@chakra-ui/react'
import ActivityList from "./ActivityList";
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import { toast } from 'react-toastify';
import I1 from "./../../../imgs/cover.png";



const ActivityDashboard: React.FC = () => {

    const {activityStore} = useStore();
    const {pagination} = activityStore;
    const [loadingNext, setLoadingNext] = useState<boolean>(false) 


    const handlePaging = () => {
        toast('🦄 Loading more events', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setLoadingNext(true);
        activityStore.setPagingParams(
            new PagingParams(activityStore.pagination!.currentPage + 1)
        )
        activityStore.loadActivities().then(() => setLoadingNext(false));
    }

useEffect(() => {
        if (activityStore.activityRegistry.size <= 1) activityStore.loadActivities();
    }, [activityStore.activityRegistry.size, activityStore.loadActivities])

    return(
        <Box minH={"90vh"} 
            bg="white"
            // backgroundImage={I1}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            backgroundRepeat="no-repeat"
        >
            <InfiniteScroll
                pageStart={0}
                loadMore={handlePaging}
                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
            >
                <Stack align="center" justify={"center"}>
                    <ActivityFilters />
                    <Wrap align={"center"} spacing="30px">
                        <ActivityList />
                    </Wrap>
                    
                </Stack>
            </InfiniteScroll>
        </Box>
        
    )
}
export default observer(ActivityDashboard);