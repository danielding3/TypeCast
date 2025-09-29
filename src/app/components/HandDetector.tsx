"use client"

import useHandDetection from "@/app/hooks/useHandDetection"
import useThoughtGeneration from "@/app/hooks/useThoughtGeneration"
import { useEffect, useRef } from 'react'
import { AnimationStyles, useParticles } from "../utils/UIUtils"
import useDeviceAndCanvas from "@/app/hooks/useDeviceAndCanvas"
import useCamera from "@/app/hooks/useCamera"
import MainComponent from "./MainComponent"
// import DebugPanel from "./DebugPanel"


// Container component
const HandDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    stream,
    facingMode,
    // setFacingMode,
    handleToggleFacingMode,
    setupCamera,
    stopCamera
  } = useCamera();

  const { 
    handsDetected, 
    indexFinger, 
    isIndexStraight,
    fingerTipAngle,
    isInitialized,
    hasDetectedOnce,
    startDetection,
    stopDetectHands,
  } = useHandDetection(videoRef, canvasRef, stream);

  const { 
    isThinking, 
    thought, 
    // generateThought,
    resetPrompt,
    customPrompt,
    setCustomPrompt,
  } = useThoughtGeneration(canvasRef, isIndexStraight);

  const { 
    isMobile, 
    updateCanvasSize,
    canvasWidth,
    canvasHeight,
  } = useDeviceAndCanvas(videoRef, canvasRef);

  const {
    particles, 
    handleCreateDirectionalSparkleBurst
  } = useParticles(canvasRef)

  // useEffect(() => {
  //   console.log('Setting up camera')
  //   setupCamera()
  // },[facingMode])

  // Update size of canvas so it's suitable for video
  useEffect(() => {
    if (stream && videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        console.log("Video dimensions:", video.videoWidth, video.videoHeight);
        const aspectRatio = video.videoWidth / video.videoHeight;
        updateCanvasSize(aspectRatio);
        startDetection();
      };
      // Attaching stream to video element
      console.log('attaching stream')
      videoRef.current.srcObject = stream;

      video.addEventListener('loadeddata', handleLoadedData);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        stopDetectHands();
      };
    }
  }, [isInitialized, stream])



  return (
    <>
      <AnimationStyles />
      <MainComponent 
        canvasRef={canvasRef}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        videoRef={videoRef}
        isMobile={isMobile}
        facingMode={facingMode}
        // setFacingMode={setFacingMode}
        handleToggleFacingMode={handleToggleFacingMode}
        setupCamera={setupCamera}
        stopCamera={stopCamera}
        handsDetected={handsDetected}
        isThinking={isThinking}
        isIndexStraight={isIndexStraight}
        indexFinger={indexFinger}
        hasDetectedOnce={hasDetectedOnce}
        thought={thought}
        fingerTipAngle={fingerTipAngle}
        handleCreateDirectionalSparkleBurst={handleCreateDirectionalSparkleBurst}
        particles={particles}
        customPrompt={customPrompt}
        setCustomPrompt={setCustomPrompt}
        resetPrompt={resetPrompt}
      />
    </>
  );
}

export default HandDetector