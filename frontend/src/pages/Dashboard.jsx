// Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import AppNavbar from "../components/Common/AppNavbar";
import FocusAnalytics from "../components/FocusAnalytics";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchSessions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/study-session/${user.sub}`);
        const data = Array.isArray(res.data) ? res.data : [];
        setSessions(data);
      } catch (err) {
        console.error("Failed to load sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user, isAuthenticated]);

  return (
    <Box bg="gray.50" minH="100vh">
      <AppNavbar />
      <Container maxW="6xl" py={16}>
        <Heading fontSize="4xl" textAlign="center" color="teal.500" mb={8}>
          📚 Your Study Dashboard
        </Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : (
          <VStack spacing={8}>
            {/* Focus Analytics */}
            <FocusAnalytics sessions={sessions} />
            
            {/* Study Sessions */}
            <Box w="full">
              <Heading size="lg" mb={6} color="teal.600">📚 Recent Study Sessions</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {sessions.map((session) => (
                  <Card
                    key={session._id}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    p={4}
                  >
                    <CardHeader>
                      <Heading size="md">{session.fileName || "Untitled"}</Heading>
                      <Text fontSize="sm" color="gray.500">
                        {new Date(session.date).toLocaleDateString()}
                      </Text>
                    </CardHeader>

                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Text><strong>Mood:</strong> {session.mood || "N/A"}</Text>
                        <Text><strong>Focus:</strong> {session.focus || 0}/10</Text>
                        <Text noOfLines={6}>
                          <strong>Summary:</strong> {session.summary || "No summary available."}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
