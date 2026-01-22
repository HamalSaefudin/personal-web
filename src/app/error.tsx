"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    reset();
    setTimeout(() => setIsReloading(false), 1000);
  };

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
        
        {error.digest && (
          <p className="text-xs text-foreground-muted mb-6">
            Error ID: {error.digest}
          </p>
        )}
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleReload}
            disabled={isReloading}
            className="cursor-pointer"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isReloading ? "animate-spin" : ""}`} />
            {isReloading ? "Reloading..." : "Try Again"}
          </Button>
        </div>
      </div>
    </div>
  );
}
