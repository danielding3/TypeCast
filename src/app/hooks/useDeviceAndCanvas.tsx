'use client'

import { RefObject, useState, useEffect } from 'react'

// hook to get properties of device and canvas
// returns isMobile
// adjusts canvas size as well
const useDeviceAndCanvas = (
  videoRef:RefObject<HTMLVideoElement | null>, 
  canvasRef:RefObject<HTMLCanvasElement | null>
) => {
  // encapsulate so state can be reused. 
  const [ isMobile, setIsMobile ] = useState<boolean>(false);
  const [ canvasHeight, setCanvasHeight ] = useState<number>(480);
  const [ canvasWidth, setCanvasWidth ] = useState<number>(640)

  useEffect(() => {
    function checkIsMobile() {
      // True if the window is at the most 767px wide
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      console.log("mobile?: ", mobile)
      setIsMobile(mobile)
      if (videoRef.current) {
        updateCanvasSize(videoRef.current.videoWidth/videoRef.current.videoHeight)
      }
    }
    window.addEventListener('resize', checkIsMobile)
    checkIsMobile();

    return () => window.removeEventListener('resize', checkIsMobile)
  },[videoRef])

  const updateCanvasSize = (aspectRatio : number) => {
    console.log('updating canvas size')
    const pixelRatio = window.devicePixelRatio || 1; // scales for retina displays
    const containerWidth = document.querySelector('.canvas-container')?.clientWidth || window.innerWidth; 
    const windowHeight = window.innerHeight;
    console.log("containerwidth: ", containerWidth)
    // Set maximum dimensions 
    const maxWidth = Math.min(containerWidth, isMobile ? 640 : 960)
    const maxHeight = isMobile ? windowHeight * 0.7 : windowHeight * 0.8

    // Find ideal dimensions based on AR
    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio
    }

    if (width > containerWidth) {
      width = containerWidth;
      height = width / aspectRatio
    }
    if (!height) {
      height = maxHeight;
    }

    console.log(`final width - [${width}] | height - [ ${height} ]`)

    const displayWidth = Math.round(width);
    const displayHeight = Math.round(height);

    const canvasWidth = displayWidth * pixelRatio;
    const canvasHeight = displayHeight * pixelRatio;

    if (canvasRef.current) {
      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;
      // Set CSS display size
      canvasRef.current.style.width = `${displayWidth}px`;
      canvasRef.current.style.height = `${displayHeight}px`;
    
      
      // Scale drawing context for high-DPI
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.scale(pixelRatio, pixelRatio);
      }
    }

    // Maintain natural aspect ratio
    // Roiunding for subpixel rendering issues
    setCanvasWidth(Math.round(width));
    setCanvasHeight(Math.round(height));
  }


  return {
    isMobile,
    updateCanvasSize,
    canvasHeight,
    canvasWidth,
  }
};

export default useDeviceAndCanvas;