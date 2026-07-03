import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaron Mathias — Cloud & Network Engineering",
  description:
    "Cloud/Network Engineering professional with 3+ years managing mission-critical infrastructure at scale. AWS, TCP/IP networking, IAM security, and >98% uptime across 3,500 endpoints.",
  keywords: [
    "Cloud Engineering",
    "Network Engineering",
    "AWS",
    "Infrastructure",
    "Portfolio",
    "Aaron Mathias",
    "TCP/IP",
    "IAM Security",
    "Incident Response",
  ],
  authors: [{ name: "Aaron Mathias" }],
  openGraph: {
    title: "Aaron Mathias — Cloud & Network Engineering",
    description:
      "Cloud/Network Engineering professional — AWS labs, TCP/IP networking, IAM security, and production infrastructure experience at BMO.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron Mathias — Cloud & Network Engineering",
    description:
      "Cloud/Network Engineering professional — 3+ years, >98% uptime across 3,500 endpoints, $1M+ in savings.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
