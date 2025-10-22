import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import "@/lib/GSAPAnimations";
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
  title: "AI AEX - AI-Powered Business Solutions",
  description: "Boost your business efficiency with our AI powered solutions. We specialize in AI Sales Bots, Virtual Assistants for customer support, end to end business automation, and seamless AI integration with ERP, CRM, and HRMS systems. Unlock smarter workflows, 24/7 customer engagement, and automated growth with our custom AI automation services.",
  keywords: ["AI", "Artificial Intelligence", "Sales Bots", "Business Automation", "ERP", "CRM", "HRMS", "Virtual Assistants", "Customer Support"],
  authors: [{ name: "AI AEX" }],
  creator: "AI AEX",
  publisher: "AI AEX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiaex.com",
    siteName: "AI AEX",
    title: "AI AEX - AI-Powered Business Solutions",
    description: "Boost your business efficiency with our AI powered solutions. We specialize in AI Sales Bots, Virtual Assistants for customer support, end to end business automation, and seamless AI integration with ERP, CRM, and HRMS systems. Unlock smarter workflows, 24/7 customer engagement, and automated growth with our custom AI automation services.",
    images: [
      {
        url: "/banner.jpeg",
        width: 1200,
        height: 630,
        alt: "AI AEX - AI-Powered Business Solutions Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI AEX - AI-Powered Business Solutions",
    description: "Boost your business efficiency with our AI powered solutions. We specialize in AI Sales Bots, Virtual Assistants for customer support, end to end business automation, and seamless AI integration with ERP, CRM, and HRMS systems. Unlock smarter workflows, 24/7 customer engagement, and automated growth with our custom AI automation services.",
    images: ["/banner.jpeg"],
    creator: "@aiaex",
    site: "@aiaex",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
  colorScheme: "dark",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen w-full">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
