import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "PhytoGuard AI - Instant Plant Disease Diagnosis",
  description: "Diagnose plant diseases instantly with AI. Snap a photo, get a diagnosis, and save your crops.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PhytoGuard",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#102216",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="apple-touch-icon" href="/icon-192.svg" />
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
            <InstallPrompt />
            <BottomNav />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
