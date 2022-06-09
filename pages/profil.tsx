import { Box, Center, Heading } from "@chakra-ui/react";

import ProfileForm from "@user/components/ProfileForm";

export default function Profile() {
  return (
    <Center>
      <Box>
        <Heading mb={'1.5rem'}>Profil</Heading>
        <ProfileForm />
      </Box>
    </Center>
  );
};
