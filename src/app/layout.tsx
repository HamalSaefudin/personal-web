import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10B981",
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
        url: "/newavatar.png",
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
    images: ["/newavatar.png"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen bg-background text-foreground`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var support = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (theme === 'dark' || (!theme && support)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
