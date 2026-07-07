import type { ComponentType, ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Eye, LayoutGrid, Lightbulb, ListChecks, PlayCircle } from 'lucide-react';
import { fetchAlgorithmBySlug } from '@/lib/api/algorithms';
import { ApiError } from '@/lib/api/client';
import { getCategoryIcon } from '@/lib/utils/icon-map';
import { DifficultyBadge } from '@/components/algorithm/difficulty-badge';
import { BookmarkButton } from '@/components/algorithm/bookmark-button';
import { MarkCompleteButton } from '@/components/algorithm/mark-complete-button';
import { RecordView } from '@/components/algorithm/record-view';
import { CodeBlock } from '@/components/algorithm/code-block';
import { CodeTabs } from '@/components/algorithm/code-tabs';
import { RelatedAlgorithms } from '@/components/algorithm/related-algorithms';
import { PracticeProblemsList } from '@/components/algorithm/practice-problems-list';
import { ExternalLinksList } from '@/components/algorithm/external-links-list';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

interface AlgorithmPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AlgorithmPageProps): Promise<Metadata> {
  try {
    const algorithm = await fetchAlgorithmBySlug(params.slug);
    return { title: algorithm.name, description: algorithm.summary };
  } catch {
    return { title: 'Algorithm' };
  }
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Icon className="h-4.5 w-4.5 text-primary" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function AlgorithmDetailPage({ params }: AlgorithmPageProps) {
  let algorithm;
  try {
    algorithm = await fetchAlgorithmBySlug(params.slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const CategoryIcon = getCategoryIcon(algorithm.category.icon);
  const cppBlock = <CodeBlock code={algorithm.implementation.cpp} language="cpp" />;
  const pythonBlock = <CodeBlock code={algorithm.implementation.python} language="python" />;

  return (
    <div className="container max-w-4xl py-10">
      <RecordView
        algorithmSlug={algorithm.slug}
        algorithmName={algorithm.name}
        categorySlug={algorithm.category.slug}
      />

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CategoryIcon className="h-4 w-4" />
          {algorithm.category.name}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{algorithm.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{algorithm.summary}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <BookmarkButton
              algorithmSlug={algorithm.slug}
              algorithmName={algorithm.name}
              categorySlug={algorithm.category.slug}
            />
            <MarkCompleteButton
              algorithmSlug={algorithm.slug}
              algorithmName={algorithm.name}
              categorySlug={algorithm.category.slug}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={algorithm.difficulty} />
          {algorithm.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Complexity summary */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Best', value: algorithm.complexity.best },
          { label: 'Average', value: algorithm.complexity.average },
          { label: 'Worst', value: algorithm.complexity.worst },
          { label: 'Space', value: algorithm.complexity.space },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 font-mono text-base font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-10" />

      <div className="flex flex-col gap-10">
        <Section icon={Lightbulb} title="Introduction">
          <p className="leading-relaxed text-muted-foreground">{algorithm.introduction}</p>
        </Section>

        <Section icon={ListChecks} title="Problem Statement">
          <p className="leading-relaxed text-muted-foreground">{algorithm.problemStatement}</p>
        </Section>

        <Section icon={Lightbulb} title="Intuition">
          <p className="leading-relaxed text-muted-foreground">{algorithm.intuition}</p>
        </Section>

        <Section icon={ListChecks} title="Step-by-Step Explanation">
          <ol className="flex flex-col gap-2">
            {algorithm.stepByStep.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        <Section icon={PlayCircle} title="Dry Run">
          <Card>
            <CardContent className="overflow-x-auto p-4">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                {algorithm.dryRun}
              </pre>
            </CardContent>
          </Card>
        </Section>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Section icon={ListChecks} title="Advantages">
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {algorithm.advantages.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-success">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={ListChecks} title="Disadvantages">
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {algorithm.disadvantages.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-destructive">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <Section icon={LayoutGrid} title="Applications">
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {algorithm.applications.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">›</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={ListChecks} title="Common Mistakes">
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {algorithm.commonMistakes.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-warning">!</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Eye} title="Visualization">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
              <Eye className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{algorithm.visualizationNotes}</p>
              <p className="text-xs text-muted-foreground/70">
                An interactive step-through visualization for this algorithm is on the roadmap.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Section icon={ListChecks} title="Implementation">
          <CodeTabs cppBlock={cppBlock} pythonBlock={pythonBlock} />
        </Section>

        <Section icon={ListChecks} title="Related Algorithms">
          <RelatedAlgorithms algorithms={algorithm.relatedAlgorithms} />
        </Section>

        <Section icon={ListChecks} title="Practice Problems">
          <PracticeProblemsList problems={algorithm.practiceProblems} />
        </Section>

        <Section icon={ListChecks} title="External Links">
          <ExternalLinksList links={algorithm.externalLinks} />
        </Section>
      </div>
    </div>
  );
}
