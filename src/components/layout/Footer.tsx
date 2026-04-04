export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-foreground-secondary">
          <p>&copy; {new Date().getFullYear()} Hamal Saefudin</p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
