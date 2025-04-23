import { NextRequest, NextResponse } from 'next/server';
import { recognizeImage } from '../../lib/ollamaApi';
import { RecognitionResult } from '../../types';

export async function POST(request: NextRequest) {
  try {
    const { image, prompt, model } = await request.json();

    // if (!image) {
    //   return NextResponse.json(
    //     { success: false, error: 'No image provided' },
    //     { status: 400 }
    //   );
    // }

    // Call Ollama API with the image
    const description = await recognizeImage(
      image,
      prompt || 'Describe what you see in this image',
      model || 'gemma3:4B'
    );

    const result: RecognitionResult = {
      success: true,
      description,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in recognize API:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 