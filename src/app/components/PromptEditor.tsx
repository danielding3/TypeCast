'use client'

import { useState } from 'react'
import { Edit, Redo } from '@/app/utils/icons'
import { DEFAULT_PROMPT, NICE_PROMPT } from '../utils/prompts'

interface PromptEditorProps {
  // setCustomPrompt: (prop: string) => void,
  customPrompt: string,
  changePrompt: (prompt:string) => void;
  // resetPrompt: () => void,
  // videoRef: React.RefOject<HTMLVideoElement | null>,
  // canvasWidth: number,
}

const PromptEditor = ({ customPrompt, changePrompt }: PromptEditorProps) => {
  // const [ isEditingPrompt, setIsEditingPrompt ] = useState<boolean>(false);
  const [ showPromptEditor, setShowPromptEditor ] = useState<boolean>(false);
  const [ currentPrompt, setCurrentPrompt ] = useState<string>(customPrompt)
  const [ saveStatus, setSaveStatus ] = useState<'idle' | 'saving' | 'saved'>('idle')

  const handleFormInput = (e : React.ChangeEvent<HTMLTextAreaElement> ) => {
    console.log('Form input:', e.target.value)
    e.preventDefault()
    e.stopPropagation()
    setCurrentPrompt(e.target.value)
    setShowPromptEditor(true);
  }

  const handleFormSave = async () => {
    setSaveStatus('saving')

    // Save custom prompt and send to api.
    changePrompt(currentPrompt)

    // Short delay for loading animation
    await new Promise(resolve => setTimeout(resolve, 300))

    setSaveStatus('saved')

    // Show checkmark then close
    setTimeout(() => {
      setSaveStatus('idle')
    }, 800)
  }

  const handleFormCancel = () => {
    // cancel form input and resets to last used prompt
    setCurrentPrompt(customPrompt);
    setShowPromptEditor(false);
  }

  const handlePresetClick = (prompt:string) => {
    setCurrentPrompt(prompt)
    // changePrompt(prompt)
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <button 
        onClick={() => {
          // Reset prompt to show what is actually being input
          setCurrentPrompt(customPrompt)
          setShowPromptEditor(!showPromptEditor)
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
              <div className="flex justify-between items-center gap-2 leading-[100%]">
                {/* Presets */}
                <div className="flex gap-2 md:gap-4">
                  {/* Reset/Mean Preset Button */}
                  <button 
                    className="flex gap-1 border border-dashed border-black p-2 rounded-lg items-center size-fit text-white text-stroke-medium tracking-wide hover:text-[var(--color-background)] active:text-green-400"
                    onClick={() => {
                      handlePresetClick(DEFAULT_PROMPT) 
                    }}
                  >
                    <Redo/>
                    <span>Original</span>
                  </button>
                  {/* Nice Preset Button*/}
                  <button 
                    className="flex gap-1 border border-dashed border-black p-2 rounded-lg items-center size-fit text-white text-stroke-medium tracking-wide hover:text-[var(--color-background)] active:text-green-400"
                    onClick={() => {
                      handlePresetClick(NICE_PROMPT)
                    }}
                  >
                    <span>Something nice</span>
                  </button>
                </div>
              

                {/* Form Handler Buttons */}
                <div className="flex flex-row gap-4">
                  <button className="hover:text-white" onClick={handleFormCancel}>Cancel</button>
                  <button
                    className="bg-white min-h-[2rem] border border-black rounded-lg px-3 py-1 hover:bg-transparent hover:text-white hover:border-dashed min-w-[60px] flex items-center justify-center transition-all duration-200 text-nowrap"
                    onClick={handleFormSave}
                    disabled={saveStatus !== 'idle'}
                  >
                    {saveStatus === 'idle' && 'Save'}
                    {saveStatus === 'saving' && (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {saveStatus === 'saved' && 'Saved! ✓'}
                  </button>
                </div>
              </div>
            </>
          
      }
    </div>
  );
}

export default PromptEditor;