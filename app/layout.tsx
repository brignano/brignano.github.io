import type { Metadata } from "next";
import { Inconsolata, Silkscreen } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { VercelToolbar } from "@vercel/toolbar/next";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Anthony Brignano | Full-stack Engineer",
  description:
    "Anthony Brignano's personal portfolio website showcasing projects, skills, and experience.",
  icons: {
    icon: [
      { url: "/favicon.svg" },
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "Anthony Brignano | Full-stack Engineer",
    description:
      "Explore Anthony Brignano's portfolio and full-stack development experience.",
    url: "https://brignano.io",
    siteName: "Anthony Brignano Portfolio",
    // todo: below
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Anthony Brignano Portfolio Preview",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Brignano | Full-stack Engineer",
    description:
      "Discover Anthony Brignano's portfolio and full-stack development experience.",
    // todo: below
    //  images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development";
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} ${silkscreen.variable} antialiased dark:bg-zinc-900 bg-zinc-100 dark:text-white text-zinc-700 transition-colors`}
      >
        <Header />
        {children}
        {shouldInjectToolbar && <VercelToolbar />}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
