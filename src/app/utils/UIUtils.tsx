 import { useState, useRef, useCallback, CSSProperties, ReactNode, RefObject } from 'react';

 interface Sparkle {
  id: string,
  angle: number,
 }

 interface SparkleProps {
  x: number,
  y: number,
  angle?: number,
  spread?: number,
  count?: number,
  distance?: number 
 }

 // Calls creation functions and acts as state manager
export const useParticles = (canvasRef : RefObject<HTMLCanvasElement | null>) => {
  const [particles, setParticles ] = useState<ReactNode[]>([]);
  const particleId = useRef<number>(0);


  const handleCreateDirectionalSparkleBurst = useCallback((x:number, y:number, angle:number) => {
    const newParticles = createDirectionalSparkleBurst(canvasRef, x, y, angle)
    // track new particles added to DOM, and remove them after their have finished playing.
    setParticles(newParticles)
    setTimeout(() => {
      setParticles([]) // cleanup
    }, 1000)
  }, [])
  return {
    particles,
    handleCreateDirectionalSparkleBurst
  }

}

const createDirectionalSparkleBurst = (canvasRef: RefObject<HTMLCanvasElement | null>, x:number, y:number, angle = 270, spread = 90, count = 15, distance = 150 ) => {
    // generate from properties
    const particleArray = [];
    const rad = angle * Math.PI / 180
    const spreadRad = spread * Math.PI / 180
    for (let i = 0; i < count; i++) {
      const angle = rad + (Math.random() - 0.5) * (spreadRad)
      particleArray.push({
        id: i.toString(), angle
      })
    }
    const createdParticles = particleArray.map(({id, angle}) => {
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      // console.log("ANGLE: ", angle * 180 / Math.PI)
      return (
        <div
          key={id}
          className="sparkle-line"
          style={{
            left: canvasRef.current ? x * canvasRef.current.width : 0,
            top: canvasRef.current ? y * canvasRef.current.height : 0,
            '--dx': `${dx}px`,
            '--dy': `${dy}px`,
            '--r':`${angle * 180 / Math.PI}deg`
          } as CSSProperties}
        />
      )
    })

    return createdParticles
  }






export const AnimationStyles = () => {
  return (
    <>
      <style jsx global>{`
        .sparkle-line {
          position: absolute;
          z-index: 20;
          background: white;
          width: 2px;
          height: 10px;
          transform: translate(-50%, -50%);
          animation: sparkleFly 0.9s ease-out forwards;
        }
        .spin {
          position: absolute;
          z-index:20;
          animation: spin 1s linear infinite forwards;
        }
        .bubble-travel {
          animation: bubbleTravel 3s ease-out forwards;
        }
        
        @keyframes sparkleFly {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(var(--r));
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(var(--dx), var(--dy)) scale(0.7) rotate(var(--r));
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes bubbleTravel {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(0, 0) scale(1) ;
          }
          50% {
            opacity: 0.8
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0.5);
          }
        }
        
      `}</style>
    </>
  )
}

