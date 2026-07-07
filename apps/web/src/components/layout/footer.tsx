import Link from 'next/link';
import { Boxes, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Boxes className="h-4 w-4 text-primary" />
          <span>Built for learning data structures &amp; algorithms — no account required.</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/explorer" className="transition-colors hover:text-foreground">
            Explorer
          </Link>
          <Link href="/complexities" className="transition-colors hover:text-foreground">
            Complexity Reference
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
