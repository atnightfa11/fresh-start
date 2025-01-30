import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'),
  title: "Neural Signal - Real-time AI Marketing Intelligence",
  description: "Track AI marketing trends in real-time",
  keywords: "AI marketing, marketing intelligence, market trends, marketing insights, AI analytics, marketing opportunities",
  authors: [{ name: "Heather Grass" }],
  openGraph: {
    title: "Neural Signal - AI Marketing Intelligence",
    description: "Track AI marketing trends in real-time",
    url: '/',
    siteName: 'Neural Signal',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neural Signal - AI Marketing Intelligence'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Signal - AI Marketing Intelligence',
    description: 'Track AI marketing trends in real-time',
    images: ['/og-image.png'],
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className={`${inter.className} font-sans min-h-screen bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
