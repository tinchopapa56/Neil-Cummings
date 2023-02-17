import { Container, Stack, Flex, Box,Link, Heading, Text, Button, Image, Icon,  IconProps,} from '@chakra-ui/react';
import React from 'react'
import I1 from "../../imgs/cover.png";
import { useStore } from '../../app/stores/store';
// import { Link } from 'react-router-dom';

export default function HomePage() {
const {commonStore} = useStore();

  return (
    <Container maxW={'8xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              {/* Bandify, */}
              Meetlify
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              {/* Connecting Music Makers & Bussines owners */}
              Building connections & comunnities for free
            </Text>
          </Heading>
          <Text fontSize={"2xl"} color={'gray.500'}>
            {/* Bandify´s purpose is to connect musicians with business owners looking for enterteinment & show
            Musicians & Busciness owners can create an account & set up shows */}
            Meetlify´s purpose is to connect people with similar interests, organize events & breed new friendships
            Everyone can create an account, join existing events or propse a create a new one
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}>
            {commonStore.token ? (
              <Button as={Link} href="/activities" rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'red'} bg={'red.400'} _hover={{ bg: 'red.500' }}>
              Go to events
              </Button>
            ):(
              <Stack pt={4} spacing={4} direction="row">
                <Button as={Link} href="/login" w="50%"  rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'red'} bg={'red.400'} _hover={{ bg: 'red.500' }}>Log In</Button>
                <Button as={Link} href="/register" w="50%"  rounded={'full'} size={'lg'} fontWeight={'normal'} px={6} colorScheme={'red'} bg={'red.400'} _hover={{ bg: 'red.500' }}>Register</Button>
              </Stack>
            )}
            

            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
            >
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Blob
            w={'140%'}
            h={'135%'}
            position={'absolute'}
            top={'-10%'}
            left={-10}
            zIndex={-1}
            color="red.200"
            // color={useColorModeValue('red.50', 'red.400')}
          />
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}>
            {/* <IconButton
              aria-label={'Play Button'}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              icon={<PlayIcon w={12} h={12} />}
              size={'lg'}
              color={'white'}
              position={'absolute'}
              left={'50%'}
              top={'50%'}
              transform={'translateX(-50%) translateY(-50%)'}
            /> */}
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={I1}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export const Blob = (props: IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};