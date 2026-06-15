import Link from "next/link";
import AppNav from "@/src/components/AppNav";

const HISTORY = [
  {
    id: "run-001",
    date: "Jun 12, 2026",
    profile: "INTJ-A",
    workEnv: "Fully Remote",
    topMatch: "Data Scientist / Systems Architect",
    matchPercent: 94,
    confidence: 87,
  },
  {
    id: "run-002",
    date: "Jun 8, 2026",
    profile: "ENFP-A",
    workEnv: "Hybrid",
    topMatch: "UX Research Lead / Design Strategist",
    matchPercent: 93,
    confidence: 79,
  },
  {
    id: "run-003",
    date: "May 29, 2026",
    profile: "INFJ-T",
    workEnv: "Fully Remote",
    topMatch: "Data Scientist / Systems Architect",
    matchPercent: 91,
    confidence: 83,
  },
];

export default function ResultsHistoryPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}>
      <AppNav active="results-history" />
      <main className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight">Results History</h1>
          <p className="text-sm md:text-base text-[#494455] mt-2">
            Review your previous career trajectory calculations.
          </p>
        </div>

        <div className="space-y-4">
          {HISTORY.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[#7a7486] uppercase tracking-widest">{entry.date}</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#5826d1] text-xs font-bold">
                      {entry.matchPercent}% Top Match
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#0b1c30]">{entry.topMatch}</h2>
                  <p className="text-sm text-[#494455] mt-1">
                    {entry.profile} · {entry.workEnv} · {entry.confidence}% confidence
                  </p>
                </div>
                <Link
                  href="/results"
                  className="shrink-0 inline-flex items-center justify-center border-2 border-[#5826d1] text-[#5826d1] font-semibold text-sm px-5 py-2 rounded hover:bg-[#5826d1]/5 transition-colors"
                >
                  View Results
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-[#5826d1] text-white font-semibold text-sm px-6 py-3 rounded hover:bg-[#4000ae] transition-colors"
          >
            Run New Search
          </Link>
        </div>
      </main>
    </div>
  );
}
