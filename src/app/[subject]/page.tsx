import Link from "next/link";
import { getSubjectById, type SubjectId } from "@/lib/subjects";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const subjectData = getSubjectById(subject as SubjectId);

  if (!subjectData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Subject not found
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link
          href="/"
          className="mb-6 inline-block font-semibold text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to home
        </Link>

        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            {subjectData.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subjectData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjectData.algorithms.map((algorithm) => (
            <Link
              key={algorithm.id}
              href={algorithm.route}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                {algorithm.name}
              </h2>
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Time:</span>
                <code className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700 dark:text-gray-200">
                  {algorithm.complexity.time}
                </code>
              </div>
              <div className="flex flex-wrap gap-2">
                {algorithm.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
