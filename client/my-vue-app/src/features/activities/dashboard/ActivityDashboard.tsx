import { Wrap, Text, Stack, Heading, Spinner, Box, Input, Select, Button, Skeleton} from '@chakra-ui/react'
import { Activity } from '../../../app/models/Interfaces';
import ActivityList from "./ActivityList";
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import { toast } from 'react-toastify';



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

    useEffect(()=> {
        if(activityStore.activities.length < 1)  activityStore.loadActivities();
    }, [activityStore.activities.length , activityStore.loading])

    return(
        <Box>
            {/* {activityStore.loading && !loadingNext ? (
                <Spinner position="absolute" top="300%" left="50%" size="xl" />
            ):( */}
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handlePaging}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                >
                    <Stack direction="row" align={"flex-start"}>
                        <Wrap align={"flex-start"} spacing="30px">
                            {/* {loadingNext && <Skeleton w={250} h={250} />} */}
                            <ActivityList />
                        </Wrap>
                        <Stack spacing={4}>
                            <ActivityFilters />
                        </Stack>
                    </Stack>
                </InfiniteScroll>
               
            {/* )} */}
        </Box>
        
    )
}
export default observer(ActivityDashboard);