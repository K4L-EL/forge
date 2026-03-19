import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ForgeLabs — Blood Testing for People Who Push Harder",
  description:
    "Advanced blood testing and biomarker analysis for athletes, fitness enthusiasts, and health-conscious individuals. Get lab-accurate results in 3–5 days with AI-powered insights.",
  keywords: [
    "blood testing",
    "biomarkers",
    "health testing",
    "fitness blood test",
    "hormone panel",
    "sports performance",
    "ForgeLabs",
  ],
  openGraph: {
    title: "ForgeLabs — Blood Testing for People Who Push Harder",
    description:
      "Advanced blood testing and biomarker analysis for athletes and fitness enthusiasts.",
    type: "website",
    url: "https://www.forgelabs.co.uk",
    siteName: "ForgeLabs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
