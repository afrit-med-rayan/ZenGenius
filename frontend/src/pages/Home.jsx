// pages/Home.jsx - Modern 2025 Professional Landing Page
import { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  Flex,
  useColorModeValue,
  keyframes,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { 
  FaBrain, 
  FaRocket, 
  FaArrowRight, 
  FaStar,
  FaChartLine,
  FaLightbulb,
  FaGraduationCap,
  FaUsers,
  FaShieldAlt,
  FaMoon,
  FaSun,
  FaGithub,
  FaTwitter
} from 'react-icons/fa';
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

function Home() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();

  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, neural.50, zen.50)',
    'linear(to-br, gray.900, brand.900, neural.900)'
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/study');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: FaBrain,
      title: "AI-Powered Summarization",
      description: "Transform any PDF into concise, intelligent summaries using Google Gemini Pro",
      color: "brand"
    },
    {
      icon: FaLightbulb,
      title: "Smart Flashcards",
      description: "Automatically generate interactive flashcards from your study materials",
      color: "neural"
    },
    {
      icon: FaChartLine,
      title: "Focus Analytics",
      description: "Track your focus levels and optimize your study sessions with data-driven insights",
      color: "zen"
    },
    {
      icon: FaGraduationCap,
      title: "Personalized Learning",
      description: "Adaptive learning paths that adjust to your progress and learning style",
      color: "focus"
    }
  ];

  const stats = [
    { number: "10k+", label: "PDFs Processed", icon: FaBrain },
    { number: "50k+", label: "Flashcards Created", icon: FaLightbulb },
    { number: "95%", label: "Study Efficiency", icon: FaChartLine },
    { number: "1k+", label: "Happy Students", icon: FaUsers }
  ];

  return (
    <Box bgGradient={bgGradient} minH="100vh" position="relative" overflow="hidden">
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

      {/* Navigation */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
      >
        <Container maxW="7xl">
          <Flex align="center" justify="space-between" py={4}>
            {/* Logo */}
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="xl"
                bgGradient="linear(to-r, brand.400, neural.400)"
                color="white"
              >
                <FaBrain size="20" />
              </Box>
              <VStack spacing={0} align="start">
                <Heading 
                  fontSize="xl" 
                  bgGradient="linear(to-r, brand.500, neural.500)"
                  bgClip="text"
                  fontWeight="800"
                >
                  ZenGenius
                </Heading>
                <Text fontSize="xs" color="gray.500" fontWeight="500">
                  AI Study Assistant
                </Text>
              </VStack>
            </HStack>

            <Spacer />

            {/* Navigation Links */}
            <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
              <Text 
                fontSize="sm" 
                fontWeight="600" 
                color="gray.600"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Features
              </Text>
              <Text 
                fontSize="sm" 
                fontWeight="600" 
                color="gray.600"
                cursor="pointer"
                _hover={{ color: "brand.500" }}
                onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Stats
              </Text>
            </HStack>

            {/* Auth Buttons */}
            <HStack spacing={3}>
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loginWithRedirect()}
                    _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    rightIcon={<FaArrowRight />}
                    onClick={() => loginWithRedirect()}
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <Button
                  variant="gradient"
                  size="sm"
                  rightIcon={<FaArrowRight />}
                  onClick={() => navigate('/study')}
                >
                  Go to App
                </Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxW="6xl" pt={32} pb={20} position="relative" zIndex={1}>
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
              Study Smarter
              <br />
              <Text as="span" position="relative">
                with AI
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
          <HStack spacing={4}>
            <Button
              variant="gradient"
              size="lg"
              rightIcon={<FaRocket />}
              onClick={() => loginWithRedirect()}
              animation={`${glow} 2s ease-in-out infinite`}
              _hover={{
                transform: 'translateY(-2px) scale(1.05)',
              }}
            >
              Start Learning Free
            </Button>
            <Button
              variant="glass"
              size="lg"
              leftIcon={<FaBrain />}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Features
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Stats Section */}
      <Container maxW="6xl" py={20} id="stats">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
          {stats.map((stat, index) => (
            <Card key={index} variant="glass">
              <CardBody textAlign="center" py={8}>
                <VStack spacing={4}>
                  <Box
                    p={4}
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.2)"
                  >
                    <Icon as={stat.icon} boxSize={6} color="white" />
                  </Box>
                  <VStack spacing={1}>
                    <Text fontSize="3xl" fontWeight="900" color="white">
                      {stat.number}
                    </Text>
                    <Text fontSize="sm" color="gray.200" fontWeight="500">
                      {stat.label}
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Container maxW="6xl" py={20} id="features">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              bgGradient="linear(to-r, brand.500, neural.500)"
              bgClip="text"
            >
              Powerful Features
            </Heading>
            <Text
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="2xl"
            >
              Everything you need to revolutionize your study experience
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Card key={index} variant="glass" _hover={{ transform: 'translateY(-4px)' }}>
                <CardBody p={8}>
                  <VStack spacing={6} align="start">
                    <Box
                      p={4}
                      borderRadius="xl"
                      bg={`${feature.color}.100`}
                      color={`${feature.color}.500`}
                    >
                      <Icon as={feature.icon} boxSize={8} />
                    </Box>
                    <VStack spacing={3} align="start">
                      <Heading size="lg" color="white">
                        {feature.title}
                      </Heading>
                      <Text color="gray.200" lineHeight="1.6">
                        {feature.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Container maxW="4xl" py={20}>
        <Card variant="glass">
          <CardBody p={12} textAlign="center">
            <VStack spacing={8}>
              <VStack spacing={4}>
                <Heading
                  fontSize={{ base: '2xl', md: '4xl' }}
                  fontWeight="800"
                  color="white"
                >
                  Ready to Transform Your Learning?
                </Heading>
                <Text fontSize="lg" color="gray.200" maxW="2xl">
                  Join thousands of students who are already studying smarter with ZenGenius
                </Text>
              </VStack>
              
              <Button
                variant="gradient"
                size="lg"
                rightIcon={<FaArrowRight />}
                onClick={() => loginWithRedirect()}
                _hover={{
                  transform: 'translateY(-2px) scale(1.05)',
                }}
              >
                Get Started Now - It's Free
              </Button>
              
              <Text fontSize="sm" color="gray.400">
                No credit card required • Start in 30 seconds
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </Container>

      {/* Footer */}
      <Box py={12} borderTop="1px solid rgba(255, 255, 255, 0.1)">
        <Container maxW="6xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              <Box
                p={2}
                borderRadius="lg"
                bgGradient="linear(to-r, brand.400, neural.400)"
                color="white"
              >
                <FaBrain size="16" />
              </Box>
              <Text color="gray.400" fontSize="sm" fontWeight="600">
                © 2025 ZenGenius. All rights reserved.
              </Text>
            </HStack>
            
            <HStack spacing={4}>
              <IconButton
                icon={<FaGithub />}
                variant="ghost"
                size="sm"
                color="gray.400"
                _hover={{ color: "white" }}
                aria-label="GitHub"
              />
              <IconButton
                icon={<FaTwitter />}
                variant="ghost"
                size="sm"
                color="gray.400"
                _hover={{ color: "white" }}
                aria-label="Twitter"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
