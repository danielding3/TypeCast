import { RefObject, ReactNode } from "react"
import { FacingMode, Finger } from "@/types"
import PromptEditor from "./PromptEditor"
import HandDetector from "./HandDetector"
import CameraSwitchButton from "./CameraSwitchButton"
import ThoughtBubble from "./ThoughtBubble"
import ParticleEffect from "./ParticleEffect"
import DebugPanel from "./DebugPanel"
import ImageStickers from "./ImageStickers"


interface MainComponentProps {
  videoRef: RefObject<HTMLVideoElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  canvasWidth: number,
  canvasHeight: number,
  isMobile: boolean,
  facingMode: FacingMode,
  handleToggleFacingMode: () => void;
  setupCamera: () => void,
  stopCamera: () => void,
  handsDetected: number,
  isThinking: boolean,
  isIndexStraight: boolean,
  indexFinger: Finger | null,
  hasDetectedOnce: boolean,
  thought: string,
  fingerTipAngle: number,
  handleCreateDirectionalSparkleBurst: (x: number, y: number, angle: number) => void,
  particles: ReactNode[]
  customPrompt: string,
  changePrompt: (prompt:string) => void
}

// Presentation component
const MainComponent = ({
canvasRef,
canvasWidth,
canvasHeight,
videoRef,
isMobile,
facingMode,
handleToggleFacingMode,
setupCamera,
stopCamera,
handsDetected,
isThinking,
isIndexStraight,
indexFinger,
hasDetectedOnce,
thought,
fingerTipAngle,
handleCreateDirectionalSparkleBurst,
particles,
customPrompt,
changePrompt,
} : MainComponentProps) => {

  return (
    <>
      <video ref={videoRef} autoPlay playsInline className="hidden"/>
      <div className="relative canvas-container w-full max-w-4xl shadow-lg rounded-2xl">
        <ImageStickers />
        <canvas 
          ref={canvasRef} 
          className="w-full border border-black  rounded-2xl" 
          width={canvasWidth}
          height={canvasHeight}
          style={{width: `${canvasWidth}px`}}
        />
        <div className="absolute top-4 right-5">
          <CameraSwitchButton 
            isMobile={isMobile}
            facingMode={facingMode}
            handleToggleFacingMode={handleToggleFacingMode}
            setupCamera={setupCamera}
            stopCamera={stopCamera}
          />
        </div>
        <ThoughtBubble 
          handsDetected={handsDetected}
          isThinking={isThinking}
          isIndexStraight={isIndexStraight}
          indexFinger={indexFinger}
          hasDetectedOnce={hasDetectedOnce}
          thought={thought}
          isMobile={isMobile}
          fingerTipAngle={fingerTipAngle}
          handleCreateDirectionalSparkleBurst={handleCreateDirectionalSparkleBurst}
          canvasRef={canvasRef}
        />
        <ParticleEffect particles={particles}/>
      </div>
      <div className="m-4" style={{width: canvasWidth}}>
        <PromptEditor 
          customPrompt={customPrompt} 
          changePrompt={changePrompt}
        />
      </div>
      {/* <button className="text-sm p-4 text-gray-400 hover:text-gray-700 hover:cursor-pointer" onClick={() => debugClickHandler()}>de-🐞</button> */}
      {/* Debug Panel */}
      {/* <div className="bg-white-50 text-green-500 text-center max-w-4xl h-auto p-4 m-4">
        {debug && 
          <DebugPanel 
            handsDetected={handsDetected}
            indexFinger={indexFinger} 
            isIndexStraight={isIndexStraight}
            isThinking={isThinking}
            thought={thought}
            isMobile={isMobile}
          />
        }
      </div> */}
    </>
  )

}

export default MainComponent;