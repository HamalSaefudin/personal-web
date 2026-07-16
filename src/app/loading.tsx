"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-muted" />
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent absolute top-0 left-0 animate-[spin_0.6s_linear_infinite]" />
        </div>
        <p className="text-foreground-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}
