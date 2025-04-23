'use client';

import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

import { RecognitionResult } from '../types';

export default function WebcamCapture() {

  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      setResult(null);
      setError(null);
    }
  }, [webcamRef]);

  const resetCapture = () => {
    setImgSrc(null);
    setResult(null);
    setError(null);
  };

  const recognizeImage = async () => {
    if (!imgSrc) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post<RecognitionResult>('/api', {
        image: imgSrc,
        prompt: 'Describe what you see in this image in detail.'
      });

      if (response.data.success && response.data.description) {
        setResult(response.data.description);
      } 

    } 
    catch (err) {

      setError('Failed to process');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 relative">
        {!imgSrc ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg border-1 border-gray-600"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: 'user',
            }}
          />

        ) : (
          <div className="relative">
            <img src={imgSrc} alt="Captured" className="rounded-lg" />
          </div>
        )}
      </div>

      <div className="flex space-x-3 mb-6">
        {!imgSrc ? (
          <button
            onClick={capture}
            className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded"
          >
            Capture Photo
          </button>
        ) : (
          <>
            <button
              onClick={resetCapture}
              className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded"
            >
              Retake Photo
            </button>
            <button
              onClick={recognizeImage}
              disabled={isLoading}
              className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded" 

            >
              {isLoading ? 'Processing...' : 'Recognize Objects'}
            </button>
          </>
        )}
      </div>

      {isLoading && (
        <div className="text-center mb-4">
          <p className="text-gray-600">Analyzing image...</p>
          <p className="text-gray-600">may take upto 20 seconds</p>
        </div>
      )}

      {/* {error && (
        <div className=" text-center mb-4 p-3 bg-red-100 text-red-700 rounded">
          <p>
            {error}

          </p>
        </div>
      )} */}

      {result && (
        <div className="p-4 bg-gray-100 rounded-lg max-w-2xl">
          <h3 className="text-lg text-black font-semibold mb-2">Result</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
} 