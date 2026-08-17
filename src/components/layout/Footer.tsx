export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-foreground-secondary">
          <p>&copy; {new Date().getFullYear()} Hamal Saefudin</p>
          <p>Built with TanStack Start</p>
        </div>
      </div>
    </footer>
  );
}
