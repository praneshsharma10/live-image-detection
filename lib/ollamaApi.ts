import axios from 'axios';
import { OllamaRequest, OllamaResponse } from '../types';

const OLLAMA_API = 'http://localhost:11434/api/generate'; 

const DEFAULT_MODEL = 'gemma3:4b'; // You can change this to any vision model you have

export async function recognizeImage(
  imageBase64: string,

  prompt: string = 'Describe what you see in this image.',
  model: string = DEFAULT_MODEL
): Promise<string> {
  try {

    const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    const requestData: OllamaRequest = {
      model,
      prompt,
      images: [base64Data],
      stream: false,
    };

    const response = await axios.post<OllamaResponse>(
      OLLAMA_API,
      requestData
    );

    return response.data.response;
  } catch (error) {
    console.error('Error-API', error);
    throw new Error('api-error');
  }
} 