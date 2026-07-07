import type { Metadata } from 'next';
import { BookOpen, Database, Github, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About',
  description: 'What AlgoVerse is, how it is built, and why it has no accounts.',
};

const principles = [
  {
    icon: BookOpen,
    title: 'Depth over breadth',
    description:
      'Every algorithm page includes intuition, a full dry run, complexity analysis, and dual-language implementations — not just a code snippet.',
  },
  {
    icon: ShieldCheck,
    title: 'No accounts, ever',
    description:
      'Bookmarks, progress, and recently viewed items live entirely in your browser via LocalStorage. Nothing is sent to a server, and there is nothing to sign up for.',
  },
  {
    icon: Database,
    title: 'A real REST API',
    description:
      'The backend is a NestJS + PostgreSQL service with a proper controller → service → repository architecture, not a static JSON dump.',
  },
  {
    icon: Sparkles,
    title: 'Built like a product',
    description:
      'Typed end-to-end with TypeScript, a shared-types package keeping the API and web app in sync, and a component system inspired by shadcn/ui.',
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-semibold tracking-tight">About AlgoVerse</h1>
      <p className="mt-4 text-muted-foreground">
        AlgoVerse is a modern data structures &amp; algorithms learning platform, built as a
        portfolio-grade full-stack application. It focuses on clear, complete explanations for a
        curated set of foundational algorithms rather than an exhaustive but shallow catalog.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {principles.map((principle) => (
          <Card key={principle.title}>
            <CardContent className="flex flex-col gap-3 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <principle.icon className="h-4.5 w-4.5" />
              </span>
              <h2 className="font-medium">{principle.title}</h2>
              <p className="text-sm text-muted-foreground">{principle.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
        <Github className="h-4 w-4" />
        <span>Source code and architecture notes live alongside this project&apos;s README.</span>
      </div>
    </div>
  );
}
