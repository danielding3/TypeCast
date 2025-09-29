import { useState, useEffect, useCallback, useRef } from 'react'
import { FacingMode } from '@/types'

const useCamera = () => {
  const [ error, setError ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean | null>(null)
  // const [ stream, setStream ] = useState<MediaStream | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [ facingMode, setFacingMode ] = useState<FacingMode>('environment')

  const handleToggleFacingMode = () => {
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(newFacingMode);
  }


  // Setting up camera stream
  // Wrapped in a useCallback to prevent recreation of function reference 
  // Every time a parent component re-renders with hand detection frames.
  const setupCamera = useCallback(async () => {
    stopCamera();
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { video: { facingMode: { ideal: facingMode }} }
      )
      streamRef.current = stream;
      setIsLoading(false);
    } catch (err) {
      setError("Camera access failed: " + (err instanceof Error ? err.message : String(err)))
      setIsLoading(false);
    }
  },[facingMode]) //update function when facingMode changes - ie it's recreated. 


  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null ;
    }
  },[streamRef]) // needs to be aware when the stream changes to stop the right stream

  // cleanup on unmount, e.g user navs to a diff route, tab, or parent is unmounted
  useEffect(() => {
    return stopCamera;
  }, [stopCamera])

  useEffect(() => {
    setupCamera()
    
  },[facingMode, setupCamera])


  return {
    stream:streamRef.current,
    isLoading,
    error,
    facingMode,
    // setFacingMode,
    handleToggleFacingMode,
    setupCamera,
    stopCamera
  }
}

export default useCamera