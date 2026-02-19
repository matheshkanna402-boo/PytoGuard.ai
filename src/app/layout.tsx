import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "PhytoGuard AI - Instant Plant Disease Diagnosis",
  description: "Diagnose plant diseases instantly with AI. Snap a photo, get a diagnosis, and save your crops.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-display bg-background-light text-leaf-dark min-h-screen relative antialiased`}
      >
        {/* Subtle Background Texture */}
        <div className="fixed inset-0 z-0 bg-vein-pattern pointer-events-none opacity-100 mix-blend-multiply" />

        {/* Main Container */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-1 pb-24">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
