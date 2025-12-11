import Link from "next/link";
import {
  getSubjectById,
  getAlgorithmByRoute,
  type SubjectId,
} from "@/lib/subjects";
import { getFullAlgorithmData } from "@/lib/algorithms/integration";
import { AlgorithmPageLayout } from "@/components/algorithm/AlgorithmPageLayout";
import { ExplanationPanel } from "@/components/algorithm/ExplanationPanel";
import { CodePanel } from "@/components/algorithm/CodePanel";
import { MonacoCodePanel } from "@/components/algorithm/MonacoCodePanel";
import { ComplexityPanel } from "@/components/algorithm/ComplexityPanel";
import { CharacteristicsPanel } from "@/components/algorithm/CharacteristicsPanel";
import { UseCasesPanel } from "@/components/algorithm/UseCasesPanel";
import { SortingDemo } from "@/components/debug/SortingDemo";

export default async function AlgorithmPage({
  params,
}: {
  params: Promise<{ subject: string; algorithm: string }>;
}) {
  const { subject, algorithm } = await params;
  const route = `/${subject}/${algorithm}`;
  const algorithmMeta = getAlgorithmByRoute(route);
  const subjectData = getSubjectById(subject as SubjectId);

  // Get full algorithm data from YAML for sorting algorithms
  const fullAlgorithmData =
    subject === "sorting" ? getFullAlgorithmData(algorithm) : null;

  if (!algorithmMeta || !subjectData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Algorithm not found
            </h1>
            <Link
              href="/"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Use full data if available, otherwise use placeholder
  const description =
    fullAlgorithmData?.description ??
    "This algorithm explanation is coming soon. We'll provide a detailed walkthrough of the concepts and implementation.";
  const explanationSteps = fullAlgorithmData?.explanation ?? [
    "Step-by-step breakdown",
    "Visual examples",
    "Common use cases",
  ];
  const pseudocode =
    fullAlgorithmData?.pseudocode ??
    `function example() {
  // Implementation coming soon
  return "Hello, World!";
}`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const implementations = fullAlgorithmData?.implementations;

  // Determine visualization content based on subject
  const visualizationContent =
    subject === "sorting" ? (
      <SortingDemo algorithmId={algorithmMeta.id} />
    ) : (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-300">
          Visualization coming soon
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link
          href={`/${subject}`}
          className="mb-6 inline-block font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to {subjectData.name}
        </Link>

        <AlgorithmPageLayout
          title={algorithmMeta.name}
          subjectName={subjectData.name}
          complexity={algorithmMeta.complexity}
          left={
            <>
              <ExplanationPanel
                title="How it works"
                description={description}
                bullets={explanationSteps}
              />
              <CodePanel language="pseudocode" code={pseudocode} />
              {/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */}
              {implementations && Object.keys(implementations).length > 0 && (
                <MonacoCodePanel code={implementations} />
              )}
              {/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */}
              {fullAlgorithmData && (
                <>
                  <ComplexityPanel complexity={fullAlgorithmData.complexity} />
                  <CharacteristicsPanel
                    characteristics={fullAlgorithmData.characteristics}
                    difficulty={fullAlgorithmData.difficulty}
                  />
                  <UseCasesPanel useCases={fullAlgorithmData.useCases} />
                </>
              )}
            </>
          }
          right={visualizationContent}
        />
      </div>
    </main>
  );
}
