import { Grid } from '@chakra-ui/react'

import Conversations from '../components/profile page/Conversations'
import Follow from '../components/profile page/Follow'
import Info from '../components/profile page/Info'

export default function ProfileInfo() {
  return (
    <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
      <Info title={"Profile Information"}
        description={"Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."}
        name={"Esthera Jackson"}
        mobile={"(44) 123 1234 123"}
        email={"esthera@simmmple.com"}
        location={"United States"} 
      />
        <Conversations />
        <Follow />
    </Grid>
  )
}
