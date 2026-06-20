"use client";

import { useEffect, useRef, useState } from "react";
import AppNav from "@/src/components/AppNav";
import AssessmentForm, { type AssessmentValues } from "@/src/components/AssessmentForm";
import {
  FlaggedCard,
  FavouriteCard,
  IconCheckCircle,
  IconXCircle,
  PrimaryCard,
  SecondaryCard,
} from "@/src/components/CareerCards";
import {
  ALL_RESULT_SETS,
  CAREER_DOMAINS,
  type CareerDomain,
  type CareerMatch,
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

function sortAlpha(careers: CareerMatch[]): CareerMatch[] {
  return [...careers].sort((a, b) => a.title.localeCompare(b.title));
}

function StarFilledIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
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

type View = "form" | "sliding" | "loading" | "results";

export default function SearchPage() {
  const [preload, setPreload] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPreload(params.get("restore") === "true");
  }, []);

  const [view, setView] = useState<View>("form");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"recommended" | "flagged">("recommended");
  const [domainFilter, setDomainFilter] = useState<CareerDomain>("All Domains");
  const [isCalculating, setIsCalculating] = useState(false);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [resultSet, setResultSet] = useState<ResultSet>(() => pickRandom());
  const isCalculatingRef = useRef(false);

  // ── Derived data ──
  const allRecommended = sortAlpha(
    resultSet.careers.filter(
      (c) =>
        c.status === "recommended" &&
        (domainFilter === "All Domains" || c.domain === domainFilter)
    )
  );

  const flagged = resultSet.careers
    .filter(
      (c) =>
        c.status === "flagged" &&
        (domainFilter === "All Domains" || c.domain === domainFilter)
    )
    .sort((a, b) => a.matchPercent - b.matchPercent)
    .slice(0, 10);

  const primaryCard = allRecommended.length > 0 ? allRecommended[0] : undefined;
  const primaryIsFavourited = primaryCard ? favourites.has(primaryCard.id) : false;
  const favouriteCards = allRecommended.filter((c) => favourites.has(c.id));
  const gridCards = allRecommended.slice(1).filter((c) => !favourites.has(c.id));

  function toggleFavourite(id: string) {
    setFavourites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Submit from form page ──
  // The page form overlay fades+slides out while the sidebar expands from the left.
  // All elements stay in the DOM — CSS transitions do the actual animating.
  function handleFirstSubmit() {
    setView("sliding"); // overlay fades out, sidebar expands, results panel appears

    // After the 500ms slide animation, mark as "loading" (visual state unchanged)
    setTimeout(() => setView("loading"), 500);

    // 3 seconds from first click → show results
    setTimeout(() => {
      setResultSet(pickRandom());
      setView("results");
    }, 3000);
  }

  // ── Re-submit from sidebar ──
  function handleReSubmit() {
    if (isCalculatingRef.current) return;
    isCalculatingRef.current = true;
    setIsCalculating(true);
    setTimeout(() => {
      setResultSet((prev) => pickRandom(prev));
      setActiveTab("recommended");
      setDomainFilter("All Domains");
      setFavourites(new Set());
      setIsCalculating(false);
      isCalculatingRef.current = false;
    }, 700);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleValuesChange(_next: AssessmentValues) {}

  const isForm = view === "form";
  const showResults = view === "results";

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}
    >
      <AppNav active="search" />

      {/*
        Single persistent flex container — never unmounts.
        The page-form overlay sits on top (absolute, z-10).
        When the user submits, the overlay slides left and fades out,
        the sidebar expands from width:0, and the results panel fades in.
        All via CSS transitions on the same DOM nodes.

        NOTE: overflow:hidden is on a wrapper around the form overlay only,
        not the parent flex container, so the toggle button (a sibling) is
        never clipped.
      */}
      <div className="relative flex min-h-[calc(100vh-56px)]">

        {/* ── Page-form overlay ───────────────────────────────────────────── */}
        {/* Wrapped in its own overflow:hidden so translateX doesn't bleed out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            overflow: "hidden",
            pointerEvents: isForm ? "auto" : "none",
          }}
        >
          <div
            style={{
              height: "100%",
              overflowY: "auto",
              background: "#F8FAFC",
              opacity: isForm ? 1 : 0,
              transform: isForm ? "translateX(0)" : "translateX(-80px)",
              transition: "opacity 450ms ease, transform 450ms ease",
            }}
          >
            <div className="p-6 md:p-8">
              {preload && (
                <div className="max-w-5xl mx-auto mb-5">
                  <div className="flex items-start gap-3 bg-[#dbeafe] border border-[#1a56db]/20 rounded-xl px-5 py-4">
                    <svg className="w-5 h-5 text-[#1a56db] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-[#1a56db]">Your previous search has been pre-loaded</p>
                      <p className="text-xs text-[#494455] mt-0.5">
                        We restored your inputs from your last search on <span className="font-semibold">Jun 12, 2026</span>.
                        Adjust below or submit as-is.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <AssessmentForm
                layout="page"
                preload={preload}
                onValuesChange={handleValuesChange}
                onSubmit={handleFirstSubmit}
              />
            </div>
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        {/* Starts at width:0 (hidden behind the overlay), expands on submit.
            overflow:hidden clips the 320px inner content during animation.
            NOTE: no toggle button inside here — it lives as a sibling below. */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{
            width: isForm ? 0 : sidebarOpen ? "320px" : "0px",
            transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
          }}
        >
          {/* Fixed-width inner so the form content never squishes */}
          <div style={{ width: "320px", height: "100%" }}>
            <AssessmentForm
              layout="sidebar"
              preload={preload}
              onValuesChange={handleValuesChange}
              onSubmit={handleReSubmit}
              isLoading={isCalculating}
            />
          </div>
        </div>

        {/* ── Sidebar toggle button ────────────────────────────────────────── */}
        {/* Sibling to the sidebar so it is never clipped by sidebar's overflow:hidden.
            Its `left` tracks the sidebar width with the same transition. */}
        {!isForm && (
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="hidden md:flex absolute top-3 z-20 w-6 h-6 bg-white border border-[#e2e8f0] rounded-full shadow-sm items-center justify-center text-[#1a56db] hover:bg-[#eff6ff]"
            style={{
              left: sidebarOpen ? "calc(320px - 12px)" : "4px",
              transition: "left 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {sidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        )}

        {/* ── Results / Loading panel ──────────────────────────────────────── */}
        {/* Fades in as the sidebar expands; always takes remaining flex space */}
        <main
          className="flex-1 p-6 md:p-8 overflow-y-auto min-w-0"
          style={{
            opacity: isForm ? 0 : 1,
            transition: "opacity 400ms ease 250ms", // slight delay so sidebar leads
          }}
        >
          {!showResults ? (
            /* ── Loading screen ── */
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-12 h-12 border-4 border-[#dbeafe] border-t-[#1a56db] rounded-full animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-[#0b1c30] mb-2">
                Calculating Career Path Results
              </h2>
              <p className="text-sm text-[#494455] text-center max-w-md">
                Cross-referencing your personality profile against market data and environmental
                variables...
              </p>
              <div className="w-64 h-2 bg-[#dbeafe] rounded-full overflow-hidden mt-8">
                <div className="h-full bg-[#1a56db] rounded-full animate-pulse w-full" />
              </div>
            </div>
          ) : (
            /* ── Results ── */
            <>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight leading-tight">
                  Career Path Results
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 border border-[#e2e8f0] bg-white text-[#494455] font-semibold text-sm px-4 py-2 rounded-lg shadow-sm hover:border-[#1a56db] hover:text-[#1a56db] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share / Export
                  </button>
                  <div>
                    <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-1.5">
                      Filter Domain
                    </p>
                    <div className="relative">
                    <select
                      value={domainFilter}
                      onChange={(e) => setDomainFilter(e.target.value as CareerDomain)}
                      className="appearance-none bg-white border border-[#e2e8f0] rounded-lg px-4 py-2 text-sm text-[#0b1c30] pr-10 shadow-sm focus:outline-none focus:border-[#1a56db] min-w-[168px] cursor-pointer"
                    >
                      {CAREER_DOMAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#494455]">
                      <ChevronDown />
                    </span>
                  </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[#e2e8f0] mb-6">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setActiveTab("recommended")}
                    className={`flex items-center gap-2 pb-3 text-sm font-semibold transition-colors whitespace-nowrap -mb-px ${
                      activeTab === "recommended"
                        ? "text-[#1a56db] border-b-2 border-[#1a56db]"
                        : "text-[#7a7486] hover:text-[#494455]"
                    }`}
                  >
                    <IconCheckCircle className="w-4 h-4" />
                    Recommended Paths ({allRecommended.length})
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
                {activeTab === "recommended" && (
                  <p className="text-[11px] text-[#7a7486] pb-3 hidden sm:flex items-center gap-1 shrink-0">
                    <StarFilledIcon className="w-3 h-3 text-[#f59e0b]" />
                    Star a result to save it to your favourites
                  </p>
                )}
              </div>

              <div className="transition-opacity duration-300" style={{ opacity: isCalculating ? 0 : 1 }}>
                {isCalculating ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-[#e2e8f0] h-64 animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] h-44 animate-pulse" />
                      ))}
                    </div>
                  </div>
                ) : activeTab === "recommended" ? (
                  allRecommended.length === 0 ? (
                    <EmptyState domain={domainFilter} />
                  ) : (
                    <div className="space-y-6">
                      {favouriteCards.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <StarFilledIcon className="w-5 h-5 text-[#f59e0b]" />
                            <h2 className="text-base font-bold text-[#0b1c30]">Favourites ({favouriteCards.length})</h2>
                          </div>
                          <p className="text-sm text-[#494455] mb-4">
                            These are the favourites from your current results, and will be added to the list on your main dashboard.
                          </p>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {favouriteCards.map((c) => (
                              <FavouriteCard key={c.id} career={c} favourites={favourites} onToggleFavourite={toggleFavourite} />
                            ))}
                          </div>
                          <div className="border-t border-[#e2e8f0] mt-6" />
                        </div>
                      )}

                      {primaryCard && !primaryIsFavourited && (
                        <div>
                          <h2 className="text-2xl font-bold text-[#0b1c30] mb-1">Best Match</h2>
                          <p className="text-sm text-[#494455] mb-4">
                            This career path is the most aligned with your personality and preferences.
                          </p>
                          <PrimaryCard career={primaryCard} favourites={favourites} onToggleFavourite={toggleFavourite} />
                        </div>
                      )}

                      {gridCards.length > 0 && (
                        <div>
                          <h2 className="text-lg font-semibold text-[#0b1c30] mb-1">Other Considerable Options</h2>
                          <p className="text-sm text-[#494455] mb-4">
                            Additional career paths that match your profile well, worth exploring further.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gridCards.map((c) => (
                              <SecondaryCard key={c.id} career={c} favourites={favourites} onToggleFavourite={toggleFavourite} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                ) : flagged.length === 0 ? (
                  <EmptyState domain={domainFilter} />
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0b1c30] mb-1">Careers to Avoid</h2>
                    <p className="text-sm text-[#494455] mb-5">
                      These paths severely conflict with your personality profile and preferences.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {flagged.map((c) => (
                        <FlaggedCard key={c.id} career={c} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState({ domain }: { domain: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-[#1a56db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-[#0b1c30] font-semibold text-base mb-1">No results in this domain</p>
      <p className="text-sm text-[#7a7486]">
        No careers match the <span className="font-medium text-[#1a56db]">{domain}</span> filter.
        Try a different domain or submit for a new set.
      </p>
    </div>
  );
}
