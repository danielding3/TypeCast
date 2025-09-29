
interface CameraSwitchButtonProps {
  facingMode: 'environment' | 'user'
  handleToggleFacingMode: () => void
  setupCamera: () => void, 
  stopCamera: () => void,
  isMobile: boolean,
}


const CameraSwitchButton = ({facingMode, handleToggleFacingMode, setupCamera, stopCamera, isMobile}: CameraSwitchButtonProps) => {

  const handleButtonClick = () => { 
    // stopCamera();
    const toggle = { environment: 'user', user: 'environment'} as const // using object lookup to toggle
    console.log('toggling to: ',toggle[facingMode])
    handleToggleFacingMode();
  }

  const visibilityStyle = isMobile ? {display: 'block'} : {display: 'none'}

  return (
    <button 
      style={{
        ...visibilityStyle,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
      }}
      onClick={handleButtonClick}
      className="text-sm cursor-pointer active:scale-95 p-2 bg-white/70 hover:bg-white/50 backdrop-blur-md text-black rounded-full">
      🔄
    </button>
  )
}

export default CameraSwitchButton