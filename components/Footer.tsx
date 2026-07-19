export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 pb-10 pt-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-[var(--color-text-tertiary)] md:flex-row">
        <span>© {year} {name}</span>
        <span>
          Built with{" "}
          <a
            href="https://github.com/Pinokioarab/vibefolio"
            className="text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            Vibefolio
          </a>
        </span>
      </div>
    </footer>
  );
}
