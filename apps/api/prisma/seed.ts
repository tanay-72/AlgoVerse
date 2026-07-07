import { PrismaClient } from '@prisma/client';
import { categories } from './seed-data/categories';
import { complexityReferences } from './seed-data/complexity-references';
import { algorithmsBatch1 } from './seed-data/algorithms.batch1';
import { algorithmsBatch2 } from './seed-data/algorithms.batch2';
import { algorithmsBatch3 } from './seed-data/algorithms.batch3';
import { algorithmsBatch4 } from './seed-data/algorithms.batch4';
import type { AlgorithmSeed } from './seed-data/types';

const prisma = new PrismaClient();

const algorithms: AlgorithmSeed[] = [
  ...algorithmsBatch1,
  ...algorithmsBatch2,
  ...algorithmsBatch3,
  ...algorithmsBatch4,
];

async function seedCategories(): Promise<void> {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log(`Seeded ${categories.length} categories.`);
}

async function seedComplexityReferences(): Promise<void> {
  for (const reference of complexityReferences) {
    await prisma.complexityReference.upsert({
      where: { notation: reference.notation },
      update: reference,
      create: reference,
    });
  }
  console.log(`Seeded ${complexityReferences.length} complexity references.`);
}

async function seedAlgorithms(): Promise<void> {
  const categoryIdBySlug = new Map(
    (await prisma.category.findMany()).map((category) => [category.slug, category.id]),
  );

  for (const algorithm of algorithms) {
    const categoryId = categoryIdBySlug.get(algorithm.categorySlug);
    if (!categoryId) {
      throw new Error(
        `Algorithm "${algorithm.slug}" references unknown category "${algorithm.categorySlug}"`,
      );
    }

    await prisma.algorithm.upsert({
      where: { slug: algorithm.slug },
      update: {
        name: algorithm.name,
        categoryId,
        difficulty: algorithm.difficulty,
        summary: algorithm.summary,
        introduction: algorithm.introduction,
        problemStatement: algorithm.problemStatement,
        intuition: algorithm.intuition,
        stepByStep: algorithm.stepByStep,
        dryRun: algorithm.dryRun,
        timeComplexityBest: algorithm.timeComplexityBest,
        timeComplexityAverage: algorithm.timeComplexityAverage,
        timeComplexityWorst: algorithm.timeComplexityWorst,
        spaceComplexity: algorithm.spaceComplexity,
        advantages: algorithm.advantages,
        disadvantages: algorithm.disadvantages,
        applications: algorithm.applications,
        commonMistakes: algorithm.commonMistakes,
        visualizationNotes: algorithm.visualizationNotes,
        tags: algorithm.tags,
        cppCode: algorithm.cppCode,
        pythonCode: algorithm.pythonCode,
      },
      create: {
        slug: algorithm.slug,
        name: algorithm.name,
        categoryId,
        difficulty: algorithm.difficulty,
        summary: algorithm.summary,
        introduction: algorithm.introduction,
        problemStatement: algorithm.problemStatement,
        intuition: algorithm.intuition,
        stepByStep: algorithm.stepByStep,
        dryRun: algorithm.dryRun,
        timeComplexityBest: algorithm.timeComplexityBest,
        timeComplexityAverage: algorithm.timeComplexityAverage,
        timeComplexityWorst: algorithm.timeComplexityWorst,
        spaceComplexity: algorithm.spaceComplexity,
        advantages: algorithm.advantages,
        disadvantages: algorithm.disadvantages,
        applications: algorithm.applications,
        commonMistakes: algorithm.commonMistakes,
        visualizationNotes: algorithm.visualizationNotes,
        tags: algorithm.tags,
        cppCode: algorithm.cppCode,
        pythonCode: algorithm.pythonCode,
      },
    });
  }
  console.log(`Seeded ${algorithms.length} algorithms.`);
}

async function seedPracticeProblemsAndLinks(): Promise<void> {
  const algorithmIdBySlug = new Map(
    (await prisma.algorithm.findMany()).map((algorithm) => [algorithm.slug, algorithm.id]),
  );

  for (const algorithm of algorithms) {
    const algorithmId = algorithmIdBySlug.get(algorithm.slug);
    if (!algorithmId) continue;

    await prisma.practiceProblem.deleteMany({ where: { algorithmId } });
    if (algorithm.practiceProblems.length > 0) {
      await prisma.practiceProblem.createMany({
        data: algorithm.practiceProblems.map((problem) => ({ ...problem, algorithmId })),
      });
    }

    await prisma.externalLink.deleteMany({ where: { algorithmId } });
    if (algorithm.externalLinks.length > 0) {
      await prisma.externalLink.createMany({
        data: algorithm.externalLinks.map((link) => ({ ...link, algorithmId })),
      });
    }
  }
  console.log('Seeded practice problems and external links.');
}

async function seedRelatedAlgorithms(): Promise<void> {
  const algorithmIdBySlug = new Map(
    (await prisma.algorithm.findMany()).map((algorithm) => [algorithm.slug, algorithm.id]),
  );

  await prisma.relatedAlgorithm.deleteMany({});

  const relations: { algorithmId: string; relatedId: string }[] = [];
  for (const algorithm of algorithms) {
    const algorithmId = algorithmIdBySlug.get(algorithm.slug);
    if (!algorithmId) continue;

    for (const relatedSlug of algorithm.relatedSlugs) {
      const relatedId = algorithmIdBySlug.get(relatedSlug);
      if (!relatedId) {
        console.warn(
          `Algorithm "${algorithm.slug}" references unknown related algorithm "${relatedSlug}" — skipping.`,
        );
        continue;
      }
      relations.push({ algorithmId, relatedId });
    }
  }

  if (relations.length > 0) {
    await prisma.relatedAlgorithm.createMany({ data: relations, skipDuplicates: true });
  }
  console.log(`Seeded ${relations.length} related-algorithm relationships.`);
}

async function main(): Promise<void> {
  console.log('Seeding AlgoVerse database...');
  await seedCategories();
  await seedComplexityReferences();
  await seedAlgorithms();
  await seedPracticeProblemsAndLinks();
  await seedRelatedAlgorithms();
  console.log('Seeding complete.');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
