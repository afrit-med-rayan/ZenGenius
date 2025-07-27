// Study.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Divider,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import AppNavbar from "../components/Common/AppNavbar";
import GeminiUploader from "../components/GeminiUploader";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const moodOptions = [
  { emoji: "😴", label: "Tired" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
  { emoji: "⚡", label: "Energized" },
];

const Study = () => {
  const toast = useToast();
  const { user, isAuthenticated } = useAuth0();

  const [mood, setMood] = useState(null);
  const [focus, setFocus] = useState(5); // Default value
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        title: "Session logged!",
        description: "Mood and focus saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setMood(null);
      setFocus(5);
    } catch (err) {
      console.error("Failed to save session", err);
      toast({
        title: "Error",
        description: "Could not save session data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <AppNavbar />

      <Container maxW="6xl" py={16}>
        <Heading fontSize="4xl" textAlign="center" color="teal.500" mb={8}>
          🧘 Study Space
        </Heading>

        {/* === Mood & Focus UI === */}
        <Box
          bg="white"
          p={6}
          mb={8}
          rounded="xl"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="md"
        >
          <Heading size="md" mb={4}>
            How are you feeling today?
          </Heading>
          <HStack spacing={4} mb={6}>
            {moodOptions.map((option) => (
              <Button
                key={option.label}
                onClick={() => setMood(option.label)}
                fontSize="2xl"
                variant={mood === option.label ? "solid" : "ghost"}
                colorScheme={mood === option.label ? "teal" : "gray"}
              >
                {option.emoji}
              </Button>
            ))}
          </HStack>

          <Text mb={2}>How focused are you?</Text>
          <Slider
            aria-label="focus-slider"
            defaultValue={5}
            min={0}
            max={10}
            step={1}
            value={focus}
            onChange={(val) => setFocus(val)}
            mb={6}
          >
            <SliderTrack>
              <SliderFilledTrack bg="teal.400" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>

          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            onClick={handleSubmit}
            isDisabled={!mood}
          >
            Save Session
          </Button>
        </Box>

        {/* === Gemini Uploader === */}
        <Box
          bg="white"
          p={8}
          rounded="xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <GeminiUploader />
        </Box>

        <Divider mt={12} />
      </Container>
    </Box>
  );
};

export default Study;
