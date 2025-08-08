import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
  Spinner,
  Divider,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import {
  FaFilePdf,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";


const FlashCard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onClick={() => setFlipped(!flipped)}
      cursor="pointer"
      bg="white"
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      minH="140px"
      textAlign="center"
      transition="all 0.3s ease"
      transform={flipped ? "rotateY(180deg)" : "rotateY(0deg)"}
      transformStyle="preserve-3d"
      border="2px solid"
      borderColor={flipped ? "purple.200" : "gray.200"}
      _hover={{ 
        boxShadow: "2xl", 
        transform: flipped ? "rotateY(180deg) translateY(-4px)" : "translateY(-4px)",
        borderColor: flipped ? "purple.300" : "teal.300"
      }}
      position="relative"
      overflow="hidden"
    >
      {/* Card indicator */}
      <Box
        position="absolute"
        top="2"
        right="2"
        w="8px"
        h="8px"
        borderRadius="full"
        bg={flipped ? "purple.400" : "teal.400"}
        transition="all 0.3s ease"
      />
      
      {/* Question/Answer content */}
      <VStack spacing={3} justify="center" h="full">
        <Text 
          fontSize="xs" 
          color={flipped ? "purple.500" : "teal.500"} 
          fontWeight="bold" 
          textTransform="uppercase"
          letterSpacing="wide"
        >
          {flipped ? "Answer" : "Question"}
        </Text>
        <Text 
          fontWeight="semibold" 
          color="gray.800"
          fontSize="sm"
          lineHeight="1.4"
        >
          {flipped ? answer : question}
        </Text>
      </VStack>
      
      {/* Click hint */}
      <Text 
        position="absolute"
        bottom="2"
        left="50%"
        transform="translateX(-50%)"
        fontSize="xs"
        color="gray.400"
        fontStyle="italic"
      >
        Click to {flipped ? "flip back" : "reveal"}
      </Text>
    </Box>
  );
};


const parseFlashcards = (raw) => {
  const lines = raw.split("\n").filter((line) => line.trim() !== "");
  const flashcards = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("Q:") && lines[i + 1]?.startsWith("A:")) {
      flashcards.push({
        question: lines[i].replace("Q:", "").trim(),
        answer: lines[i + 1].replace("A:", "").trim(),
      });
      i++; 
    }
  }

  return flashcards;
};

const GeminiUploader = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data);
      toast({
        title: "Summarized successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <Box
        position="relative"
        p={8}
        borderRadius="2xl"
        bg="gradient-to-br from-teal.50 to-blue.50"
        border="2px dashed"
        borderColor={file ? "teal.400" : "gray.300"}
        transition="all 0.3s ease"
        _hover={{
          borderColor: "teal.400",
          bg: "gradient-to-br from-teal.100 to-blue.100",
          transform: "translateY(-2px)",
          boxShadow: "xl"
        }}
        cursor="pointer"
        onDrop={(e) => {
          e.preventDefault();
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
            setResponse(null);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
      >
        <VStack spacing={6}>
          <Box
            p={6}
            borderRadius="full"
            bg={file ? "teal.100" : "gray.200"}
            transition="all 0.3s ease"
          >
            <Icon 
              as={file ? FaCheckCircle : FaCloudUploadAlt} 
              boxSize={12} 
              color={file ? "teal.500" : "gray.500"}
            />
          </Box>

          <VStack spacing={2} textAlign="center">
            <Heading size="lg" color="teal.600">
              {file ? "📄 File Ready!" : "📄 Upload Your Study Material"}
            </Heading>
            
            {file ? (
              <VStack spacing={2}>
                <HStack spacing={2} align="center">
                  <Icon as={FaFilePdf} color="red.500" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    {file.name}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                </Text>
              </VStack>
            ) : (
              <VStack spacing={2}>
                <Text fontSize="lg" color="gray.600">
                  Drag & drop your PDF here, or click to browse
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Supports PDF files up to 10MB
                </Text>
              </VStack>
            )}
          </VStack>

          <HStack spacing={4}>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              opacity="0"
              cursor="pointer"
              zIndex="1"
            />
            
            {!file && (
              <Button
                leftIcon={<FaCloudUploadAlt />}
                colorScheme="teal"
                size="lg"
                variant="outline"
                bg="white"
                _hover={{ bg: "teal.50" }}
                pointerEvents="none"
              >
                Choose File
              </Button>
            )}
            
            {file && (
              <HStack spacing={3}>
                <Button
                  leftIcon={<FaCloudUploadAlt />}
                  colorScheme="teal"
                  size="lg"
                  onClick={handleUpload}
                  isLoading={loading}
                  loadingText="Processing with AI..."
                  boxShadow="lg"
                  _hover={{ transform: "translateY(-1px)", boxShadow: "xl" }}
                >
                  Analyze with AI
                </Button>
                
                <Button
                  variant="ghost"
                  colorScheme="gray"
                  onClick={() => {
                    setFile(null);
                    setResponse(null);
                  }}
                >
                  Remove
                </Button>
              </HStack>
            )}
          </HStack>

          {/* Progress indicator */}
          {loading && (
            <VStack spacing={3} w="full">
              <HStack spacing={2}>
                <Spinner size="sm" color="teal.500" />
                <Text fontSize="sm" color="teal.600" fontWeight="medium">
                  AI is analyzing your document...
                </Text>
              </HStack>
              <Box w="full" bg="gray.200" borderRadius="full" h="2">
                <Box
                  bg="gradient-to-r from-teal.400 to-blue.400"
                  h="2"
                  borderRadius="full"
                  animation="pulse 2s infinite"
                  w="60%"
                />
              </Box>
            </VStack>
          )}
        </VStack>
      </Box>

      {loading && (
        <HStack justify="center" mt={4}>
          <Spinner size="lg" />
          <Text>Analyzing with Gemini...</Text>
        </HStack>
      )}

      {response?.summary && (
        <Box
          p={8}
          borderRadius="2xl"
          bg="white"
          boxShadow="2xl"
          border="1px solid"
          borderColor="gray.100"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative background */}
          <Box
            position="absolute"
            top="0"
            right="0"
            w="200px"
            h="200px"
            bg="gradient-to-bl from-teal.100 to-transparent"
            borderRadius="full"
            transform="translate(50%, -50%)"
            opacity="0.5"
          />
          
          <VStack spacing={6} align="stretch" position="relative">
            <HStack spacing={4} align="center">
              <Box
                p={3}
                borderRadius="full"
                bg="green.100"
                border="2px solid"
                borderColor="green.200"
              >
                <Icon as={FaCheckCircle} color="green.500" boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Heading size="lg" color="teal.600">
                  ✨ AI Summary Generated
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Powered by Google Gemini Pro
                </Text>
              </VStack>
            </HStack>

            <Divider borderColor="gray.200" />

            <Box
              bg="gradient-to-br from-gray.50 to-blue.50"
              p={8}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              color="gray.800"
              fontSize="md"
              lineHeight="1.8"
              whiteSpace="pre-wrap"
              maxH="500px"
              overflowY="auto"
              boxShadow="inner"
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#c1c1c1',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#a1a1a1',
                },
              }}
            >
              {response.summary.replace(/\*{1,2}/g, "")}
            </Box>
          </VStack>

          {response?.fileUrl && (
            <>
              <HStack mt={8} spacing={4} justify="space-between">
                <Button
                  leftIcon={<FaExternalLinkAlt />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => window.open(response.fileUrl, "_blank")}
                >
                  Open PDF in New Tab
                </Button>
              </HStack>

              <Box mt={6}>
                <iframe
                  src={response.fileUrl}
                  title="PDF Viewer"
                  width="100%"
                  height="600px"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </>
          )}

          {/* 🧠 Flashcards */}
          {response?.flashcards && (
            <Box
              mt={8}
              p={8}
              bg="gradient-to-br from-purple.50 to-pink.50"
              borderRadius="2xl"
              border="1px solid"
              borderColor="purple.200"
              position="relative"
              overflow="hidden"
            >
              {/* Decorative background */}
              <Box
                position="absolute"
                bottom="0"
                left="0"
                w="150px"
                h="150px"
                bg="gradient-to-tr from-purple.100 to-transparent"
                borderRadius="full"
                transform="translate(-50%, 50%)"
                opacity="0.6"
              />
              
              <VStack spacing={6} align="stretch" position="relative">
                <HStack spacing={4} align="center">
                  <Box
                    p={3}
                    borderRadius="full"
                    bg="purple.100"
                    border="2px solid"
                    borderColor="purple.200"
                  >
                    <Text fontSize="2xl">🧠</Text>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color="purple.600">
                      Interactive Flashcards
                    </Heading>
                    <Text fontSize="sm" color="purple.500">
                      Click any card to reveal the answer
                    </Text>
                  </VStack>
                </HStack>

                <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                  {parseFlashcards(response.flashcards).map((fc, idx) => (
                    <FlashCard key={idx} question={fc.question} answer={fc.answer} />
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default GeminiUploader;
