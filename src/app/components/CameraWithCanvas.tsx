"use client"
import { useRef, useEffect, useState } from 'react';

const CameraWithCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ error, setError ] = useState<string | null>(null);
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment"}
    })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // We'll create a canvas with the same dimensions as the video stream
        videoRef.current.onloadedmetadata = () => { // when dimensions of the video are known
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (canvas && video) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            drawLoop();
          } 
        }
      }
    })
    .catch(error => setError(error.message))
  }, [])

  const drawLoop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video &&canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 100, 0, 2 * Math.PI);
        ctx.fill();
      }
      requestAnimationFrame(drawLoop);
    }
  }

  return (
    <div>
      { error && <p className="text-red-500">Camera Error: {error}</p>}
      <video
        ref={videoRef} // attaching a ref to stream directly to srcObject
        autoPlay
        playsInline
        className="w-full rounded-lg hidden"
      />
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg hidden"
      />
    </div>
  )
}

export default CameraWithCanvas;