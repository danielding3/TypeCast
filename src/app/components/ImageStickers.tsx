

const ImageStickers = () => {
  return (
    <div className="absolute inset-0 top-0 left-0 w-full h-full">
      <img className="absolute top-0 translate-x-[-50%] w-[25%]" src="/images/Boy.png" />
      <img className="absolute bottom-[25%] translate-x-[-50%] w-[25%]" src="/images/Kanye.png" />
      <img className="absolute top-[30%] translate-x-[-50%] w-[25%]" src="/images/Eagle.png" />
      <img className="absolute bottom-0 translate-x-[-50%] w-[25%]" src="/images/Cat.png" />

      <img className="absolute top-0 right-0 translate-x-[50%] translate-y-[-20%] w-[25%]" src="/images/Minion.png" />
      <img className="absolute top-[25%] right-0 translate-x-[50%] w-[25%]" src="/images/Potato.png" />
      <img className="absolute bottom-[20%] right-0 translate-x-[50%] w-[25%]" src="/images/Smiley.png" />
      <img className="absolute bottom-0 right-0 translate-x-[50%] w-[25%]" src="/images/Dog.png" />
    </div>
  );
}

export default ImageStickers