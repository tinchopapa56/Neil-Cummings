import React, { useState } from 'react';
import { Progress, Box, ButtonGroup, Button, Heading, Text, Flex, FormControl, FormLabel, Input,Image, Select, SimpleGrid, InputLeftAddon, InputGroup, Textarea, FormHelperText, InputRightElement, Stack, Container,
} from '@chakra-ui/react';

import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Activity, ActivityFormValues } from '../../../app/models/Interfaces';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import {v4 as uuidv4} from "uuid";

interface Props {
  setProgress: (params: any) => void
}
export const Form1:React.FC<Props> = ({setProgress}:Props) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);



  const navigate = useNavigate();
  const {activityStore} = useStore()
  const { id } = useParams<{ id: string }>();

  const [initialACT, setinitialACT] = useState<ActivityFormValues>(new ActivityFormValues());

  useEffect(() => {
    if (id) activityStore.loadActivity(id).then(activity => setinitialACT(new ActivityFormValues(activity)))
  }, [id, activityStore.loadActivity,]);

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
})

  const formik = useFormik({
    initialValues: initialACT,
    validationSchema,
    onSubmit: async (activity: ActivityFormValues) => {
      try {
        activity.id =  uuidv4();
        activity.date = new Date(activity.date!)
        console.log(activity);

        const res = await activityStore.createAct(values) //Toast y res en userStoreMOBX
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur} = formik
  return (
    <form onSubmit={handleSubmit}>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Create Event
      </Heading>

      <Flex py={2} fontSize={"xl"} wrap="wrap" justify={"space-between"}>
        {["title","city", "category", "venue"].map(field => ( 
            <FormControl key={field} py={2} w={{xl:"20rem",lg: "20rem", md: "13rem"}} mr="5%">
                <FormLabel htmlFor={field} fontWeight={'normal'}>
                   {field}
                </FormLabel>
                <Input name={field} value={values.field} onChange={ handleChange } id={field} placeholder={field} onClick={() => setProgress(33.33)} />
                {errors.field && <Text color="rec.300">{errors.field}</Text>}
            </FormControl>
          )
        )}
      </Flex>


      <FormControl onClick={() => setProgress(66.66)} py={4} fontSize={"xl"} mt="2%">
        <FormLabel htmlFor="description" fontWeight={'normal'}>
          Description
        </FormLabel>
        <Textarea id="description" p={4} value={values.description} onChange={handleChange} placeholder='Description' size='xl'
        />
        <FormHelperText>Usually includes information about the payment/ ticket options, technical specs of the venue, etc...</FormHelperText>
      </FormControl>

      <FormControl py={4} fontSize={"xl"} mt="2%">
        <FormLabel htmlFor="date" fontWeight={'normal'}>
          Date
        </FormLabel>
        <Input 
            onClick={() =>  setProgress(85)}
            id="date"
            name="date"
            type="date"
            p={4}
            value={values.date?.toString()}
            onChange={handleChange}
            placeholder='Date'
            size='xl'
        />
        <FormHelperText>Usually includes information about the payment/ ticket options, technical specs of the venue, etc...</FormHelperText>
      </FormControl>

      {/* <Button onClick={() => console.log("ehh: ", values)} colorScheme="teal"> dsdadasdale</Button> */}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Stack justify="flex-end" direction="row" spacing={2}>
                <Button w="7rem" p={4} bg={'red.300'} color={'white'} _hover={{   bg: "blue.500", }}>
                    Cancel
                </Button>
                <Button onClick={() =>  setProgress(99.99)} type="submit" w="7rem" p={4} bg={'green.300'} color={'white'} _hover={{   bg: 'green.500', }}>
                    Create Act
                </Button>
            </Stack>
          </Flex>
        </ButtonGroup>
    </form>
  );
};

export default function ActivityForm() {
  const [progress, setProgress] = useState(1);

  return (
    // <Container maxWidth="1680px">
    //   <Stack p={8} spacing={0} justify="flex-start" align="flex-start" direction={{ base: 'column-reverse', md: 'row' }}>

    //     <Flex display={{base:"none", xl:"flex"}} flex={1} justify="flex-start" align="flex-start">
    //       <Image alt="bandify" objectFit="cover" src={I1} />
    //     </Flex>
      <>
        <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={800} p={6} m="5% auto">
          <Progress
            hasStripe
            value={progress}
            // value={50}
            colorScheme='green'
            mb="5%"
            mx="5%"
            isAnimated
          >
          </Progress>
          
          <Form1 setProgress={setProgress} />
          
        </Box>
      </>
  );
}

//SELECT SELECTOR

// <FormControl as={GridItem} colSpan={[6, 3]}>
//         <FormLabel
//           htmlFor="country"
//           fontSize="sm"
//           fontWeight="md"
//           color="gray.700"
//           _dark={{
//             color: 'gray.50',
//           }}>
//           Country / Region
//         </FormLabel>
//         <Select
//           id="country"
//           name="country"
//           autoComplete="country"
//           placeholder="Select option"
//           focusBorderColor="brand.400"
//           shadow="sm"
//           size="sm"
//           w="full"
//           rounded="md">
//           <option>United States</option>
//           <option>Canada</option>
//           <option>Mexico</option>
//         </Select>
//       </FormControl>