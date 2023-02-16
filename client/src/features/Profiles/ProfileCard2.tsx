import { chakra, Box, Stack, Link, HStack, Text, Container, Icon, Avatar, Tooltip, Divider, useColorModeValue} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { AiFillGithub } from 'react-icons/ai';
import { Profile } from '../../app/models/Interfaces';
import FollowButton from './FollowButton';

interface Props {
  profile : Profile
}
const ProfileCard2:React.FC<Props> = ({profile}:Props) => {
  return (
    <Container maxW="5xl" p={{ base: 3, md: 4  }}>
      <Stack w={{ base: "17rem", xs: "15rem"  }} spacing={2} p={4} border="1px solid" borderColor={useColorModeValue('gray.400', 'gray.600')} rounded="md" margin="0 auto"
        _hover={{
          boxShadow: useColorModeValue(
            '0 4px 6px rgba(160, 174, 192, 0.6)',
            '0 4px 6px rgba(9, 17, 28, 0.4)'
          )
        }}
      >
        <HStack justifyContent="space-between" alignItems="baseline">
          <Tooltip label="Lahore, Pakistan" aria-label="Lahore, Pakistan" placement="right-end" size="sm"
            // Sizes for Tooltip are not implemented in the default theme. You can extend the theme to implement them
          >
            <Box pos="relative">
              <Avatar
                // src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                src={profile.image}
                name="Muhammad Ahmad"
                size="xl"
                borderRadius="md"
              />
              <Avatar
                // src="https://flagcdn.com/pk.svg"
                src="https://images.vexels.com/media/users/3/184267/isolated/preview/8ec63d26d98d295993e1b29d341f1502-icono-de-notas-de-musica-transmitida.png"
                name="Pakistan Flag"
                size="xs"
                borderRadius="full"
                pos="absolute"
                bottom={0}
                right="-12px"
              />
            </Box>
          </Tooltip>
          <Link isExternal href="https://github.com/MA-Ahmad">
            <Icon as={AiFillGithub} w={6} h={6} />
          </Link>
        </HStack>
        <chakra.h1 fontSize="xl" fontWeight="bold">
          {profile.displayName}
        </chakra.h1>
        <Text fontSize="md" color="gray.500">
          {profile.following}
          Followers: {profile.followersCount} |
          Following: {profile.followingsCount}
          {/* {profile.displayName ? profile.displayName : "Software Engineer, Creator of TemplatesKart"}  */}
        </Text>
        <Divider />
        <Text fontSize="md" color="gray.500">
          {profile.bio ? profile.bio : "Musice & Sport lover ⚽️, exercise addict 🏋 and lifelong learner 👨🏻‍💻"} 
        </Text>
        <Divider />
        <FollowButton perfil={profile} />
      </Stack>
    </Container>
  );
};

export default ProfileCard2;