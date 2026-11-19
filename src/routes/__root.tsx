import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import appCss from "../styles.css?url";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hamal Saefudin — Mobile Application Developer, Jakarta" },
      {
        name: "description",
        content:
          "Hamal Saefudin is a Mobile Application Developer in Jakarta with 6+ years of experience in React Native, ReactJS, Flutter and TypeScript.",
      },
      {
        name: "keywords",
        content:
          "Mobile Application Developer, React Native Developer, Flutter Developer, ReactJS Developer, TypeScript Developer, Jakarta, Indonesia, Hamal, Frontend Developer, Cross-platform Mobile Apps",
      },
      { name: "author", content: "Hamal Saefudin" },
      { name: "creator", content: "Hamal" },
      { name: "publisher", content: "Hamal" },
      { name: "robots", content: "index, follow" },
      { name: "category", content: "technology" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: "https://hamalsaefudin.com" },
      { property: "og:site_name", content: "Hamal Saefudin" },
      { property: "og:title", content: "Hamal Saefudin | Mobile Application Developer" },
      {
        property: "og:description",
        content:
          "Mobile Application Developer in Jakarta with 6+ years of experience in React Native, ReactJS, Flutter and TypeScript.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hamal Saefudin | Mobile Application Developer" },
      {
        name: "twitter:description",
        content:
          "Mobile Application Developer in Jakarta. React Native, ReactJS, Flutter, TypeScript.",
      },
      { name: "twitter:creator", content: "@hamaltech" },
      { name: "theme-color", content: "#12110e" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap",
      },
      { rel: "canonical", href: "https://hamalsaefudin.com" },
      { rel: "icon", href: "/icon.png" },
      { rel: "shortcut icon", href: "/icon.png" },
      { rel: "apple-touch-icon", href: "/icon.png" },
    ],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark"}document.documentElement.dataset.theme=t;if(!window.matchMedia||window.matchMedia("(prefers-reduced-motion: no-preference)").matches){document.documentElement.dataset.reveal="on"}}catch(e){document.documentElement.dataset.theme="dark"}})();`,
      },
    ],
  }),
  component: RootDocument,
  errorComponent: RouteError,
  notFoundComponent: NotFound,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

function RouteError({ error, reset }: ErrorComponentProps) {
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    reset();
    setTimeout(() => setIsReloading(false), 1000);
  };

  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
        <p className="text-foreground-muted mb-6">
          We encountered an unexpected error. Please try again or refresh the page.
        </p>

        {errorMessage && (
          <p className="text-xs text-foreground-muted mb-6">Error: {errorMessage}</p>
        )}

        <Button onClick={handleReload} disabled={isReloading} className="cursor-pointer">
          <RefreshCw className={`mr-2 h-4 w-4 ${isReloading ? "animate-spin" : ""}`} />
          {isReloading ? "Reloading..." : "Try Again"}
        </Button>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="text-foreground-secondary mb-6">The page you requested does not exist.</p>
        <a href="/" className="text-primary font-medium">
          Back to home
        </a>
      </div>
    </div>
  );
}
