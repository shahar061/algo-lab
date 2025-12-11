import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-[5rem] dark:text-white">
            AlgoLab
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Interactive algorithm visualizer
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.id}
              href={`/${subject.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {subject.name}
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {subject.description}
              </p>
              <div className="flex items-center font-semibold text-blue-600 dark:text-blue-400">
                View algorithms
                <span className="ml-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
