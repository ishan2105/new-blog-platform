import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/auth";
import "./tailwind.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogHub | Instagram-Style Blogging Platform",
  description: "Share your stories with the world. BlogHub is an Instagram-style blogging platform where users can create, read, and engage with blog posts.",
  keywords: "Blog, Social, Instagram-style, Next.js, MongoDB, Interactive",
  authors: [{ name: "Ishan Gupta", url: "https://github.com/ishang6664" }],
  openGraph: {
    title: "BlogHub - Share Your Stories",
    description: "An Instagram-style blogging platform for creators",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

