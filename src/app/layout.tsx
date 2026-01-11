import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#22C55E",
};

export const metadata: Metadata = {
  title: {
    default: "Hamal",
    template: "%s | Hamal",
  },
  description: "Experienced Mobile Application Developer with 5+ years of expertise in React Native, Flutter, and ReactJS. Based in Jakarta, Indonesia. Specialized in building high-quality mobile and web applications.",
  keywords: [
    "Mobile Application Developer",
    "React Native Developer",
    "Flutter Developer",
    "ReactJS Developer",
    "TypeScript Developer",
    "Jakarta",
    "Indonesia",
    "Hamal",
    "Frontend Developer",
    "Cross-platform Mobile Apps",
  ],
  authors: [{ name: "Hamal" }],
  creator: "Hamal",
  publisher: "Hamal",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamalsaefudin.com",
    siteName: "Hamal",
    title: "Hamal | Mobile Application Developer",
    description: "Experienced Mobile Application Developer with 5+ years of expertise in React Native, Flutter, and ReactJS. Based in Jakarta, Indonesia.",
    images: [
      {
        url: "/avatar.png",
        width: 1200,
        height: 1200,
        alt: "Hamal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamal | Mobile Application Developer",
    description: "Experienced Mobile Application Developer with 5+ years of expertise in React Native, Flutter, and ReactJS.",
    images: ["/avatar.png"],
    creator: "@hamaltech",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  metadataBase: new URL("https://hamalsaefudin.com"),
  alternates: {
    canonical: "https://hamalsaefudin.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
