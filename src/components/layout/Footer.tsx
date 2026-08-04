import { site, navLinks } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a href="#" className="inline-block w-max">
              <span className="display text-2xl tracking-tight hover:text-accent transition-colors">
                {site.name}
              </span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {site.bio}. Building local-first AI software from {site.location}.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <p className="mono mb-4 text-[11px] tracking-[0.16em] text-muted-dim uppercase">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted transition-colors hover:text-text">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-4">
            <p className="mono mb-4 text-[11px] tracking-[0.16em] text-muted-dim uppercase">Connect</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-text">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-sm text-muted transition-colors hover:text-text">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-text">
                  nematov.com
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="mono text-[11px] tracking-wide text-muted-dim">
            © {new Date().getFullYear()} {site.name}. Crafted with intent.
          </p>
          <p className="mono text-[11px] tracking-wide text-muted-dim">
            Hamma Labs · Local-first AI
          </p>
        </div>
      </div>
    </footer>
  );
}
