// components/Home/FeatureItem.jsx
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

function FeatureItem({ title, desc }) {
  return (
    <Box p={5} bg={useColorModeValue('white', 'gray.700')} rounded="lg" shadow="md">
      <Heading fontSize="xl" mb={2} color="teal.500">{title}</Heading>
      <Text color="gray.600">{desc}</Text>
    </Box>
  );
}

export default FeatureItem;
