// FocusTracker.jsx - Enhanced Focus Level Component
import React from 'react';
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Badge,
  VStack,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { FaBrain, FaLightbulb, FaBolt, FaFire } from 'react-icons/fa';

const focusLevels = {
  1: { label: 'Very Low', color: 'red', icon: FaBrain, desc: 'Consider taking a break or doing light review' },
  2: { label: 'Very Low', color: 'red', icon: FaBrain, desc: 'Consider taking a break or doing light review' },
  3: { label: 'Low', color: 'orange', icon: FaLightbulb, desc: 'Good for reviewing familiar material' },
  4: { label: 'Low', color: 'orange', icon: FaLightbulb, desc: 'Good for reviewing familiar material' },
  5: { label: 'Medium', color: 'yellow', icon: FaBolt, desc: 'Perfect for moderate study sessions' },
  6: { label: 'Medium', color: 'yellow', icon: FaBolt, desc: 'Perfect for moderate study sessions' },
  7: { label: 'Good', color: 'green', icon: FaFire, desc: 'Great for learning new concepts' },
  8: { label: 'Good', color: 'green', icon: FaFire, desc: 'Great for learning new concepts' },
  9: { label: 'Excellent', color: 'teal', icon: FaFire, desc: 'Ideal for challenging material' },
  10: { label: 'Excellent', color: 'teal', icon: FaFire, desc: 'Ideal for challenging material' },
};

const FocusTracker = ({ focus, setFocus, onFocusChange }) => {
  const currentLevel = focusLevels[focus];

  const handleFocusChange = (value) => {
    setFocus(value);
    if (onFocusChange) {
      onFocusChange(value);
    }
  };

  const getFocusRecommendation = (level) => {
    if (level <= 2) {
      return {
        message: "Your focus is quite low. Consider taking a 10-minute break, having some water, or doing light stretching.",
        action: "Take a break first",
        color: "red.500"
      };
    } else if (level <= 4) {
      return {
        message: "Your focus is low. This is perfect for reviewing flashcards or familiar material.",
        action: "Review mode recommended",
        color: "orange.500"
      };
    } else if (level <= 6) {
      return {
        message: "You have moderate focus. Good for general study sessions and PDF summarization.",
        action: "Standard study session",
        color: "yellow.500"
      };
    } else if (level <= 8) {
      return {
        message: "Great focus level! Perfect for learning new concepts and creating detailed flashcards.",
        action: "Deep learning mode",
        color: "green.500"
      };
    } else {
      return {
        message: "Excellent focus! This is ideal for tackling challenging material and complex topics.",
        action: "Challenge mode activated",
        color: "teal.500"
      };
    }
  };

  const recommendation = getFocusRecommendation(focus);

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          How focused are you right now?
        </Text>
        <HStack>
          <Icon as={currentLevel.icon} color={`${currentLevel.color}.500`} />
          <Badge colorScheme={currentLevel.color} fontSize="sm">
            {currentLevel.label}
          </Badge>
        </HStack>
      </HStack>

      <Box px={2}>
        <Slider
          aria-label="focus-level-slider"
          value={focus}
          onChange={handleFocusChange}
          min={1}
          max={10}
          step={1}
          colorScheme={currentLevel.color}
        >
          <SliderTrack bg="gray.200" h="8px">
            <SliderFilledTrack bg={`${currentLevel.color}.400`} />
          </SliderTrack>
          <Tooltip 
            label={`${focus}/10 - ${currentLevel.label}`} 
            placement="top" 
            isOpen={true}
            bg={`${currentLevel.color}.500`}
          >
            <SliderThumb boxSize={6} bg={`${currentLevel.color}.500`}>
              <Icon as={currentLevel.icon} color="white" boxSize={3} />
            </SliderThumb>
          </Tooltip>
        </Slider>
      </Box>

      <HStack justify="space-between" fontSize="xs" color="gray.500">
        <Text>1 - Very Low</Text>
        <Text>5 - Medium</Text>
        <Text>10 - Excellent</Text>
      </HStack>

      <Box 
        bg={`${currentLevel.color}.50`} 
        border="1px solid" 
        borderColor={`${currentLevel.color}.200`}
        p={4} 
        rounded="lg"
      >
        <VStack align="start" spacing={2}>
          <Text fontSize="sm" color={`${currentLevel.color}.700`} fontWeight="medium">
            {currentLevel.desc}
          </Text>
          <Box 
            bg={recommendation.color} 
            color="white" 
            px={3} 
            py={1} 
            rounded="full" 
            fontSize="xs"
            fontWeight="bold"
          >
            💡 {recommendation.action}
          </Box>
          <Text fontSize="xs" color="gray.600">
            {recommendation.message}
          </Text>
        </VStack>
      </Box>

      {focus <= 3 && (
        <Box 
          bg="red.50" 
          border="1px solid" 
          borderColor="red.200" 
          p={3} 
          rounded="lg"
        >
          <Text fontSize="sm" color="red.700" fontWeight="medium">
            ⚠️ Low Focus Warning
          </Text>
          <Text fontSize="xs" color="red.600" mt={1}>
            Consider improving your focus before starting a study session for better results.
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default FocusTracker;