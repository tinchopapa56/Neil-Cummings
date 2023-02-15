// Chakra imports
import { Button, Card, CardBody, CardHeader, Flex, Grid, Icon, Text, useColorModeValue} from "@chakra-ui/react";
// Assets

import imageArchitect1 from "../../../imgs/cover.png";
import imageArchitect2 from "../../../imgs/cover.png";
import imageArchitect3 from "../../../imgs/cover.png";
import React from "react";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "../profile page/ProjectCard";

const Projects = () => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const avatar = "https://bit.ly/dan-abramov"

  return (
    <Card p='16px' my='24px'>
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
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap='24px'>
          <ProjectCard
            image={imageArchitect1}
            name={"Project #1"}
            category={"Modern"}
            description={
              "As Uber works through a huge amount of internal management turmoil."
            }
            avatars={[avatar, avatar, avatar]}
          />
          <ProjectCard
            image={imageArchitect2}
            name={"Project #2"}
            category={"Scandinavian"}
            description={
              "Music is something that every person has his or her own specific opinion about."
            }
            avatars={[avatar, avatar, avatar, avatar]}
          />
          <ProjectCard
            image={imageArchitect3}
            name={"Project #3"}
            category={"Minimalist"}
            description={
              "Different people have different taste, especially various types of music."
            }
            avatars={[avatar, avatar, avatar]}
          />
          <Button
            p='0px'
            bg='transparent'
            color='gray.500'
            border='1px solid lightgray'
            borderRadius='15px'
            minHeight={{ sm: "200px", md: "100%" }}>
            <Flex direction='column' justifyContent='center' align='center'>
              <Icon as={FaPlus} fontSize='lg' mb='12px' />
              <Text fontSize='lg' fontWeight='bold'>
                Create a New Project
              </Text>
            </Flex>
          </Button>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default Projects;
