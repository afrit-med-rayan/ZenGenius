// components/Home/BonusSection.jsx
import { Box, Heading, Container, SimpleGrid } from '@chakra-ui/react';
import FeatureItem from './FeatureItem';

function BonusSection() {
  return (
    <Box id="bonus" py={16} bg="gray.900">
      <Container maxW="5xl">
        <Heading fontSize="3xl" mb={10} color="teal.400" textAlign="center">
          🔥 Bonus Ideas
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <FeatureItem title="Daily Boost Mode ☀️" desc="Quote + meditation + custom AI tip based on your logs." />
          <FeatureItem title="Slide Uploader 📁" desc="Upload lecture notes — Gemini turns them into quizzes." />
          <FeatureItem title="Smart Flashcards 🧠" desc="Adapts to what you struggle with and repeats it later." />
          <FeatureItem title="Voice Journal 🎙️" desc="Log your voice, analyze your mood/emotion with NLP." />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default BonusSection;
