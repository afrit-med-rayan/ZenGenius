import axios from "axios";

const GEMINI_API_KEY = 'AIzaSyCYO5Gb8UeGiFGdevSGhAJIN0GyI5DGui8';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function getFlashcardsFromPDF(text) {
  const prompt = `Turn this study content into flashcards:\n\n${text}`;
  const response = await axios.post(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    contents: [{ parts: [{ text: prompt }] }]
  });
  return response.data;
}
