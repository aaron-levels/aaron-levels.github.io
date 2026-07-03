import { Github, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-black text-lg text-foreground">
            AM<span className="text-primary">.</span>
          </span>
          <p className="text-muted-foreground text-xs mt-1">
            © {new Date().getFullYear()} Aaron Mathias. Built with Next.js &
            Tailwind CSS.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="hidden sm:block h-5 w-px bg-border" />
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="mailto:amat576@wgu.edu"
              className="hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <a
              href="https://github.com/aaron-levels"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
