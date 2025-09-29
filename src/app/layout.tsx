import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";


const AuthenticSansPro = localFont({
  src: '../../public/fonts/AUTHENTICSansPro-Condensed90.woff2',
  variable: '--authentic-sans'
})

export const metadata: Metadata = {
  title: "Stereotyper",
  description: "Generate (stereotypical) thoughts based on hand gestures using MediaPipe and Gemini",
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
