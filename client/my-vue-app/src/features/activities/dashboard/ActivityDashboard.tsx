import { Wrap, Text, Stack, Heading, Spinner, Box, Input, Select} from '@chakra-ui/react'
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
                    <Wrap align={"flex-start"} spacing="30px">
                        <ActivityList activities={activityStore.activities}/>
                    </Wrap>
                    <Stack spacing={4}>
                        <Stack>
                            <Heading mt={6} as="h2">Filter by</Heading>
                            <Text>Date</Text>
                            <Input type="date" />
                            <Text>Category</Text>
                            <Select placeholder='Select Category'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Text></Text>
                        </Stack>
                        
                        {activityStore.selectedACT && <ActivityDetails />}
                        {activityStore.editMode && <ActivityForm />}
                    </Stack>
                </Stack>
            )}
        </Box>
        
    )
}
export default observer(ActivityDashboard);