import { Flex, Text, Button, Grid, CardHeader, Card, CardBody, Icon, useColorModeValue} from '@chakra-ui/react';

import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';

import { FaPlus } from 'react-icons/fa';
import ProjectCard from '../components/profile page/ProjectCard';

import imageArchitect1 from "../../../imgs/cover.png";


function ProfileEvents() {

    const {profileStore} = useStore();

    const avatar = "https://bit.ly/dan-abramov"
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Card p='16px'>
            <CardHeader p='12px 5px' mb='12px'>
                <Flex direction='column'>
                <Text fontSize='4xl' color={textColor} fontWeight='bold'>
                    Events
                </Text>
                <Text fontSize='sm' color='gray.500' fontWeight='400'>
                    You are attending
                </Text>
                </Flex>
            </CardHeader>
            <CardBody px='5px'>
                <Grid templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }} templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }} gap='24px'>
                    {profileStore.userEvents.map(ACT => (
                        <ProjectCard key={ACT.id}
                        image={imageArchitect1}
                        id={ACT.id}
                        name={ACT.category}
                        category={ACT.title}
                        description={"activity description"}
                        avatars={[avatar, avatar, avatar]}
                        />
                    ))}
                <Button p='0px' bg='transparent' color='gray.500' border='1px solid lightgray' borderRadius='15px' minHeight={{ sm: "200px", md: "100%" }}>
                    <Flex direction='column' justifyContent='center' align='center'>
                    <Icon as={FaPlus} fontSize='lg' mb='12px' />
                    <Text fontSize='lg' fontWeight='bold'>
                        Create a New Event
                    </Text>
                    </Flex>
                </Button>
                </Grid>
            </CardBody>
            </Card>
        
      )
}

export default observer(ProfileEvents)

