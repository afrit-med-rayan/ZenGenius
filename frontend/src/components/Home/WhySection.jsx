// components/Home/WhySection.jsx
import { Box, Heading, Container, SimpleGrid } from '@chakra-ui/react';
import FeatureItem from './FeatureItem';

function WhySection() {
  return (
    <Box id="why" py={16}>
      <Container maxW="5xl">
        <Heading fontSize="3xl" mb={10} color="teal.600" textAlign="center">
          💼 Why It Wins
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <FeatureItem title="Full-Stack Power" desc="AI + Auth + DB = A real-world, impressive project." />
          <FeatureItem title="Recruiter Magnet" desc="Put this on GitHub or your CV. It screams 'I know what I'm doing'." />
          <FeatureItem title="AI-Powered" desc="Gemini helps users AND powers insights. Not just a tool — a brain." />
          <FeatureItem title="Scalable Vision" desc="This can become a real product. Keep building after the hackathon!" />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default WhySection;
