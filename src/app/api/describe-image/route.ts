import { NextRequest } from "next/server"
import { google } from '@ai-sdk/google';
import { generateText } from "ai"

const DEFAULT_PROMPT = "In 10 words, describe to me what love is."

// Note: Gemini API key is automatically read from .env.local

/**
 * 
 * @param request 
 * @returns {String} Generated Thought
*/
export async function POST(request: NextRequest) {
  try {
    // const formData = await request.formData();
    // console.log('API - formData: ', formData);
    // const imageFile = formData.get('image')

    const { text } = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt: DEFAULT_PROMPT
      })
    
    return Response.json({ 
      message: "Testing Google API Response",
      generatedText: text,
    })
  } catch (error) {
    console.log("Error in API: ", error)
    return Response.json(
      { error: "Internal service error" },
      { status: 500 }
    )
  }
}