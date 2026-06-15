"use client";

import { useRef, useState } from "react";
import AppNav from "@/src/components/AppNav";
import AssessmentForm, { type AssessmentValues } from "@/src/components/AssessmentForm";
import {
  FlaggedCard,
  IconCheckCircle,
  IconWarningCircle,
  IconXCircle,
  PrimaryCard,
  SecondaryCard,
} from "@/src/components/CareerCards";
import {
  ALL_RESULT_SETS,
  CAREER_DOMAINS,
  type CareerDomain,
  type ResultSet,
} from "@/src/lib/mockData";

// ── Helpers ───────────────────────────────────────────────────────────────────

function pickRandom(current?: ResultSet): ResultSet {
  if (!current || ALL_RESULT_SETS.length <= 1) {
    return ALL_RESULT_SETS[Math.floor(Math.random() * ALL_RESULT_SETS.length)];
  }
  const others = ALL_RESULT_SETS.filter((s) => s.id !== current.id);
  return others[Math.floor(Math.random() * others.length)];
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function ChevronLeft({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const [resultSet, setResultSet] = useState<ResultSet>(() => pickRandom());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"recommended" | "flagged">("recommended");
  const [domainFilter, setDomainFilter] = useState<CareerDomain>("All Domains");
  const [isCalculating, setIsCalculating] = useState(false);
  const isCalculatingRef = useRef(false);

  const recommended = resultSet.careers.filter(
    (c) =>
      c.status === "recommended" &&
      (domainFilter === "All Domains" || c.domain === domainFilter)
  );
  const flagged = resultSet.careers.filter(
    (c) =>
      c.status === "flagged" &&
      (domainFilter === "All Domains" || c.domain === domainFilter)
  );

  const [primaryCard, ...secondaryCards] = recommended;

  function handleSubmit() {
    if (isCalculatingRef.current) return;
    isCalculatingRef.current = true;
    setIsCalculating(true);
    setTimeout(() => {
      setResultSet((prev) => pickRandom(prev));
      setActiveTab("recommended");
      setDomainFilter("All Domains");
      setIsCalculating(false);
      isCalculatingRef.current = false;
    }, 700);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleValuesChange(_next: AssessmentValues) {
    // Form values are captured but don't drive result selection in this PoC.
    // A real implementation would pass them to the LLM agent here.
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}
    >
      <AppNav active="results" />

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* ── Collapsible Sidebar ── */}
        <div className={`relative flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-80" : "w-10"} hidden md:block`}>
          {/* Sidebar content */}
          <div
            className={`absolute inset-0 overflow-hidden transition-opacity duration-200 ${
              sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <AssessmentForm
              layout="sidebar"
              onValuesChange={handleValuesChange}
              onSubmit={handleSubmit}
              isLoading={isCalculating}
            />
          </div>

          {/* Collapse toggle tab — top-right corner */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="absolute top-3 -right-3 z-10 w-6 h-6 bg-white border border-[#e2e8f0] rounded-full shadow-sm flex items-center justify-center text-[#5826d1] hover:bg-[#f5f0ff] transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        </div>

        {/* ── Main Content ── */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight leading-tight">
                Career Path Results
              </h1>
            </div>

            {/* Domain filter */}
            <div className="shrink-0">
              <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-1.5">
                Filter Domain
              </p>
              <div className="relative">
                <select
                  value={domainFilter}
                  onChange={(e) => setDomainFilter(e.target.value as CareerDomain)}
                  className="appearance-none bg-white border border-[#e2e8f0] rounded-lg px-4 py-2 text-sm text-[#0b1c30] pr-10 shadow-sm focus:outline-none focus:border-[#5826d1] min-w-[168px] cursor-pointer"
                >
                  {CAREER_DOMAINS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#494455]">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-[#e2e8f0] mb-6">
            <button
              onClick={() => setActiveTab("recommended")}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors whitespace-nowrap -mb-px ${
                activeTab === "recommended"
                  ? "text-[#5826d1] border-b-2 border-[#5826d1]"
                  : "text-[#7a7486] hover:text-[#494455]"
              }`}
            >
              <IconCheckCircle className="w-4 h-4" />
              Recommended Paths ({recommended.length})
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors whitespace-nowrap -mb-px ${
                activeTab === "flagged"
                  ? "text-[#ba1a1a] border-b-2 border-[#ba1a1a]"
                  : "text-[#7a7486] hover:text-[#494455]"
              }`}
            >
              <IconXCircle className="w-4 h-4" />
              Non-Recommended ({flagged.length})
            </button>
          </div>

          {/* Cards */}
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isCalculating ? 0 : 1 }}
          >
            {isCalculating ? (
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-[#e2e8f0] h-64 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-[#e2e8f0] h-44 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ) : activeTab === "recommended" ? (
              recommended.length === 0 ? (
                <EmptyState domain={domainFilter} />
              ) : (
                <div className="space-y-4">
                  {primaryCard && <PrimaryCard career={primaryCard} />}
                  {secondaryCards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {secondaryCards.map((c) => (
                        <SecondaryCard key={c.id} career={c} />
                      ))}
                    </div>
                  )}
                </div>
              )
            ) : flagged.length === 0 ? (
              <EmptyState domain={domainFilter} />
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <IconWarningCircle className="w-5 h-5 text-[#d97706] shrink-0" />
                  <h2 className="text-2xl font-bold text-[#d97706]">Careers to Avoid</h2>
                </div>
                <p className="text-sm text-[#494455] mb-5">
                  These paths severely conflict with your personality profile and preferences.
                </p>
                <div className="space-y-4">
                  {flagged.map((c) => (
                    <FlaggedCard key={c.id} career={c} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyState({ domain }: { domain: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-[#e5eeff] flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-[#5826d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-[#0b1c30] font-semibold text-base mb-1">No results in this domain</p>
      <p className="text-sm text-[#7a7486]">
        No careers match the <span className="font-medium text-[#5826d1]">{domain}</span> filter in this result set.
        Try a different domain or click Submit for a new set.
      </p>
    </div>
  );
}
