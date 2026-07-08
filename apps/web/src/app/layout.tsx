import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PageTransition } from '@/components/layout/page-transition';

export const metadata: Metadata = {
  title: {
    default: 'AlgoVerse — Master Data Structures & Algorithms',
    template: '%s · AlgoVerse',
  },
  description:
    'A premium, sign-up-free platform for learning data structures and algorithms with clean explanations, dry runs, complexity analysis, and dual-language implementations.',
  keywords: [
    'data structures',
    'algorithms',
    'DSA',
    'coding interview',
    'competitive programming',
    'leetcode',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
