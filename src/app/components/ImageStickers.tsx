import Image from "next/image";

const ImageStickers = () => {
  return (
    <div className="absolute inset-0 top-0 left-0 w-full h-full">
      <Image className="absolute top-0 translate-x-[-50%] w-[25%]" width={200} height={200} src="/typecaster/images/Boy.png" alt="A well known meme of a dark skinned boy wearing and yellow shirt holding a soda drink and side-eyeing the camera. "/>
        <Image className="absolute bottom-[25%] translate-x-[-50%] w-[25%]" width={200} height={200} src="/typecaster/images/Kanye.png" alt="A well known meme of Kanye West staring directly at the webcam."/>
        <Image className="absolute top-[30%] translate-x-[-50%] w-[25%]" width={200} height={200} src="/typecaster/images/Eagle.png" alt="A well known meme of an anthropomorphic eagle staring at the camera." />
        <Image className="absolute bottom-0 translate-x-[-50%] w-[25%]" width={200} height={200} src="/typecaster/images/Cat.png" alt="A well known meme of a cat suspiciously side-eyeing the camera"  />

        <Image className="absolute top-0 right-0 translate-x-[50%] translate-y-[-20%] w-[25%]" width={200} height={200} src="/typecaster/images/Minion.png" alt="A well known meme low quality image minion from the Despicables series staring at the camera in bewilderment" />
        <Image className="absolute top-[25%] right-0 translate-x-[50%] w-[25%]" width={200} height={200} src="/typecaster/images/Potato.png" alt="A meme of an anthropomorphic potato with a human face staring at the camera" />
        <Image className="absolute bottom-[20%] right-0 translate-x-[50%] w-[25%]" width={200} height={200} src="/typecaster/images/Smiley.png" alt="A slightly jarring smiley face staring at the screen" />
        <Image className="absolute bottom-0 right-0 translate-x-[50%] w-[25%]" width={200} height={200} src="/typecaster/images/Dog.png" alt="A well known meme of a dog side eyeing the camera suspiciously and slyly."  />
    </div>
  );
}

export default ImageStickers