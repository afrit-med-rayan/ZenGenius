// components/Home/FeaturesSection.jsx
import { Box, Heading, Container, SimpleGrid } from '@chakra-ui/react';
import FeatureItem from './FeatureItem';
import { useColorModeValue } from '@chakra-ui/react';

function FeaturesSection() {
  return (
    <Box id="features" py={16} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="5xl">
        <Heading fontSize="3xl" mb={10} color="teal.600" textAlign="center">
          🔧 Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <FeatureItem title="Gemini API" desc="Summarize PDFs, explain concepts, generate flashcards, re-teach harder topics." />
          <FeatureItem title="MongoDB Atlas" desc="Store learning history, quiz scores, focus logs. Analyze what works best for you." />
          <FeatureItem title="Auth0" desc="Secure sign-in via Google/GitHub + MFA. Your data, safe and sound." />
          <FeatureItem title="Smart Insights" desc='Learn patterns like: "You retain better at 3PM" or "Take a break after 25 mins."' />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
