import { Box, Center, FormControl, Heading } from "@chakra-ui/react";
import LoginForm from "@user/components/LoginForm";

export default function Connexion() {
  return (
    <Center>
      <Box>
        <Heading mb={'1.5rem'}>Connexion</Heading>
        <LoginForm />
      </Box>
    </Center>
  );
};
