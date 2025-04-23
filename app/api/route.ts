import { NextRequest, NextResponse } from 'next/server';
import { recognizeImage } from '../../lib/ollamaApi';
import { RecognitionResult } from '../../types';

export async function POST(request: NextRequest) {
  try {
    const { image, prompt, model } = await request.json();


    // Calling the api
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