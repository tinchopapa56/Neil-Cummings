import { Wrap, Stack, Spinner, Box} from '@chakra-ui/react'
import { Activity } from '../../../app/models/Interfaces';
import ActivityList from "./ActivityList";
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';



const ActivityDashboard: React.FC = () => {

    const {activityStore} = useStore();

    useEffect(()=> {
        activityStore.loadActivities();
    }, [activityStore])

    return(
        <Box>
            {activityStore.loading ? (
                <Spinner position="absolute" top="300%" left="50%" size="xl" />
            ):(
                <Stack direction="row" align={"flex-start"}>
                    <Wrap align={"flex-start"} spacing="30px" marginTop="5">
                        <ActivityList activities={activityStore.activities}/>
                    </Wrap>
                    <Stack spacing={4}>
                        {activityStore.selectedACT && <ActivityDetails />}
                        {activityStore.editMode && <ActivityForm selectedACT={activityStore.selectedACT} />}
                    </Stack>
                </Stack>
            )}
        </Box>
        
    )
}
export default observer(ActivityDashboard);