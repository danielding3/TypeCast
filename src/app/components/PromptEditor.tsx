'use client'

import { useState } from 'react'
import { Edit, Redo } from '@/app/utils/icons'

interface PromptEditorProps {
  setCustomPrompt: (prop: string) => void,
  customPrompt: string,
  resetPrompt: () => void,
  // videoRef: React.RefOject<HTMLVideoElement | null>,
  // canvasWidth: number,
}

const PromptEditor = ({ setCustomPrompt, customPrompt, resetPrompt }: PromptEditorProps) => {
  // const [ isEditingPrompt, setIsEditingPrompt ] = useState<boolean>(false);
  const [ showPromptEditor, setShowPromptEditor ] = useState<boolean>(false);
  const [ currentPrompt, setCurrentPrompt ] = useState<string>(customPrompt)

  const handleFormInput = (e : React.ChangeEvent<HTMLTextAreaElement> ) => {
    console.log('Form input:', e.target.value)
    e.preventDefault()
    e.stopPropagation()
    setCurrentPrompt(e.target.value)
    setShowPromptEditor(true);
  }

  const handleFormSave = () => {
    // Save custom prompt and send to api.
    setCustomPrompt(currentPrompt);
    setShowPromptEditor(false);
  }

  const handleFormCancel = () => {
    // cancel form input and resets to last used prompt
    setCurrentPrompt(customPrompt);
    setShowPromptEditor(false);
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <button 
        onClick={() => {
          setShowPromptEditor(!showPromptEditor)
          // setShowProm(true);
        }}
        className="size-fit self-start flex items-center gap-1 font-bold text-white text-stroke-medium tracking-wide group hover:text-[var(--color-background)] active:text-green-400"
      >
        {/* group hovers not working for some reason... */}
        <span>Edit Prompt</span>
        <Edit className="stroke-2"/> 

      </button>
      {showPromptEditor && 

            <>
              <textarea 
                id='customPrompt' 
                name='customPrompt' 
                value={currentPrompt}
                onChange={(e) => handleFormInput(e)}
                className="w-full bg-white border border-black p-4 rounded-xl"
              />
              <div className="flex justify-between items-center">
              
                {/* Reset Button */}
                <button 
                  className="flex gap-1 items-center size-fit text-white text-stroke-medium tracking-wide hover:text-[var(--color-background)] active:text-green-400"
                  onClick={() => {
                    resetPrompt 
                  }}
                >
                  <Redo/>
                  <span>Restore original prompt</span>
                </button>
                {/* Form Handler Buttons */}
                <div className="flex flex-row gap-4">
                  <button className="hover:text-white" onClick={handleFormCancel}>Cancel</button>
                  <button className="bg-white border border-black rounded-lg px-3 py-1 hover:bg-transparent hover:text-white hover:border-dashed" onClick={handleFormSave}>Save</button>
                </div>
              </div>
            </>
          
      }
    </div>
  );
}

export default PromptEditor;