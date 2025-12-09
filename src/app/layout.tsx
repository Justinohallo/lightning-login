import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lightning Login Demo",
  description: "Demonstrating Lightning Login (LNURL-auth) for sovereign authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black antialiased flex flex-col`}
      >
        <header className="border-b border-neutral-200">
          <Navigation />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200 mt-auto">
          {/* Footer placeholder - can be empty for now */}
        </footer>
      </body>
    </html>
  );
}
