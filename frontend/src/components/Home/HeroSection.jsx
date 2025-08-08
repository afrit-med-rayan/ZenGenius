// components/Home/HeroSection.jsx - Modern 2025 Design
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Container, 
  Button,
  Badge,
  Icon,
  useColorModeValue,
  keyframes,
  Flex,
} from '@chakra-ui/react';
import { FaBrain, FaRocket, FaArrowRight, FaStar } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(24, 144, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(24, 144, 255, 0.6); }
`;

function HeroSection() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, neural.50, zen.50)',
    'linear(to-br, gray.900, brand.900, neural.900)'
  );

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Elements */}
      <Box
        position="absolute"
        top="10%"
        right="10%"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="brand.200"
        opacity="0.3"
        animation={`${float} 6s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="5%"
        w="60px"
        h="60px"
        borderRadius="full"
        bg="neural.200"
        opacity="0.4"
        animation={`${float} 4s ease-in-out infinite reverse`}
      />
      <Box
        position="absolute"
        top="30%"
        left="15%"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="zen.200"
        opacity="0.2"
        animation={`${float} 8s ease-in-out infinite`}
      />

      <Container maxW="6xl" py={32} position="relative" zIndex={1}>
        <VStack spacing={12} textAlign="center">
          {/* Badge */}
          <Badge
            variant="subtle"
            colorScheme="brand"
            px={4}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
          >
            <HStack spacing={2}>
              <Icon as={FaStar} />
              <Text>Powered by Google Gemini Pro</Text>
            </HStack>
          </Badge>

          {/* Main Heading */}
          <VStack spacing={6}>
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="900"
              lineHeight="1.1"
              bgGradient="linear(to-r, brand.500, neural.500, zen.500)"
              bgClip="text"
              textAlign="center"
            >
              Your AI-Powered
              <br />
              <Text as="span" position="relative">
                Learning Coach
                <Box
                  position="absolute"
                  top="-10px"
                  right="-20px"
                  animation={`${float} 3s ease-in-out infinite`}
                >
                  🧠
                </Box>
              </Text>
            </Heading>

            <Text
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="3xl"
              lineHeight="1.6"
              fontWeight="500"
            >
              Transform any PDF into interactive flashcards and summaries. 
              Track your focus, optimize your study sessions, and learn smarter with AI.
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <VStack spacing={4}>
            {isAuthenticated && user ? (
              <VStack spacing={4}>
                <HStack
                  spacing={4}
                  p={6}
                  bg="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(10px)"
                  borderRadius="2xl"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                >
                  <Box
                    w="50px"
                    h="50px"
                    borderRadius="full"
                    bg="zen.400"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    👋
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="lg" fontWeight="700" color="gray.700">
                      Welcome back, {user.name?.split(' ')[0]}!
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Ready to continue your learning journey?
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={4}>
                  <Button
                    variant="gradient"
                    size="lg"
                    rightIcon={<FaArrowRight />}
                    onClick={() => navigate('/study')}
                    animation={`${glow} 2s ease-in-out infinite`}
                    _hover={{
                      transform: 'translateY(-2px) scale(1.05)',
                    }}
                  >
                    Start Studying
                  </Button>
                  <Button
                    variant="glass"
                    size="lg"
                    leftIcon={<FaBrain />}
                    onClick={() => navigate('/dashboard')}
                  >
                    View Dashboard
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <HStack spacing={4}>
                <Button
                  variant="gradient"
                  size="lg"
                  rightIcon={<FaRocket />}
                  onClick={() => navigate('/study')}
                  animation={`${glow} 2s ease-in-out infinite`}
                  _hover={{
                    transform: 'translateY(-2px) scale(1.05)',
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  leftIcon={<FaBrain />}
                >
                  Watch Demo
                </Button>
              </HStack>
            )}

            {/* Stats */}
            <HStack
              spacing={8}
              pt={8}
              opacity={0.8}
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              <VStack spacing={1}>
                <Text fontWeight="700" fontSize="lg">10k+</Text>
                <Text>PDFs Processed</Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontWeight="700" fontSize="lg">50k+</Text>
                <Text>Flashcards Created</Text>
              </VStack>
              <VStack spacing={1}>
                <Text fontWeight="700" fontSize="lg">95%</Text>
                <Text>Study Efficiency</Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default HeroSection;
