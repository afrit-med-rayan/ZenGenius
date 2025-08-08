// Dashboard.jsx - Modern 2025 Design with Real Data
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Icon,
  Badge,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { FaBrain, FaChartLine, FaFire, FaClock, FaBookOpen } from "react-icons/fa";
import AppNavbar from "../components/Common/AppNavbar";
import FocusAnalytics from "../components/FocusAnalytics";
import { sessionService } from "../services/sessionService";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, neural.50)',
    'linear(to-br, gray.900, brand.900)'
  );

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchData = async () => {
      try {
        const sessionsData = await sessionService.getUserSessions(user.sub);
        const calculatedStats = sessionService.calculateStats(sessionsData);
        
        setSessions(Array.isArray(sessionsData) ? sessionsData : []);
        setStats(calculatedStats);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setSessions([]);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isAuthenticated]);

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
              <Icon as={FaChartLine} boxSize={6} />
            </Box>
            <VStack align="start" spacing={1}>
              <Heading
                fontSize={{ base: '2xl', md: '4xl' }}
                bgGradient="linear(to-r, brand.500, neural.500)"
                bgClip="text"
                fontWeight="800"
              >
                Study Dashboard
              </Heading>
              <Text color={useColorModeValue("gray.500", "gray.300")} fontSize="sm" fontWeight="500">
                Track your learning progress and insights
              </Text>
            </VStack>
          </HStack>
        </VStack>

        {loading ? (
          <VStack spacing={4}>
            <Spinner size="xl" color="brand.500" />
            <Text color={useColorModeValue("gray.600", "gray.300")}>
              Loading your study data...
            </Text>
          </VStack>
        ) : (
          <VStack spacing={8}>
            {/* Stats Overview */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
              <Card
                variant="elevated"
                bg={useColorModeValue("white", "gray.800")}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={3}>
                    <Icon as={FaBookOpen} boxSize={8} color="brand.500" />
                    <Stat>
                      <StatNumber fontSize="2xl" color="brand.500">
                        {stats?.totalSessions || 0}
                      </StatNumber>
                      <StatLabel fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
                        Total Sessions
                      </StatLabel>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                variant="elevated"
                bg={useColorModeValue("white", "gray.800")}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={3}>
                    <Icon as={FaClock} boxSize={8} color="neural.500" />
                    <Stat>
                      <StatNumber fontSize="2xl" color="neural.500">
                        {stats?.totalStudyTime?.toFixed(1) || 0}h
                      </StatNumber>
                      <StatLabel fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
                        Study Time
                      </StatLabel>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                variant="elevated"
                bg={useColorModeValue("white", "gray.800")}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={3}>
                    <Icon as={FaBrain} boxSize={8} color="zen.500" />
                    <Stat>
                      <StatNumber fontSize="2xl" color="zen.500">
                        {stats?.averageFocus || 0}
                      </StatNumber>
                      <StatLabel fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
                        Avg Focus
                      </StatLabel>
                      <StatHelpText>
                        <StatArrow type={stats?.focusTrend === 'improving' ? 'increase' : 'decrease'} />
                        {stats?.focusTrend || 'stable'}
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                variant="elevated"
                bg={useColorModeValue("white", "gray.800")}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={3}>
                    <Icon as={FaFire} boxSize={8} color="orange.500" />
                    <Stat>
                      <StatNumber fontSize="2xl" color="orange.500">
                        {stats?.totalFlashcards || 0}
                      </StatNumber>
                      <StatLabel fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
                        Flashcards
                      </StatLabel>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Focus Analytics */}
            <Box w="full">
              <FocusAnalytics sessions={sessions} />
            </Box>
            
            {/* Recent Study Sessions */}
            <Box w="full">
              <Heading 
                size="lg" 
                mb={6} 
                color={useColorModeValue("gray.700", "white")}
                textAlign="center"
              >
                📚 Recent Study Sessions
              </Heading>
              
              {sessions.length === 0 ? (
                <Card
                  variant="elevated"
                  bg={useColorModeValue("white", "gray.800")}
                  textAlign="center"
                  p={12}
                >
                  <VStack spacing={4}>
                    <Icon as={FaBookOpen} boxSize={12} color="gray.400" />
                    <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
                      No study sessions yet
                    </Text>
                    <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
                      Start your first study session to see your progress here!
                    </Text>
                  </VStack>
                </Card>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {sessions.slice(0, 6).map((session) => (
                    <Card
                      key={session._id}
                      variant="elevated"
                      bg={useColorModeValue("white", "gray.800")}
                      _hover={{ transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                    >
                      <CardHeader pb={2}>
                        <HStack justify="space-between">
                          <VStack align="start" spacing={1}>
                            <Heading size="sm" color={useColorModeValue("gray.700", "white")}>
                              {session.fileName || "Untitled Session"}
                            </Heading>
                            <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")}>
                              {new Date(session.date).toLocaleDateString()}
                            </Text>
                          </VStack>
                          <Badge 
                            colorScheme={session.focus >= 7 ? "green" : session.focus >= 4 ? "yellow" : "red"}
                            variant="subtle"
                          >
                            Focus: {session.focus || 0}/10
                          </Badge>
                        </HStack>
                      </CardHeader>

                      <CardBody pt={0}>
                        <VStack align="start" spacing={3}>
                          <HStack>
                            <Text fontSize="sm" fontWeight="600" color={useColorModeValue("gray.600", "gray.300")}>
                              Mood:
                            </Text>
                            <Badge colorScheme="blue" variant="subtle">
                              {session.mood || "N/A"}
                            </Badge>
                          </HStack>
                          
                          {session.summary && (
                            <Text 
                              fontSize="sm" 
                              color={useColorModeValue("gray.600", "gray.300")} 
                              noOfLines={3}
                            >
                              {session.summary.substring(0, 150)}...
                            </Text>
                          )}
                          
                          {session.flashcards && (
                            <HStack>
                              <Icon as={FaBrain} color="purple.500" boxSize={3} />
                              <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")}>
                                {(session.flashcards.match(/Q:/g) || []).length} flashcards generated
                              </Text>
                            </HStack>
                          )}
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
