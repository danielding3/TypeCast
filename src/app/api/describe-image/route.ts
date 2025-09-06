import { NextRequest } from "next/server"
import { google } from '@ai-sdk/google';
import { generateText, streamText } from "ai"


const DEFAULT_PROMPT = "Stereotype the main person in the scene in a witty, judgmental way. Use aspects of their appearance like their clothing, their physique, their hairstyle, their shoes, etc and craft a unique gen-z appeasing roast.\
Rules:\
Create a stereotypical judgement in 20 words or less.\
Ignore all details about hands, tracking, and fingers.\
The judgment must be intellectual, witty, and rude.\
The judgement should be written in a SMS texting style, so use less punctuation and capitalization.\
Avoid too much useage of un-funny TikTok or Soundcloud references.\
Hyperfixate on one specific trait and mention it directly in the roast.\
Examples:\
He probably thinks he fits in at inner-west parties with that mullet.\
"


// Note: Gemini API key is automatically read from .env.local

/**
 * 
 * @param request 
 * @returns {String} Generated Thought
*/
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('api body: ', body)
    const image = body.image
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
            text: DEFAULT_PROMPT
          },
          { 
            type: 'image' as const,
            image: base64Image
          }
        ]
      }
    ]

    const { text } = await generateText({
      model: google("models/gemini-2.5-flash-lite"),
      messages: messages,
      })

    // for await (const textPart of textStream) {
    //   fullText += textPart
    // }
    
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