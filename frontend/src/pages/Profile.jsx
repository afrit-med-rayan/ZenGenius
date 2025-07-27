// Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from "@chakra-ui/react";
import AppNavbar from "../components/Common/AppNavbar";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchSessions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/study-session/${user.sub}`);
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to load sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user, isAuthenticated]);

  const totalFiles = sessions.length;
  const totalFlashcards = sessions.reduce((acc, session) => acc + (session.flashcards ? session.flashcards.split("Q:").length - 1 : 0), 0);

  return (
    <Box bg="gray.50" minH="100vh">
      <AppNavbar />

      <Container maxW="6xl" py={16}>
        <Heading fontSize="4xl" textAlign="center" color="teal.500" mb={8}>
          👤 Profile Overview
        </Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Stat>
              <StatLabel>Total Study Files</StatLabel>
              <StatNumber>{totalFiles}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Total Flashcards</StatLabel>
              <StatNumber>{totalFlashcards}</StatNumber>
            </Stat>

            <Stat>
              <StatLabel>Average Focus</StatLabel>
              <StatNumber>
                {sessions.length > 0 ? (sessions.reduce((a, b) => a + (b.focus || 0), 0) / sessions.length).toFixed(1) : 0}/10
              </StatNumber>
            </Stat>
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
