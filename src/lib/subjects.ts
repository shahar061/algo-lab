import { generateSortingSubject } from "./algorithms/integration";

export type SubjectId = "sorting" | "pathfinding" | "graphs" | "trees";

export interface AlgorithmMeta {
  id: string; // URL-safe identifier, e.g. "bubble-sort"
  name: string; // Display name, e.g. "Bubble Sort"
  subjectId: SubjectId;
  complexity: {
    time: string;
    space: string;
  };
  tags: string[];
  route: string; // e.g. "/sorting/bubble-sort"
}

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  algorithms: AlgorithmMeta[];
}

// Generate sorting subject from YAML data
const sortingSubject = generateSortingSubject();

export const SUBJECTS: Subject[] = [sortingSubject];

export function getSubjectById(id: SubjectId): Subject | undefined {
  return SUBJECTS.find((subject) => subject.id === id);
}

export function getAlgorithmByRoute(route: string): AlgorithmMeta | undefined {
  for (const subject of SUBJECTS) {
    const algorithm = subject.algorithms.find((algo) => algo.route === route);
    if (algorithm) {
      return algorithm;
    }
  }
  return undefined;
}
