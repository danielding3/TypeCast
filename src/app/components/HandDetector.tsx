"use client"

import useHandDetection from "@/app/hooks/useHandDetection"
import useThoughtGeneration from "@/app/hooks/useThoughtGeneration"
import { useRef, useState } from 'react'

const HandDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ debug, setDebug ] = useState<boolean>(false)

  const { handsDetected, indexFinger, isIndexStraight } = useHandDetection(videoRef, canvasRef);
  const { isThinking, thought, generateThought} = useThoughtGeneration(canvasRef, isIndexStraight)

  const debugClickHandler = () => {
    if (!debug) {
      setDebug(true);
    } else {
      setDebug(false);
    }
  }
  return (
    <>
      <button className="text-sm p-4" onClick={() => debugClickHandler()}>debug</button>
      <video ref={videoRef} autoPlay playsInline className="hidden"/>
      <canvas ref={canvasRef} className="w-full max-w-4xl rounded-lg"/>
      {/* Debug Panel */}
      <div className="bg-white-50 text-green-500 max-w-4xl h-auto p-4 m-4">
        {debug && 
          <div>
            <p className="font-bold">Index Finger Properties: </p>
            <p>Tip X Coordinate: {indexFinger?.tip.x}</p>
            <p>Tip Y Coordinate: {indexFinger?.tip.y}</p>
            <p className="font-bold">Is Index Straight?</p>
            <p>{isIndexStraight ? "Yes" : "No"}</p>
          </div>
        }
        <div className="font-bold">
          <p>{isThinking ? 'Thinking...' : ''}</p>
          <p>{thought}</p>
        </div>
      </div>
    </>
  );
}

export default HandDetector