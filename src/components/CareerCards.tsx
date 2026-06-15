"use client";

import { type CareerMatch, salaryTierGlyphs } from "@/src/lib/mockData";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconTrendUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
function IconTrendFlat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
function IconTrendDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17H5m8 0l-8-8 4 4 6-6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 17l-8-8" />
    </svg>
  );
}
function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}
function IconGradCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function IconXCircleInner({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}
function IconWarning({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

// ── Shared sub-components ──────────────────────────────────────────────────────

function MarketIcon({ outlook }: { outlook: CareerMatch["marketOutlook"] }) {
  if (outlook === "up") return <IconTrendUp className="w-4 h-4 text-[#16a34a] shrink-0" />;
  if (outlook === "down") return <IconTrendDown className="w-4 h-4 text-[#ba1a1a] shrink-0" />;
  return <IconTrendFlat className="w-4 h-4 text-[#7a7486] shrink-0" />;
}

function MarketLabel({ outlook, label }: { outlook: CareerMatch["marketOutlook"]; label: string }) {
  const color = outlook === "up" ? "text-[#16a34a]" : outlook === "down" ? "text-[#ba1a1a]" : "text-[#7a7486]";
  return (
    <span className={`flex items-center gap-1.5 ${color}`}>
      <MarketIcon outlook={outlook} />
      {label}
    </span>
  );
}

function SalaryChip({ tier, range }: { tier: CareerMatch["salaryTier"]; range: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[#006591]">
      <IconBriefcase className="w-4 h-4 shrink-0" />
      <span className="font-bold">{salaryTierGlyphs(tier)}</span>
      <span className="text-[#494455]">{range}</span>
    </span>
  );
}

function MatchChip({ pct, flagged }: { pct: number; flagged?: boolean }) {
  return flagged ? (
    <span className="px-2.5 py-1 rounded-full bg-[#fef2f2] text-[#ba1a1a] text-xs font-bold">{pct}% Match</span>
  ) : (
    <span className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#5826d1] text-xs font-bold">{pct}% Match</span>
  );
}

// ── Card variants ──────────────────────────────────────────────────────────────

export function PrimaryCard({ career }: { career: CareerMatch }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <MatchChip pct={career.matchPercent} />
        <span className="text-[11px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
        <span className="ml-auto text-[11px] font-semibold text-[#7a7486] bg-slate-100 px-2 py-0.5 rounded">{career.domain}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-[#0b1c30] mb-3">{career.title}</h2>
      <div className="flex flex-wrap gap-4 md:gap-6 text-sm mb-4">
        <MarketLabel outlook={career.marketOutlook} label={career.marketOutlookLabel} />
        <SalaryChip tier={career.salaryTier} range={career.salaryRange} />
        <span className={`flex items-center gap-1.5 text-sm ${career.educationMatchesAnchor ? "text-[#7a7486]" : "text-[#d97706]"}`}>
          <IconGradCap className={`w-4 h-4 shrink-0 ${career.educationMatchesAnchor ? "text-[#7a7486]" : "text-[#d97706]"}`} />
          {career.educationRequired}
          {!career.educationMatchesAnchor && <span className="text-[10px] font-bold text-[#d97706]">ABOVE ANCHOR</span>}
        </span>
      </div>
      <div className="border-t border-[#e2e8f0] pt-4">
        <p className="text-sm text-[#494455] leading-relaxed mb-4">
          This career aligns with your profile because {career.keySynergy.charAt(0).toLowerCase() + career.keySynergy.slice(1).replace(/\.$/, "")}
          {career.keyFriction ? `, which fits your strengths well. That said, ${career.keyFriction.charAt(0).toLowerCase() + career.keyFriction.slice(1).replace(/\.$/, "")}.` : "."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <IconShield className="w-4 h-4 text-[#006591] shrink-0" />
              <span className="text-[10px] font-bold text-[#006591] uppercase tracking-widest">Pros</span>
            </div>
            <ul className="space-y-2">
              {career.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#5826d1] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <IconXCircleInner className="w-4 h-4 text-[#ba1a1a] shrink-0" />
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest">Cons</span>
            </div>
            <ul className="space-y-2">
              {career.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#ba1a1a] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecondaryCard({ career }: { career: CareerMatch }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <MatchChip pct={career.matchPercent} />
        <span className="text-[11px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
      </div>
      <h3 className="text-base font-bold text-[#0b1c30] mb-3 leading-snug">{career.title}</h3>
      <div className="space-y-1.5 mb-3 text-sm">
        <MarketLabel outlook={career.marketOutlook} label={career.marketOutlookLabel} />
        <SalaryChip tier={career.salaryTier} range={career.salaryRange} />
        <span className={`flex items-center gap-1.5 text-sm ${career.educationMatchesAnchor ? "text-[#7a7486]" : "text-[#d97706]"}`}>
          <IconGradCap className="w-4 h-4 shrink-0" />
          {career.educationRequired}
          {!career.educationMatchesAnchor && <span className="text-[10px] font-bold text-[#d97706]">ABOVE ANCHOR</span>}
        </span>
      </div>
      <div className="border-t border-[#e2e8f0] pt-3 mt-auto">
        <p className="text-sm text-[#494455] leading-snug mb-4">
          This career aligns with your profile because {career.keySynergy.charAt(0).toLowerCase() + career.keySynergy.slice(1).replace(/\.$/, "")}
          {career.keyFriction ? `, which fits your strengths well. That said, ${career.keyFriction.charAt(0).toLowerCase() + career.keyFriction.slice(1).replace(/\.$/, "")}.` : "."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <IconShield className="w-3.5 h-3.5 text-[#006591] shrink-0" />
              <span className="text-[10px] font-bold text-[#006591] uppercase tracking-widest">Pros</span>
            </div>
            <ul className="space-y-1.5">
              {career.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#5826d1] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <IconXCircleInner className="w-3.5 h-3.5 text-[#ba1a1a] shrink-0" />
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest">Cons</span>
            </div>
            <ul className="space-y-1.5">
              {career.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#ba1a1a] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlaggedCard({ career }: { career: CareerMatch }) {
  return (
    <div className="bg-white rounded-xl border border-[#fca5a5] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <MatchChip pct={career.matchPercent} flagged />
        <span className="text-[11px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
        <span className="ml-auto text-[11px] font-semibold text-[#7a7486] bg-slate-100 px-2 py-0.5 rounded">{career.domain}</span>
      </div>
      <h3 className="text-lg font-bold text-[#0b1c30] mb-1">{career.title}</h3>

      <div className="flex flex-wrap gap-4 text-sm my-3">
        <MarketLabel outlook={career.marketOutlook} label={career.marketOutlookLabel} />
        <SalaryChip tier={career.salaryTier} range={career.salaryRange} />
      </div>

      {career.flagReason && (
        <div className="flex items-start gap-2 bg-[#fff7f7] border border-[#fca5a5] rounded-lg px-4 py-3 mb-4">
          <IconWarning className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
          <p className="text-sm text-[#7f1d1d] leading-relaxed">
            Based on your personality profile, this role is not recommended: {career.flagReason.charAt(0).toLowerCase() + career.flagReason.slice(1)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#fca5a5] pt-4">
        {career.pros.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-[#006591] uppercase tracking-widest mb-2">Pros</p>
            <ul className="space-y-1.5">
              {career.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#5826d1] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
        {career.cons.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-widest mb-2">Cons</p>
            <ul className="space-y-1.5">
              {career.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#ba1a1a] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function IconCheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function IconWarningCircle({ className }: { className?: string }) {
  return <IconWarning className={className} />;
}

export function IconXCircle({ className }: { className?: string }) {
  return <IconXCircleInner className={className} />;
}
