import { useEffect, useRef, RefObject, useState } from "react"

const useThoughtGeneration = (canvasRef: RefObject<HTMLCanvasElement | null>, isFingerStraight: boolean) => {
  const GENERATION_DEBOUNCE_TIME = 3000; // in ms
  const [ isThinking, setIsThinking ] = useState<boolean>(false);
  const [ thought, setThought ] = useState<string>('')
  const lastGenerationTime = useRef<number>(0); // time since last generation in ms so as to not overload

  useEffect(() => {
    if (isFingerStraight) {
      if ((lastGenerationTime.current - Date.now() > GENERATION_DEBOUNCE_TIME) && canvasRef) {
        generateThought();
      }
    }
  }, [ isFingerStraight ])

  const generateThought = async () => {
    if (isThinking) return;
    setIsThinking(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Take a screenshot of the canvas, and then send to gemini api
      const imageData = canvas.toDataURL('image/jpeg', 0.8) // lower quality for faster gemini processing

      const response = await fetch('api/describe-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          prompt: '' // placeholder for optional custom prompt later. 
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error, Failed to generate thought. status: ${response.status}`);
      }

      const data = await response.json();

      setThought(data.generatedText)
      console.log("### Data from thought generation hook: ", data.generatedText)

    } catch(error) {
      console.error("Error in generating thought: ", error)
    }

  }

  return {
    isThinking,
    thought,
    generateThought
  }
}

export default useThoughtGeneration;

