"use client";

import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useEffect, useRef, RefObject, useState, useCallback } from "react";
import { drawLandmarks, fingerPose } from "../utils/handUtils";

interface Point2D {
  x: number,
  y: number
}

export interface Finger {
  base: Point2D,
  joint1: Point2D,
  joint2: Point2D,
  tip: Point2D
}

const useHandDetection = (
  videoRef: RefObject<HTMLVideoElement | null>, 
  canvasRef: RefObject<HTMLCanvasElement | null>,
  stream: MediaStream | null
) => {
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const cooldownRef = useRef(Date.now())
  const animationRef = useRef<number | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ handLandmarker, setHandLandmarker ] = useState<HandLandmarker | null>(null);
  const [ handsDetected, setHandsDetected ] = useState<number>(0);
  const [ indexFinger, setIndexFinger ] = useState<Finger | null>(null);
  const [ fingerTipAngle, setFingerTipAngle ] = useState<number>(90);
  const [ isIndexStraight, setIsIndexStraight ] = useState<boolean>(false)
  const [ isInitialized, setIsInitialized ] = useState<boolean>(false)
  const [ hasDetectedOnce, setHasDetectedOnce ] = useState<boolean>(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeMediaPipe(); // sets up hand landmarker
        // await setupCamera();
        setIsInitialized(true);
      } catch (error) {
        console.error("App initialization failed:", error);
      }
    };
    
    initializeApp();
  }, [])

  const initializeMediaPipe = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2
        }); 
      // Saving the hand landmarker to state for later use.
      setHandLandmarker(handLandmarker); 
      handLandmarkerRef.current = handLandmarker;

    } catch (error) {
      console.error("Error initializing MediaPipe: ", error);
      setError("Error setting up MediaPipe: " + (error instanceof Error ? error.message : String(error)));
    }
  }

  // Setting up canvas
  const startDetection = () => {
    console.log('starting detection')
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Initiate detection loop
      detectHands();
    }
  }

  const detectHands = () => {
    // Detection Loop
    if (!handLandmarkerRef.current || !videoRef.current || !canvasRef.current) {
      // try again
      animationRef.current = requestAnimationFrame(detectHands);
      return;
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.readyState < 2 ) {
      animationRef.current = requestAnimationFrame(detectHands);
      return;
    }
    // Draw video frame to canvas
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Detect hands
    const results = handLandmarkerRef.current.detectForVideo(video, performance.now()) // could use performance.now() for more precision
    // Update count (used for drawing)
    setHandsDetected( results.landmarks ? results.landmarks.length : 0 )

    // Draw landmarks
    if (results.landmarks.length > 0 && ctx) {
      
      // Drawing connectors
      ctx.fillStyle = 'blue'
      results.landmarks.forEach(landmark => {
        drawLandmarks(ctx, landmark, canvas)
      })

      // Drawing index finger joints
      const fingerData = fingerPose(results.landmarks)
      if (fingerData?.indexFinger) {
        const { base, joint1, joint2, tip } = fingerData.indexFinger

        // Updates finger state, triggers thoughts if index finger is straight
        setIndexFinger(fingerData.indexFinger)

        setIsIndexStraight(fingerData.isIndexStraight)
        
        
        // Drawing index finger
        if (fingerData.isIndexStraight) {
          const fingerAngle = fingerData.fingerTipAngle(base, tip);
          ctx.fillStyle = "#FF5500"

          
          setFingerTipAngle(fingerAngle)
          setHasDetectedOnce(true); // finger has been pointed at least once; triggers removal of tutorial message
        } else {
          ctx.fillStyle = "#FFCC00"
        }
        const joints = [base, joint1, joint2, tip]
        joints.forEach(joint => {
          ctx.beginPath();
          ctx.arc(joint.x * canvas.width, joint.y * canvas.height, 4, 0, 2*Math.PI)
          ctx.fill();
          ctx.closePath();
        })
      }
    }
    // setIndexFinger(null)

    animationRef.current = requestAnimationFrame(detectHands);
  }

  // cleanup function
  const stopDetectHands = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  return {
    handsDetected,
    indexFinger,
    fingerTipAngle,
    isIndexStraight,
    isInitialized,
    startDetection,
    stopDetectHands,
    hasDetectedOnce,
  }

}

export default useHandDetection;