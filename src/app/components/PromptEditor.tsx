'use client'

import { useState } from 'react'

interface PromptEditorProps {
  setCustomPrompt: (prop: string) => void,
  customPrompt: string,
  resetPrompt: () => void,
  // videoRef: React.RefOject<HTMLVideoElement | null>,
  // canvasWidth: number,
}

const PromptEditor = ({ setCustomPrompt, customPrompt, resetPrompt }: PromptEditorProps) => {
  const [ showPromptEditor, setShowPromptEditor ] = useState<boolean>(false);

  const handleFormInput = (e : React.ChangeEvent<HTMLTextAreaElement> ) => {
    console.log('Form input:', e.target.value)
    setCustomPrompt(e.target.value)
  }
  return (
    <div className="w-full flex flex-col gap-2">
      <button 
        onClick={() => setShowPromptEditor(!showPromptEditor)}
        className="font-bold text-sm text-blue-500 cursor-pointer hover:text-blue-700 size-fit self-start"
      >
        Edit Prompt
      </button>
      {showPromptEditor && 
        <>
          <textarea 
            id='customPrompt' 
            name='customPrompt' 
            value={customPrompt}
            onChange={(e) => handleFormInput(e)}
            className="w-full text-slate-700 bg-slate-50 border border-slate-200 p-4 rounded-xl"
          />
          <button 
            className="self-end size-fit text-sm text-blue-500 cursor-pointer hover:text-blue-700 active:text-blue-300"
            onClick={resetPrompt}
          >
              Restore original
          </button>
        </>
      }
    </div>
  );
}

export default PromptEditor;