// import React, { useState } from 'react'
// import { Input, FormControl, Button,Link,Stack,Box, Card,Spinner, Heading, Text,} from '@chakra-ui/react';
// import { useFormik } from 'formik'
// import * as yup from 'yup'
// import { observer } from 'mobx-react-lite';
// import { Navigate, useNavigate } from 'react-router-dom'
// import { useStore } from '../../app/stores/store';

// const Register = () => {
//   const navigate = useNavigate();
//   const {userStore} = useStore()

//   const validationSchema = yup.object().shape({
//     email: 
//     yup.string().email()
//       .required('campo obligatorio')
//       .min(4, 'mínimo 4 caracteres')
//       .max(24, 'máximo 24 caracteres'),
//     userName: 
//     yup.string()
//       .required('campo obligatorio')
//       .min(4, 'mínimo 4 caracteres')
//       .max(24, 'máximo 24 caracteres'),
//     displayName: 
//     yup.string()
//       .required('campo obligatorio')
//       .min(4, 'mínimo 4 caracteres')
//       .max(24, 'máximo 24 caracteres'),
//     password: 
//     yup.string()
//         .required('campo obligatorio'),
        
//   })
//   //userNNNName xq asi es la propr del ASP.net User = userName[mayuscula]
//   const formik = useFormik({
//     initialValues: {
//       userName: "",
//       displayName: "",
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         console.log(values)
//         const res = await userStore.register(values) //Toast y res en userStoreMOBX
//         console.log(res, "obj o false")

//         if (res) navigate("/")
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   })

//   const {errors, values, handleChange, handleSubmit, handleBlur} = formik
  
//   return (
//     <Box w={320} textAlign="center" m="0 auto" pt={8}>
//       <form onSubmit={handleSubmit}>
//         <Stack borderRadius={"xl"} p={4} spacing={4} boxShadow={"lg"}>
          
//         <Text fontSize={"4xl"}>REGISTER</Text>
//           <Box>
//             <Text>Username</Text>
//             <Input name='userName'  onChange={ handleChange }  value={ values.userName }  onBlur={ handleBlur }  placeholder={'username'} 
//             />
//             {errors.userName && <Text color="red.300">{errors.userName}</Text>}
//           </Box>
//           <Box>
//             <Text>Display name</Text>
//             <Input name='displayName'  onChange={ handleChange }  value={ values.displayName }  onBlur={ handleBlur }  placeholder={'display Name'} 
//             />
//             {errors.displayName && <Text color="red.300">{errors.displayName}</Text>}
//           </Box>
//           <Box>
//             <Text>Email</Text>
//             <Input  name='email' type="email" onChange={ handleChange }  value={ values.email }  onBlur={ handleBlur }  placeholder={'email'} 
//             />
//             {errors.email && <Text color="red.300">{errors.email}</Text>}
//           </Box>

//           <Box>
//             <Text>Password (Pa$$w0rd)</Text>
//             <Input name='password' onChange={ handleChange } value={ values.password } onBlur={ handleBlur } maxLength={40} placeholder={'contraseña'} 
//             />
//              {errors.password && <Text color="red.300">{errors.password}</Text>}
//           </Box>

//           { userStore.loading ? (
//             <Spinner />
//           ) : <Button colorScheme="twitter" onClick={() => handleSubmit()} type="submit" >Register</Button>}
        
//           <Text pt={2}>¿Ya tenes una cuenta? <Link href="/login">Login</Link></Text>

//         </Stack>
//       </form>
//     </Box>
//   )
// }


// export default observer(Register);

import { Box, Flex, Image, Stack, Heading, Text, Container, Input, Button, SimpleGrid, Avatar, AvatarGroup, useBreakpointValue, IconProps, Icon, Link, } from '@chakra-ui/react';
import I1 from "../../imgs/cover.png";

import { useFormik } from 'formik'
import * as yup from 'yup'
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../app/stores/store';




function Register() {
  const navigate = useNavigate();
  const {userStore} = useStore()

  const validationSchema = yup.object().shape({
    email: 
    yup.string().email()
      .required('campo obligatorio')
      .min(4, 'mínimo 4 caracteres'),
    userName: 
    yup.string()
      .required('campo obligatorio')
      .min(4, 'mínimo 4 caracteres')
      .max(24, 'máximo 24 caracteres'),
    displayName: yup.string()
      .required('campo obligatorio')
      .min(4, 'mínimo 4 caracteres')
      .max(24, 'máximo 24 caracteres'),
    password: yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
      
    passwordConfirmation: 
    yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
        
  })
  //userNNNName xq asi es la propr del ASP.net User = userName[mayuscula]
  const formik = useFormik({
    initialValues: {
      userName: "",
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values)
        const res = await userStore.register(values) //Toast y res en userStoreMOBX
        console.log(res, "obj o false")

        if (res) navigate("/")
      } catch (error) {
        console.log(error);
      }
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur} = formik
  return (
    <Box position={'relative'}>
      <Container as={SimpleGrid} maxW={'7xl'} columns={{ base: 1, md: 2 }} spacing={{ base: 10, lg: 32 }} py={{ base: 10, sm: 20, lg: 32 }}>
        {/* LEFT */}
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
           Connecting Fans, Artists, Bands
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
               &
            </Text>{' '}
            Businesses Owners
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <Image 
              src={I1} 
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              rounded={'2xl'}
              boxShadow={'2xl'} />
            {/* <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex> */}
          </Stack>
        </Stack>

        {/* RIGHT */}
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Register 
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
            </Text>
            <Blob
              w={'55%'}
              h={'60%'}
              position={'absolute'}
              top={'30%'}
              left={"40%"}
              zIndex={-1}
              color="red.200"
              // color={useColorModeValue('red.50', 'red.400')}
            />
          </Stack>
          
          <Box mt={10}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Input name="email" onChange={ handleChange }  value={ values.email } placeholder="Email" bg={'gray.100'} border={0} color={'gray.500'} _placeholder={{   color: 'gray.500', }}
                  />
                  {errors.email && <Text color="red.300">{errors.email}</Text>}
                </Box>
                
                <Box>
                  <Input name="password" onChange={ handleChange }  value={ values.password } placeholder="Password" bg={'gray.100'} border={0} color={'gray.500'} _placeholder={{   color: 'gray.500', }}
                  />
                  {errors.password && <Text color="red.300">{errors.password}</Text>}
                </Box>
                
                <Box>
                  <Input name="userName" onChange={ handleChange }  value={ values.userName } placeholder="Username" bg={'gray.100'} border={0} color={'gray.500'} _placeholder={{   color: 'gray.500', }}
                  />
                  {errors.userName && <Text color="red.300">{errors.userName}</Text>}
                </Box>
                <Box>
                  <Input name="displayName" onChange={ handleChange }  value={ values.displayName } placeholder="Displayname" bg={'gray.100'} border={0} color={'gray.500'} _placeholder={{   color: 'gray.500', }}
                  />
                  {errors.displayName && <Text color="red.300">{errors.displayName}</Text>}
                </Box>
              
              </Stack>
              <Button
                type="submit"
                fontFamily={'heading'}
                isLoading = {userStore.loading ? true : false}
                p={8}
                mt={12}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}>
                Register
              </Button>
            </form> 
            <Text pt={2}>¿Ya tenes una cuenta? <Link href="/login">Login</Link></Text>        
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={10}
        left={10}
        zIndex="-1"
        style={{ filter: 'blur(50px)' }}
      />
      
    </Box>
  );
}
export default observer(Register);

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
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