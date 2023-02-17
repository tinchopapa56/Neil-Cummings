import { Heading, Button, Text, Input, Stack, Divider, Box, FormControl, FormLabel, GridItem, Select } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useStore } from '../../../app/stores/store'

 function ActivityFilters() {
  const {activityStore} = useStore()
  const [filter, setFilter] = useState()

  const handleSelector = (e: any) => {
    console.log(e)
    setFilter(e.target.value)
    console.log(filter)
  }
  const formik = useFormik({
    initialValues: {category:"",},
    onSubmit: () => {
      console.log("filter");
    },
  })

  const {errors, values, handleChange, handleSubmit, handleBlur} = formik
  
  return (
    <Box ml={{base:0, lg: 4, xl: 4}}>
      <Heading textAlign={"center"} my={6} as="h2">Events</Heading>
      {/* <Stack direction={{base: "column",lg:"row",xl:"row"}}> */}
      <Stack direction={"column"}>
        
        {/* All - Musicians - Events */}

        <Stack w="xs" bg="white" boxShadow={"sm"} divider={<Divider />}>
          {[{name:"ALL",action:"all"}, {name:"GOING",action:"isGoing"} ,{name:"HOSTING",action:"isHost"}].map(filter => (

            <Box p={2} borderRadius="sm" cursor="pointer" _hover={{bg:"green.100"}}>
              <Text  onClick={() => activityStore.setPredicate(filter.action, 'true')}>
                {filter.name}
              </Text>
            </Box>

          ))}
        </Stack>

        <Stack w="xs" bg="white" boxShadow={"sm"} divider={<Divider />}>
          {["city" ,"date"].map(filter => (
            <FormControl p={2} as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor={filter}
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: 'gray.50',
                }}>
                {filter}
              </FormLabel>
              <Select
                id={filter}
                name={filter}
                autoComplete={filter}
                placeholder="Select option"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md">
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </Select>
          </FormControl>
          ))}
          <FormControl as={GridItem} colSpan={[6, 3]} py={4} fontSize={"xl"} mt="2%">
              <FormLabel htmlFor="category" fontWeight="normal" color="gray.700">
                Category
              </FormLabel>
              <Select id="category" autoComplete="category" placeholder="Select Category" focusBorderColor="brand.400" shadow="sm" size="xl" w="full" rounded="md"
              name="category" value={values.category}  onChange={handleChange}>
                <option value="drinks">drinks</option>
                <option value="culture">culture</option>
                <option value="music">music</option>
                <option value="food">food</option>
                <option value="travel">travel</option>
              </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  )
}

export default observer(ActivityFilters)

{/* <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item 
                    content='All Activites' 
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="I'm going" 
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                />
                <Menu.Item 
                    content="I'm hosting" 
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')}    
                />
            </Menu>
            <Header />
            <Calendar 
                onChange={(date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            /> */}