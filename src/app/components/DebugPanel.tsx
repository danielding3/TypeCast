import { Finger } from '@/app/hooks/useHandDetection';


interface DebugPanelProps { 
  handsDetected: number,
  indexFinger : Finger | null,
  isIndexStraight: boolean,
  isMobile: boolean,
  isThinking: boolean;
  thought: string,

}
const DebugPanel = ({ handsDetected, indexFinger, isIndexStraight, isThinking, thought, isMobile }: DebugPanelProps) => {
  return (
    <div className="min-w-xl text-sm">
      <p className="font-bold">Index Finger Properties: </p>
      <p>Tip X Coordinate: {indexFinger?.tip.x}</p>
      <p>Tip Y Coordinate: {indexFinger?.tip.y}</p>
      <p className="font-bold">Number of hands detected</p>
      <p>{handsDetected}</p>
      <p className="font-bold">Is Index Straight?</p>
      <p>{isIndexStraight ? "Yes" : "No"}</p>
      <p className="font-bold">Is Mobile?</p>
      <p>{isMobile ? "Yes" : "No"}</p>
      <p className="font-bold">Is Thinking?</p>
      <p>{isThinking ? "Yes" : "No"}</p>
      <p className="font-bold">Current Thought:</p>
      <p>{thought}</p>
    </div>
  )
  
}

export default DebugPanel;