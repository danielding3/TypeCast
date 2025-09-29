import Image from "next/image";
import Link from "next/link";
import HandDetector from "./components/HandDetector";

const Header = () => {
  return (
    <header className="sticky bg-(--color-background) top-0 left-0 right-0 w-full not-even:p-4 mt-0 md:mt-8 z-50">
      <div className="w-full flex flex-col justify-between items-center text-base max-w-7xl mx-auto text-white text-center">
        <h1 className="text-stroke-heavy text-[10vw] md:text-6xl font-bold">TYPE-CAST</h1>
        <h2 className="text-stroke-medium md:text-stroke-heavy text-[5vw] md:text-3xl font-bold">who does AI think you are?</h2>
        <h3 className="md:text-base text-xs">
          Built with&nbsp;
          <Link 
            className="underline hover:text-gray-700"
            href="https://ai.google.dev/gemini-api/docs/api-key"
            target="_blank"
          >
            Gemini 2.0</Link> and&nbsp;
          <Link 
            className="underline hover:text-gray-700"
            href="https://ai.google.dev/edge/mediapipe/solutions/guide" 
            target="_blank">
              MediaPipe
          </Link>
        </h3>
      </div>
    </header>
  )
}
const Footer = () => {
  return (
    <footer className="p-4">
      <ul>
        <li>
          Many thanks to <span><Link href="https://tina.zone/" target="_blank">Tina Tarighian</Link></span> for the inspo.
        </li>
        <li>
          Typeface: Authentic Sans Pro
        </li>
      </ul>
    </footer>    
  )
}

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center p-4 pt-4 overflow-y-auto overflow-x-hidden">
        {/* <CameraTest/> */}
        {/* <MainComponent /> */}
        <HandDetector/>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
