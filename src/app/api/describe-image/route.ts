import { NextRequest } from "next/server"
import { google } from '@ai-sdk/google';
import { generateText, streamText } from "ai"


// Note: Gemini API key is automatically read from .env.local

/**
 * 
 * @param request 
 * @returns {String} Generated Thought
*/
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const image = body.image
    const prompt = body.prompt
    if (!image) {
      return Response.json({ error: 'No image provided'}, { status: 400 })
    }
    // Since imageFile is already base64, we just need to remove the prefix
    const base64Image = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
    const messages = [
      {
        role: 'user' as const,
        content: [

          {
            type: 'text' as const,
            text: prompt
          },
          { 
            type: 'image' as const,
            image: base64Image
          }
        ]
      }
    ]
    const safetySettings = [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_NONE",
      },
    ];

    const systemRules = `CRITICAL RULES:
- NEVER mention hands, mediapipe, tracking, pointing, gestures, or camera interactions
- WHAT TO DO: Focus on visible details like clothing, facial features, hairstyle, body type, general vibes, or setting`

    const { text } = await generateText({
      model: google("models/gemini-2.5-flash-lite"),
      messages: messages,
      system: systemRules,
      temperature: 1.5,
      providerOptions: {
        google: {
          safetySettings: safetySettings
        }
      }
    })

    // for await (const textPart of textStream) {
    //   fullText += textPart
    // }
    
    return Response.json({ 
      message: "Google API Response",
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