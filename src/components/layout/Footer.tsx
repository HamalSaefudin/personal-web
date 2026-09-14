export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex min-h-[80px] max-w-[958px] items-center justify-between gap-4 px-6 lg:px-[54px]">
        <p className="font-mono text-[10px] tracking-[1px] text-foreground-secondary">
          © {new Date().getFullYear()} HAMAL SAEFUDIN
        </p>
        <p className="font-mono text-[10px] tracking-[1px] text-foreground-secondary">
          JAKARTA, INDONESIA · REACT NATIVE
        </p>
      </div>
    </footer>
  );
}
