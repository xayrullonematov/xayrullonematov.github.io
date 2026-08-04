import { site, navLinks } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090e] pt-16 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#top" className="flex items-center gap-3 w-max group">
              <img
                src="/images/logo.png"
                alt="Hamma Labs Logo"
                className="h-10 w-10 rounded-xl object-contain border border-white/10 p-1 shadow-md group-hover:scale-105 transition-transform bg-[#0d1119]"
              />
              <span className="display text-2xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
                {site.name}
              </span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {site.bio}. Building local-first AI software from {site.location}.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <p className="mono mb-4 text-[11px] tracking-[0.16em] text-accent uppercase">
              Navigate
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-4">
            <p className="mono mb-4 text-[11px] tracking-[0.16em] text-accent uppercase">
              Connect
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  nematov.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
          <p className="mono text-[11px] tracking-wide text-muted-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="mono text-[11px] tracking-wide text-muted-dim">
            Hamma Labs · Local-first AI Systems Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
