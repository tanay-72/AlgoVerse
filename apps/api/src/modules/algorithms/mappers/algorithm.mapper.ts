import type { Algorithm, AlgorithmSummary } from '@algoverse/shared-types';
import type { AlgorithmDetailRecord, AlgorithmSummaryRecord } from '../algorithms.repository';

export class AlgorithmMapper {
  static toSummary(entity: AlgorithmSummaryRecord): AlgorithmSummary {
    return {
      id: entity.id,
      slug: entity.slug,
      name: entity.name,
      summary: entity.summary,
      difficulty: entity.difficulty,
      tags: entity.tags,
      timeComplexityAverage: entity.timeComplexityAverage,
      spaceComplexity: entity.spaceComplexity,
      category: entity.category,
    };
  }

  static toDetail(entity: AlgorithmDetailRecord): Algorithm {
    return {
      ...this.toSummary(entity),
      introduction: entity.introduction,
      problemStatement: entity.problemStatement,
      intuition: entity.intuition,
      stepByStep: entity.stepByStep,
      dryRun: entity.dryRun,
      complexity: {
        best: entity.timeComplexityBest,
        average: entity.timeComplexityAverage,
        worst: entity.timeComplexityWorst,
        space: entity.spaceComplexity,
      },
      advantages: entity.advantages,
      disadvantages: entity.disadvantages,
      applications: entity.applications,
      commonMistakes: entity.commonMistakes,
      visualizationNotes: entity.visualizationNotes,
      implementation: {
        cpp: entity.cppCode,
        python: entity.pythonCode,
      },
      practiceProblems: entity.practiceProblems.map((problem) => ({
        id: problem.id,
        title: problem.title,
        url: problem.url,
        platform: problem.platform,
        difficulty: problem.difficulty,
      })),
      externalLinks: entity.externalLinks.map((link) => ({
        id: link.id,
        platform: link.platform,
        label: link.label,
        url: link.url,
      })),
      relatedAlgorithms: entity.relatedFrom.map((relation) => this.toSummary(relation.related)),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }
}
