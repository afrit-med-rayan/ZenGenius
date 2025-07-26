// components/Home/HeroSection.jsx
import { Heading, Text, VStack, Container, Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <Container maxW="5xl" py={20} centerContent>
      <VStack spacing={6} textAlign="center">
        <Heading fontSize={{ base: '3xl', md: '5xl' }} color="teal.500">
          Your AI-Powered Learning Coach 🧠✨
        </Heading>
        <Text fontSize="xl" color="gray.600">
          ZenGenius adapts to your mind. Study smarter, learn deeper, avoid burnout — all in one app.
        </Text>

        {isAuthenticated && user ? (
          <>
            <Text fontSize="lg" color="teal.600">👋 Welcome back, {user.name}</Text>
            <Button colorScheme="teal" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          </>
        ) : (
          <Button colorScheme="teal" size="lg" onClick={() => navigate('/profile')}>
            Get Started
          </Button>
        )}
      </VStack>
    </Container>
  );
}

export default HeroSection;
