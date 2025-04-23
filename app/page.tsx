import Image from "next/image";
import WebcamCapture from '../components/WebcamCapture';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
        <div className="flex flex-col items-center text-center w-full">
          <h1 className="text-3xl font-bold mb-4">Live Image Recognition</h1>
          <p className="mb-8 text-gray-400 max-w-2xl">

            Capture an image with your webcam and have it analyzed by a local Ollama vision model.
            Make sure you have Ollama running with a vision model (gemma3:4B in my case) installed.
          </p>
          
          <WebcamCapture />
        </div>
      </div>
    </main>
  );
}
