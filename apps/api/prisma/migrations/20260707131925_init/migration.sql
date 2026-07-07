-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('LEETCODE', 'CODEFORCES', 'CSES', 'ATCODER', 'OTHER');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "algorithms" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "intuition" TEXT NOT NULL,
    "stepByStep" TEXT[],
    "dryRun" TEXT NOT NULL,
    "timeComplexityBest" TEXT NOT NULL,
    "timeComplexityAverage" TEXT NOT NULL,
    "timeComplexityWorst" TEXT NOT NULL,
    "spaceComplexity" TEXT NOT NULL,
    "advantages" TEXT[],
    "disadvantages" TEXT[],
    "applications" TEXT[],
    "commonMistakes" TEXT[],
    "visualizationNotes" TEXT NOT NULL,
    "tags" TEXT[],
    "cppCode" TEXT NOT NULL,
    "pythonCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "algorithms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "related_algorithms" (
    "id" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "relatedId" TEXT NOT NULL,

    CONSTRAINT "related_algorithms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practice_problems" (
    "id" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "practice_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "external_links" (
    "id" TEXT NOT NULL,
    "algorithmId" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "external_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complexity_references" (
    "id" TEXT NOT NULL,
    "notation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "complexity_references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "algorithms_slug_key" ON "algorithms"("slug");

-- CreateIndex
CREATE INDEX "algorithms_categoryId_idx" ON "algorithms"("categoryId");

-- CreateIndex
CREATE INDEX "algorithms_difficulty_idx" ON "algorithms"("difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "related_algorithms_algorithmId_relatedId_key" ON "related_algorithms"("algorithmId", "relatedId");

-- CreateIndex
CREATE INDEX "practice_problems_algorithmId_idx" ON "practice_problems"("algorithmId");

-- CreateIndex
CREATE INDEX "external_links_algorithmId_idx" ON "external_links"("algorithmId");

-- CreateIndex
CREATE UNIQUE INDEX "complexity_references_notation_key" ON "complexity_references"("notation");

-- AddForeignKey
ALTER TABLE "algorithms" ADD CONSTRAINT "algorithms_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_algorithms" ADD CONSTRAINT "related_algorithms_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "algorithms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "related_algorithms" ADD CONSTRAINT "related_algorithms_relatedId_fkey" FOREIGN KEY ("relatedId") REFERENCES "algorithms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practice_problems" ADD CONSTRAINT "practice_problems_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "algorithms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "external_links" ADD CONSTRAINT "external_links_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "algorithms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
