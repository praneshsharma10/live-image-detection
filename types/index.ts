export interface RecognitionResult {
  success: boolean;
  message?: string;
  description?: string;
  error?: string;
}


export interface OllamaRequest {
  model: string;
  prompt: string;
  images?: string[];
  stream?: boolean;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
} 