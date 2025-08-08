// Study.jsx - Modern 2025 Design
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  Text,
  HStack,
  VStack,
  useToast,
  useColorModeValue,
  Icon,
  Badge,
  Flex,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { FaBrain, FaHeart, FaRocket, FaCheckCircle } from "react-icons/fa";
import AppNavbar from "../components/Common/AppNavbar";
import GeminiUploader from "../components/GeminiUploader";
import FocusTracker from "../components/FocusTracker";
import { useAuth0 } from "@auth0/auth0-react";
import { sessionService } from "../services/sessionService";
import axios from "axios";

const moodOptions = [
  { emoji: "😴", label: "Tired", color: "gray", desc: "Low energy, need rest" },
  { emoji: "😐", label: "Okay", color: "yellow", desc: "Neutral, ready to work" },
  { emoji: "🙂", label: "Good", color: "green", desc: "Positive, motivated" },
  { emoji: "⚡", label: "Energized", color: "blue", desc: "High energy, peak focus" },
];

const Study = () => {
  const toast = useToast();
  const { user, isAuthenticated } = useAuth0();

  const [mood, setMood] = useState(null);
  const [focus, setFocus] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayStats, setTodayStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, neural.50)',
    'linear(to-br, gray.900, brand.900)'
  );

  // Fetch today's stats
  useEffect(() => {
    const fetchTodayStats = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        const sessions = await sessionService.getUserSessions(user.sub);
        const stats = sessionService.calculateStats(sessions);
        setTodayStats(stats);
      } catch (error) {
        console.error('Error fetching today stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayStats();
  }, [isAuthenticated, user]);

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) return;

    try {
      setIsSubmitting(true);
      await axios.post("http://localhost:5000/api/study-session", {
        userId: user.sub,
        mood,
        focus,
      });

      toast({
        title: "Session Started! 🎉",
        description: "Your study session has been logged successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      setMood(null);
      setFocus(5);
      
      // Refresh today's stats
      const sessions = await sessionService.getUserSessions(user.sub);
      const stats = sessionService.calculateStats(sessions);
      setTodayStats(stats);
    } catch (err) {
      console.error("Failed to save session", err);
      toast({
        title: "Oops! Something went wrong",
        description: "Could not save your session. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bgGradient={bgGradient} minH="100vh">
      <AppNavbar />

      <Container maxW="7xl" py={8}>
        {/* Header */}
        <VStack spacing={6} mb={12} textAlign="center">
          <HStack spacing={4}>
            <Box
              p={3}
              borderRadius="xl"
              bgGradient="linear(to-r, brand.400, neural.400)"
              color="white"
            >
              <Icon as={FaBrain} boxSize={6} />
            </Box>
            <VStack align="start" spacing={1}>
              <Heading
                fontSize={{ base: '2xl', md: '4xl' }}
                bgGradient="linear(to-r, brand.500, neural.500)"
                bgClip="text"
                fontWeight="800"
              >
                Study Space
              </Heading>
              <Text color="gray.500" fontSize="sm" fontWeight="500">
                Optimize your learning with AI-powered insights
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={8}>
          {/* Left Column - Session Setup */}
          <GridItem>
            <VStack spacing={6}>
              {/* Mood Tracker */}
              <Box
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(20px)"
                p={8}
                borderRadius="2xl"
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="xl"
                w="full"
              >
                <VStack spacing={6} align="stretch">
                  <HStack spacing={3}>
                    <Icon as={FaHeart} color="red.400" boxSize={5} />
                    <VStack align="start" spacing={0}>
                      <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                        How are you feeling?
                      </Heading>
                      <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.300")}>
                        Your mood affects learning efficiency
                      </Text>
                    </VStack>
                  </HStack>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    {moodOptions.map((option) => (
                      <Button
                        key={option.label}
                        onClick={() => setMood(option.label)}
                        variant={mood === option.label ? "solid" : "ghost"}
                        colorScheme={mood === option.label ? option.color : "gray"}
                        size="lg"
                        h="auto"
                        p={4}
                        borderRadius="xl"
                        flexDirection="column"
                        bg={mood === option.label ? undefined : "rgba(255, 255, 255, 0.5)"}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "lg",
                        }}
                        transition="all 0.2s"
                      >
                        <Text fontSize="2xl" mb={1}>
                          {option.emoji}
                        </Text>
                        <Text fontSize="sm" fontWeight="600">
                          {option.label}
                        </Text>
                        <Text fontSize="xs" color="gray.500" textAlign="center">
                          {option.desc}
                        </Text>
                      </Button>
                    ))}
                  </Grid>

                  {mood && (
                    <Box
                      p={4}
                      bg="green.50"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="green.200"
                    >
                      <HStack spacing={2}>
                        <Icon as={FaCheckCircle} color="green.500" />
                        <Text fontSize="sm" color="green.700" fontWeight="600">
                          Mood logged: {mood}
                        </Text>
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </Box>

              {/* Focus Tracker */}
              <Box
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(20px)"
                p={8}
                borderRadius="2xl"
                border="1px solid rgba(255, 255, 255, 0.2)"
                boxShadow="xl"
                w="full"
              >
                <FocusTracker 
                  focus={focus} 
                  setFocus={setFocus}
                  onFocusChange={(level) => {
                    console.log(`Focus level changed to: ${level}`);
                  }}
                />
              </Box>

              {/* Start Session Button */}
              <Button
                variant="gradient"
                size="lg"
                w="full"
                h="60px"
                leftIcon={<FaRocket />}
                isLoading={isSubmitting}
                loadingText="Starting Session..."
                onClick={handleSubmit}
                isDisabled={!mood || focus < 3}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "2xl",
                }}
                transition="all 0.2s"
              >
                {focus < 3 ? "Focus Too Low - Take a Break" : "Start Study Session"}
              </Button>
              
              {focus < 3 && (
                <Box
                  p={4}
                  bg="red.50"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="red.200"
                >
                  <Text fontSize="sm" color="red.700" textAlign="center">
                    💡 Tip: A focus level of at least 3/10 is recommended for effective studying
                  </Text>
                </Box>
              )}

              {/* Session Stats */}
              <Box
                bg={useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)")}
                backdropFilter="blur(10px)"
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)")}
              >
                <VStack spacing={3}>
                  <Text 
                    fontSize="sm" 
                    color={useColorModeValue("gray.600", "gray.300")} 
                    fontWeight="600"
                  >
                    Today's Progress
                  </Text>
                  {loading ? (
                    <Spinner size="sm" />
                  ) : (
                    <HStack spacing={6}>
                      <VStack spacing={1}>
                        <Text fontSize="2xl" fontWeight="800" color="brand.500">
                          {todayStats?.todaySessions || 0}
                        </Text>
                        <Text 
                          fontSize="xs" 
                          color={useColorModeValue("gray.500", "gray.400")}
                        >
                          Sessions
                        </Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text fontSize="2xl" fontWeight="800" color="neural.500">
                          {todayStats?.totalStudyTime?.toFixed(1) || 0}h
                        </Text>
                        <Text 
                          fontSize="xs" 
                          color={useColorModeValue("gray.500", "gray.400")}
                        >
                          Study Time
                        </Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text fontSize="2xl" fontWeight="800" color="zen.500">
                          {todayStats?.averageFocus || 0}
                        </Text>
                        <Text 
                          fontSize="xs" 
                          color={useColorModeValue("gray.500", "gray.400")}
                        >
                          Avg Focus
                        </Text>
                      </VStack>
                    </HStack>
                  )}
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column - PDF Uploader */}
          <GridItem>
            <Box
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(20px)"
              p={8}
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="xl"
              h="fit-content"
            >
              <GeminiUploader />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Study;
