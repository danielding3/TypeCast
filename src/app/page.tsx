import Image from "next/image";
import Link from "next/link";
import CameraTest from "@/app/components/CameraWithCanvas"
import HandDetector from "./components/HandDetector";

const Header = () => {
  return (
    <div className="sticky top-0 left-0 right-0 w-full bg-white p-4 z-50 shadow-sm">
      <div className="w-full flex justify-between items-center text-base max-w-7xl mx-auto text-gray-500">
        <span className="text-black text-2xl font-bold tracking-tight">Unethical Stereotyper</span>
        <span>
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
        </span>
      </div>
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center p-4 bg-white pt-20 overflow-y-auto">
        {/* <CameraTest/> */}
        <HandDetector/>
      </main>
    </div>
  );
}
