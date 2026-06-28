import Link from "next/link";
import AppNav from "@/src/components/AppNav";

const HISTORY = [
  {
    id: "run-001",
    date: "Jun 12, 2026",
    time: "2:34 PM",
    mbtiType: "INTJ-A",
    workEnv: "Fully Remote",
    orgStructure: "Flat / Collaborative",
    targetEducation: "Master's Degree",
    sparketypes: { primary: "Maven", secondary: "Sage", anti: "Advisor" },
    enneagram: "Type 5 — Investigator",
    discStyle: "Conscientiousness (C)",
    taskDislikes: ["Cold Outreach / Sales", "Repetitive Manual Tasks"],
    topMatch: "Data Scientist / Systems Architect",
    matchPercent: 94,
    confidence: 87,
  },
  {
    id: "run-002",
    date: "Jun 8, 2026",
    time: "10:15 AM",
    mbtiType: "ENFP-A",
    workEnv: "Hybrid",
    orgStructure: "Flat / Collaborative",
    targetEducation: "Bachelor's Degree",
    sparketypes: { primary: "Performer", secondary: "Nurturer", anti: "Maker" },
    enneagram: "Type 3 — Achiever",
    discStyle: "Influence (I)",
    taskDislikes: ["Deep Independent Analysis", "Solitary Research"],
    topMatch: "UX Research Lead / Design Strategist",
    matchPercent: 93,
    confidence: 79,
  },
  {
    id: "run-003",
    date: "May 29, 2026",
    time: "4:52 PM",
    mbtiType: "INFJ-T",
    workEnv: "Fully Remote",
    orgStructure: "Hierarchical",
    targetEducation: "Master's Degree",
    sparketypes: { primary: "Sage", secondary: "Advisor", anti: "Warrior" },
    enneagram: "Type 4 — Individualist",
    discStyle: "Steadiness (S)",
    taskDislikes: ["Public Speaking / Presentations"],
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

        <div className="space-y-5">
          {HISTORY.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-xs font-bold text-[#7a7486] uppercase tracking-widest">
                      {entry.date} · {entry.time}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#dbeafe] text-[#1a56db] text-xs font-bold">
                      {entry.matchPercent}% Match
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#e2e8f0] text-[#494455] text-xs font-semibold">
                      {entry.confidence}% confidence
                    </span>
                  </div>
                  {/* Top Match label + career title */}
                  <p className="text-[10px] font-bold text-[#1a56db] uppercase tracking-widest mb-0.5">
                    Top Match
                  </p>
                  <h2 className="text-lg font-bold text-[#0b1c30]">{entry.topMatch}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 border border-[#e2e8f0] bg-white text-[#494455] font-semibold text-sm px-4 py-2 rounded hover:border-[#1a56db] hover:text-[#1a56db] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share / Export
                  </button>
                  <Link
                    href="/search?autorun=true"
                    className="inline-flex items-center justify-center border-2 border-[#1a56db] text-[#1a56db] font-semibold text-sm px-5 py-2 rounded hover:bg-[#1a56db]/5 transition-colors"
                  >
                    View Results
                  </Link>
                </div>
              </div>

              {/* Inputs grid */}
              <div className="border-t border-[#e2e8f0] pt-4">
                <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-3">Your Inputs</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                  <InputChip label="MBTI" value={entry.mbtiType} />
                  <InputChip label="Work Environment" value={entry.workEnv} />
                  <InputChip label="Organization" value={entry.orgStructure} />
                  <InputChip label="Education Target" value={entry.targetEducation} />
                  <InputChip label="Enneagram" value={entry.enneagram} />
                  <InputChip label="DiSC" value={entry.discStyle} />
                  <div className="col-span-2 sm:col-span-3">
                    <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-1">Sparketype</p>
                    <p className="text-sm text-[#0b1c30]">
                      Primary: <span className="font-semibold">{entry.sparketypes.primary}</span>
                      {" · "}Secondary: <span className="font-semibold">{entry.sparketypes.secondary}</span>
                      {" · "}Anti: <span className="font-semibold">{entry.sparketypes.anti}</span>
                    </p>
                  </div>
                  {entry.taskDislikes.length > 0 && (
                    <div className="col-span-2 sm:col-span-3">
                      <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-1">Task Dislikes</p>
                      <p className="text-sm text-[#0b1c30]">{entry.taskDislikes.join(", ")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-semibold text-sm px-6 py-3 rounded hover:bg-[#1648c4] transition-colors"
          >
            Run New Search
          </Link>
        </div>
      </main>
    </div>
  );
}

function InputChip({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm text-[#0b1c30] font-medium">{value}</p>
    </div>
  );
}
