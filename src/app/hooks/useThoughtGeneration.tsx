import { useEffect, useRef, RefObject, useState } from "react"
import { DEFAULT_PROMPT, NICE_PROMPT } from "../utils/prompts";

// const DEFAULT_PROMPT = `Stereotype the main person being pointed at in the scene in a witty, judgmental way. Use aspects of their appearance like their outfit, their physique, their hairstyle, their shoes, etc and craft a witty stereotype.\n
// Rules:
// Create a stereotypical judgement in 20 words or less.
// The stereotype must be intellectual, witty, and rude.
// The stereotype should be written in a SMS texting style, so use less punctuation and capitalization and keep the tone casual. Use ironic punctuation.
// Avoid over-usage of un-funny Gen-Z, TikTok or Soundcloud references.
// Prefer to talk about things OTHER than hairstyle, unless its directly noteable, e.g dyed or interesting hairstyle
// If needed, fixate on one specific trait
// Follow these examples for inspiration:
// 'He looks like he goes bouldering and makes it his identity.'
// 'He probably thinks he fits in at inner-west parties with that mullet.'
// 'She thinks her necklace makes her so mysterious and edgy.'
// `

const useThoughtGeneration = (
  canvasRef: RefObject<HTMLCanvasElement | null>, 
  isFingerStraight: boolean,
  // customPrompt: string
) => {
  const GENERATION_DEBOUNCE_TIME = 5000; // in ms
  const [ isThinking, setIsThinking ] = useState<boolean>(false);
  const [ thought, setThought ] = useState<string>('')
  const [ customPrompt, setCustomPrompt ] = useState<string>(DEFAULT_PROMPT)
  const lastGenerationTime = useRef<number>(0); // time since last generation in ms so as to not overload

  useEffect(() => {
    if (isFingerStraight) {
      if ((Date.now() - lastGenerationTime.current  > GENERATION_DEBOUNCE_TIME) && canvasRef) {
        generateThought(customPrompt);
      }
    }
  }, [ isFingerStraight ])

  const generateThought = async (customPrompt: string) => {
    if (isThinking) return;
    setIsThinking(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas || !(canvas.width > 0) || !(canvas.height > 0) ) return;
      // Take a screenshot of the canvas, and then send to gemini api
      const imageData = canvas.toDataURL('image/jpeg', 0.8) // lower quality for faster gemini processing

      const response = await fetch('api/describe-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          prompt: customPrompt || DEFAULT_PROMPT // Custom prompt
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error, Failed to generate thought. status: ${response.status}`);
      }

      const data = await response.json();
      setThought(data.generatedText)
      setIsThinking(false);
      console.log("### Data from thought generation hook: ", data.generatedText)

    } catch(error) {
      console.error("Error in generating thought: ", error)
    }
  }

  const changePrompt = (prompt:string) => {
    setCustomPrompt(prompt)
  }


  return {
    isThinking,
    thought,
    changePrompt,
    customPrompt,
    generateThought
  }
}

export default useThoughtGeneration;

