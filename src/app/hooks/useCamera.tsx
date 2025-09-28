import { useState, useEffect, useCallback } from 'react'
import { FacingMode } from '@/types'

const useCamera = () => {
  const [ error, setError ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean | null>(null)
  const [ stream, setStream ] = useState<MediaStream | null>(null)
  const [ facingMode, setFacingMode ] = useState<FacingMode>('environment')


    // Setting up camera stream
    // Wrapped in a useCallback to prevent recreation of function reference 
    // Every time a parent component re-renders with hand detection frames.
    const setupCamera = useCallback(async () => {
      setIsLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          { video: { facingMode: facingMode} }
        )
        setStream(stream);
        setIsLoading(false);
      } catch (err) {
        setError("Camera access failed: " + (err instanceof Error ? err.message : String(err)))
        setIsLoading(false);
      }
    },[facingMode]) //update function when facingmode changes
    const stopCamera = useCallback(() => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    },[stream]) // needs to be aware when the stream changes to stop the right stream

    // cleanup on unmount, e.g user navs to a diff route, tab, or parent is unmounted
    useEffect(() => {
      return stopCamera;
    }, [stopCamera])

    return {
      stream,
      isLoading,
      error,
      facingMode,
      setFacingMode,
      setupCamera,
      stopCamera
    }
}

export default useCamera