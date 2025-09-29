import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";


const AuthenticSansPro = localFont({
  src: '../../public/fonts/AUTHENTICSansPro-Condensed90.woff2',
  variable: '--authentic-sans'
})

export const metadata: Metadata = {
  title: "TYPECAST",
  description: "Generate (stereotypical) thoughts of your friends using hand gestures. Built using MediaPipe and Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${AuthenticSansPro.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
