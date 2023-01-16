import { Grid, GridItem, Box, Text } from '@chakra-ui/react'
import { Activity } from '../../../app/models/Interfaces';
import ActivityList from "./ActivityList";

interface Props{
    activityArr: Activity[];
}

const ActivityDashboard: React.FC<Props> = ({activityArr}) => {
// export default function ActivityDashboard({ActivitiesArr}: Props) {}
    return(
        <Box>
            <ActivityList activities={activityArr}/>
        </Box>
        
    )
}
export default ActivityDashboard;