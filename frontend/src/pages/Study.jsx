import React from "react";
import { Box, Container, Heading, Divider } from "@chakra-ui/react";
import AppNavbar from "../components/Common/AppNavbar";
import GeminiUploader from "../components/GeminiUploader";

const Study = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      <AppNavbar />

      <Container maxW="6xl" py={16}>
        <Heading fontSize="4xl" textAlign="center" color="teal.500" mb={8}>
          🧘 Study Space
        </Heading>

        <Box
          bg="white"
          p={8}
          rounded="xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <GeminiUploader />
        </Box>

        <Divider mt={12} />
      </Container>
    </Box>
  );
};

export default Study;
