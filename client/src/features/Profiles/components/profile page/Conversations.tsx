// Chakra imports
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";

const Conversations:React.FC = () => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const avatar = "https://bit.ly/dan-abramov"

  return (
    <Card cursor="pointer" onClick={() => toast('🦄 Coming Soon!', {position: "bottom-right",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "dark",})
  } p='16px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>Conersations </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column' w='100%'>
          <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Avatar
                src={avatar}
                w='50px'
                h='50px'
                borderRadius='15px'
                me='10px'
              />
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  Sophie B.{" "}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  Hi! I need more information...
                </Text>
              </Flex>
            </Flex>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                REPLY
              </Text>
            </Button>
          </Flex>
          <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Avatar
                src={avatar}
                w='50px'
                h='50px'
                borderRadius='15px'
                me='10px'
              />
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  Sophie B.{" "}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  Awesome work, can you change...
                </Text>
              </Flex>
            </Flex>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                REPLY
              </Text>
            </Button>
          </Flex>
          <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Avatar
                src={avatar}
                w='50px'
                h='50px'
                borderRadius='15px'
                me='10px'
              />
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  Sophie B.{" "}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  Have a great afternoon...
                </Text>
              </Flex>
            </Flex>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                REPLY
              </Text>
            </Button>
          </Flex>
          <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Avatar
                src={avatar}
                w='50px'
                h='50px'
                borderRadius='15px'
                me='10px'
              />
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  Sophie B.{" "}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  About files I can...
                </Text>
              </Flex>
            </Flex>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                REPLY
              </Text>
            </Button>
          </Flex>
          <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Avatar
                src={avatar}
                w='50px'
                h='50px'
                borderRadius='15px'
                me='10px'
              />
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  Sophie B.{" "}
                </Text>
                <Text fontSize='xs' color='gray.500' fontWeight='400'>
                  About files I can...
                </Text>
              </Flex>
            </Flex>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                REPLY
              </Text>
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Conversations;
