'use client'

import { useEffect, CSSProperties, RefObject} from "react";
import { Finger } from '@/app/hooks/useHandDetection'
// import { handleCreateDirectionalSparkleBurst } from "@/app/utils/UIUtils";

const ThoughtBubble = (
  {
    handsDetected,
    isThinking,
    isIndexStraight,
    indexFinger,
    hasDetectedOnce,
    thought,
    isMobile,
    fingerTipAngle,
    canvasRef,
    handleCreateDirectionalSparkleBurst

  }:{
  handsDetected: number;
  isThinking: boolean;
  isIndexStraight: boolean;
  indexFinger: Finger | null;
  hasDetectedOnce: boolean;
  thought: string;
  isMobile: boolean;
  fingerTipAngle:number;
  canvasRef:RefObject<HTMLCanvasElement | null>
  handleCreateDirectionalSparkleBurst: (x: number, y: number, angle: number) => void;
}) => {

  useEffect(() => {
    if( isThinking && indexFinger ) {
      handleCreateDirectionalSparkleBurst(indexFinger.tip.x, indexFinger.tip.y, fingerTipAngle) // creates particles, stores it in its own state
      // pass state to a particle renderer

    }
  }, [isThinking])

  const bubbleContent = () => {
    // If they haven't made a thought yet, prompt them to point at someone
    if (!hasDetectedOnce) {
      return <p className="text-gray-500 italic">Point at someone you want to stereotype...</p>
    }

    // If it's thinking, then make a thinking animation
    if (isThinking) {
      return <div className='relative py-4'>
          <p className="text-gray-500 italic spin -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl">💭</p>
        </div>
    } 

    // If finished thinking, then have the thought. 
    if ( thought && isIndexStraight)  {
      return <p className="text-gray-800 italic">{thought}</p>
    }
    // Otherwise say that you're waiting to stereotype...
    return <p className="text-gray-500 text-sm italic">Waiting for hand gesture...</p>
  }

  const getBubbleStyles = (): CSSProperties => {

    if (!hasDetectedOnce || (!isIndexStraight && !isThinking)) {
      // first detect
      return {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '85%': 'fit-content' ,
      }
    } 
    // While thinking - attach bubble to finger
    if (isThinking) {
      const distance = 200;
      const rad = fingerTipAngle * Math.PI / 180;
      const dx = Math.cos(rad) * distance;
      const dy = Math.sin(rad) * distance;

      if (canvasRef.current && indexFinger) {
        return {
          position: 'absolute',
          top: indexFinger?.tip.y * canvasRef.current?.height,
          left: indexFinger?.tip.x * canvasRef.current?.width ,
          '--x': `${dx}px`,
          '--y': `${dy}px`,
  
        } as CSSProperties
      }
    }
    // has a thought
    if (canvasRef.current && !isThinking && indexFinger) {
      return {
        position: 'absolute',
        transform: 'translateY(-50%)',
        top: indexFinger?.tip.y * canvasRef.current?.height,
        left: indexFinger?.tip.x * canvasRef.current?.width,
        maxWidth: '250px'
      }
    }
    return {};
  }
  const getBubblePadding = () : string => {
    return (isMobile ? '9px 18px' : '14px 24px');
  }

  const getBubbleTextSize = () => {
    return (isMobile ? '14px' : '20px');
  }


  return (
    <div 
      className={`${isThinking ? 'bubble-travel' : ''}`}
      style={{
        ...getBubbleStyles(),
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        zIndex: 50,
        padding: getBubblePadding(),
        fontSize: getBubbleTextSize(),
        borderRadius: isThinking ? '40px' : '24px',        
      }}
    >

      {bubbleContent()}
    </div>
  )
}

export default ThoughtBubble;