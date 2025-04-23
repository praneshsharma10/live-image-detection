# Live Image Recognition with Next.js and Ollama

This is a full-stack Next.js application that uses your webcam to capture images and analyze them using a local Ollama vision model.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Ollama](https://ollama.ai/) installed and running locally
- A vision-capable model pulled in Ollama (e.g., llava:latest, llama3-vision, moondream)

## Setup Ollama

1. Install Ollama by following the instructions at [https://ollama.ai/](https://ollama.ai/)
2. Pull a vision-capable model:
   ```bash
   ollama pull llava:latest
   # or
   ollama pull llama3-vision
   # or
   ollama pull moondream
   ```
3. Make sure Ollama is running on your machine (it should run on http://localhost:11434)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Use

1. Allow camera access when prompted by your browser
2. Click the "Capture Photo" button to take a photo
3. Click "Recognize Objects" to send the image to Ollama for analysis
4. View the AI-generated description of your image

## Configuration

- The default model is set to `llava:latest`. You can change this in `lib/ollamaApi.ts`
- The API endpoint for Ollama is set to `http://localhost:11434/api/generate`. Adjust this if your Ollama instance is running elsewhere

## Troubleshooting

- If you encounter CORS issues, make sure your Ollama server is configured to accept requests from your Next.js app
- If the webcam doesn't appear, check that you've granted camera permissions in your browser
- If the AI doesn't respond, ensure that Ollama is running and that you've pulled a vision-capable model

## Technologies Used

- Next.js with TypeScript
- React Webcam for camera access
- Axios for API calls
- Tailwind CSS for styling
- Ollama for local AI vision model inference
