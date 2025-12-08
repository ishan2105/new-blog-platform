import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Full Stack CRUD App | User Management System",
  description: "A secure, production-ready full-stack CRUD application with Next.js, MongoDB, and JWT authentication",
  keywords: "CRUD, Next.js, MongoDB, User Management, Full Stack",
  authors: [{ name: "Ishan Gupta", url: "https://github.com/ishang6664" }],
  openGraph: {
    title: "Full Stack CRUD App",
    description: "Complete user management system with authentication",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
