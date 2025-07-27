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
} from "@chakra-ui/react";
import { FaFilePdf, FaCheckCircle, FaCloudUploadAlt, FaExternalLinkAlt } from "react-icons/fa";

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
        p={8}
        borderRadius="xl"
        bg="gray.100"
        border="1px solid"
        borderColor="gray.300"
      >
        <Heading size="lg" mb={6} textAlign="center" color="teal.600">
          📄 Upload and Summarize Your Study Material
        </Heading>

        <HStack spacing={4} justify="center">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            p={1}
            variant="unstyled"
            border="none"
          />
          <Button
            leftIcon={<FaCloudUploadAlt />}
            colorScheme="teal"
            onClick={handleUpload}
            isLoading={loading}
            loadingText="Summarizing..."
          >
            Upload & Summarize
          </Button>
        </HStack>

        {file && (
          <HStack mt={4} spacing={2} justify="center">
            <Icon as={FaFilePdf} color="red.500" />
            <Text fontSize="sm" fontWeight="medium">
              {file.name}
            </Text>
          </HStack>
        )}
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
          borderRadius="xl"
          bg="white"
          boxShadow="xl"
          border="1px solid"
          borderColor="gray.200"
        >
          <HStack mb={4} spacing={3}>
            <Icon as={FaCheckCircle} color="green.500" boxSize={5} />
            <Heading size="lg" color="teal.600">
              ✨ Gemini Summary
            </Heading>
          </HStack>

          <Divider mb={6} />

          <Box
            bg="gray.50"
            p={6}
            borderRadius="md"
            color="gray.800"
            fontSize="md"
            lineHeight="1.75"
            whiteSpace="pre-wrap"
            maxH="400px"
            overflowY="auto"
          >
            {/* Remove ugly markdown-style formatting */}
            {response.summary.replace(/\*{1,2}/g, "")}
          </Box>

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
        </Box>
      )}
    </VStack>
  );
};

export default GeminiUploader;
