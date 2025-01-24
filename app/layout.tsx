import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Marketing Intelligence Hub | Real-time Marketing Insights",
  description: "Access real-time AI-powered marketing intelligence, trends analysis, and strategic insights. Stay ahead with data-driven marketing decisions and industry opportunities.",
  keywords: "AI marketing, marketing intelligence, market trends, marketing insights, AI analytics, marketing opportunities",
  authors: [{ name: "Heather Grass" }],
  openGraph: {
    title: "AI Marketing Intelligence Hub | Real-time Marketing Insights",
    description: "Access real-time AI-powered marketing intelligence, trends analysis, and strategic insights. Stay ahead with data-driven marketing decisions and industry opportunities.",
    url: "https://heathergrass.com/ai-marketing",
    siteName: "AI Marketing Intelligence Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Marketing Intelligence Hub Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Marketing Intelligence Hub | Real-time Marketing Insights",
    description: "Access real-time AI-powered marketing intelligence, trends analysis, and strategic insights.",
    images: ["/og-image.png"],
  },
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
  verification: {
    google: "your-google-verification-code", // You'll need to add your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <Script
          defer
          data-domain="heathergrass.com"
          src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-setup" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
        <Script
          id="schema-markup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI Marketing Intelligence Hub",
              "applicationCategory": "BusinessApplication",
              "description": "Real-time AI-powered marketing intelligence and insights platform providing trend analysis, market opportunities, and strategic recommendations.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/OnlineOnly"
              },
              "provider": {
                "@type": "Person",
                "name": "Heather Grass",
                "url": "https://heathergrass.com"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-background`}>
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
          {children}
        </main>
      </body>
    </html>
  );
}
