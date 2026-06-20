"use client";

import Link from "next/link";
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

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={className}
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
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
    <span className="px-2.5 py-1 rounded-full bg-[#dbeafe] text-[#1a56db] text-xs font-bold">{pct}% Match</span>
  );
}

function FavouriteButton({
  careerId,
  favourites,
  onToggle,
}: {
  careerId: string;
  favourites: Set<string>;
  onToggle: (id: string) => void;
}) {
  const isFav = favourites.has(careerId);
  return (
    <button
      type="button"
      onClick={() => onToggle(careerId)}
      title={isFav ? "Remove from favourites" : "Add to favourites"}
      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
        isFav
          ? "border-[#f59e0b] text-[#f59e0b] bg-[#fffbeb]"
          : "border-[#e2e8f0] text-[#7a7486] hover:border-[#f59e0b] hover:text-[#f59e0b]"
      }`}
    >
      <StarIcon filled={isFav} className="w-4 h-4" />
    </button>
  );
}

// ── Card variants ──────────────────────────────────────────────────────────────

export function PrimaryCard({
  career,
  favourites,
  onToggleFavourite,
}: {
  career: CareerMatch;
  favourites: Set<string>;
  onToggleFavourite: (id: string) => void;
}) {
  const href = `/career/${encodeURIComponent(career.id)}`;
  return (
    <Link href={href} className="block bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.08)] hover:border-[#1a56db]/30 transition-all group">
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-[#1a56db]">
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Best Match
          </span>
          <MatchChip pct={career.matchPercent} />
          <span className="text-[11px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
          <span className="ml-auto" onClick={(e) => e.preventDefault()}>
            <FavouriteButton careerId={career.id} favourites={favourites} onToggle={onToggleFavourite} />
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#0b1c30] mb-3 group-hover:text-[#1a56db] transition-colors">{career.title}</h2>
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
                    <span className="text-[#1a56db] mt-0.5 leading-none font-bold shrink-0">•</span>
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
          <p className="text-xs text-[#1a56db] font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            View personality fit rankings →
          </p>
        </div>
      </div>
    </Link>
  );
}

export function SecondaryCard({
  career,
  favourites,
  onToggleFavourite,
}: {
  career: CareerMatch;
  favourites: Set<string>;
  onToggleFavourite: (id: string) => void;
}) {
  const href = `/career/${encodeURIComponent(career.id)}`;
  return (
    <Link href={href} className="block bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5 hover:shadow-[0_4px_20px_rgba(15,23,42,0.08)] hover:border-[#1a56db]/30 transition-all group">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-2">
          <MatchChip pct={career.matchPercent} />
          <span className="text-[11px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
          <span className="ml-auto shrink-0" onClick={(e) => e.preventDefault()}>
            <FavouriteButton careerId={career.id} favourites={favourites} onToggle={onToggleFavourite} />
          </span>
        </div>
        <h3 className="text-base font-bold text-[#0b1c30] mb-3 leading-snug group-hover:text-[#1a56db] transition-colors">{career.title}</h3>
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
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <IconShield className="w-3.5 h-3.5 text-[#006591] shrink-0" />
              <span className="text-[10px] font-bold text-[#006591] uppercase tracking-widest">Pros</span>
            </div>
            <ul className="space-y-1.5">
              {career.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-[#0b1c30]">
                  <span className="text-[#1a56db] mt-0.5 leading-none font-bold shrink-0">•</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 mb-2 mt-3">
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
          <p className="text-xs text-[#1a56db] font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            View personality fit rankings →
          </p>
        </div>
      </div>
    </Link>
  );
}

export function FavouriteCard({
  career,
  favourites,
  onToggleFavourite,
}: {
  career: CareerMatch;
  favourites: Set<string>;
  onToggleFavourite: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-shadow flex flex-col">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full bg-[#dbeafe] text-[#1a56db] text-[11px] font-bold">{career.matchPercent}% Match</span>
        <span className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
        <FavouriteButton careerId={career.id} favourites={favourites} onToggle={onToggleFavourite} />
      </div>
      <h3 className="text-sm font-bold text-[#0b1c30] mb-2 leading-snug">{career.title}</h3>
      <div className="space-y-1 mb-2 text-xs">
        <MarketLabel outlook={career.marketOutlook} label={career.marketOutlookLabel} />
        <SalaryChip tier={career.salaryTier} range={career.salaryRange} />
        <span className={`flex items-center gap-1.5 ${career.educationMatchesAnchor ? "text-[#7a7486]" : "text-[#d97706]"}`}>
          <IconGradCap className="w-3.5 h-3.5 shrink-0" />
          {career.educationRequired}
          {!career.educationMatchesAnchor && <span className="text-[9px] font-bold text-[#d97706]">ABOVE ANCHOR</span>}
        </span>
      </div>
      <div className="border-t border-[#e2e8f0] pt-2 mt-auto">
        <p className="text-[11px] text-[#494455] leading-snug mb-2">
          {career.keySynergy}
          {career.keyFriction ? ` — ${career.keyFriction}` : ""}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {career.pros.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <IconShield className="w-3 h-3 text-[#006591] shrink-0" />
                <span className="text-[9px] font-bold text-[#006591] uppercase tracking-widest">Pros</span>
              </div>
              <ul className="space-y-0.5">
                {career.pros.slice(0, 3).map((p) => (
                  <li key={p} className="flex items-start gap-1 text-[10px] text-[#0b1c30] leading-snug">
                    <span className="text-[#1a56db] leading-none font-bold shrink-0 mt-px">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {career.cons.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <IconXCircleInner className="w-3 h-3 text-[#ba1a1a] shrink-0" />
                <span className="text-[9px] font-bold text-[#ba1a1a] uppercase tracking-widest">Cons</span>
              </div>
              <ul className="space-y-0.5">
                {career.cons.slice(0, 3).map((c) => (
                  <li key={c} className="flex items-start gap-1 text-[10px] text-[#0b1c30] leading-snug">
                    <span className="text-[#ba1a1a] leading-none font-bold shrink-0 mt-px">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export function FlaggedCard({ career }: { career: CareerMatch }) {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] transition-shadow flex flex-col gap-2.5">

      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 rounded-full bg-[#fef2f2] text-[#9f1239] text-[11px] font-bold">{career.matchPercent}% Match</span>
        <span className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest">{career.sector}</span>
      </div>

      <h3 className="text-sm font-bold text-[#0b1c30] leading-snug">{career.title}</h3>

      {career.flagReason && (
        <p className="text-[11px] text-[#0b1c30] leading-relaxed">
          {career.flagReason}
        </p>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-[#494455]">
        <MarketLabel outlook={career.marketOutlook} label={career.marketOutlookLabel} />
        <SalaryChip tier={career.salaryTier} range={career.salaryRange} />
      </div>

      {career.cons.length > 0 && (
        <div className="border-t border-[#e2e8f0] pt-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconXCircleInner className="w-3 h-3 text-[#ba1a1a] shrink-0" />
            <span className="text-[9px] font-bold text-[#ba1a1a] uppercase tracking-widest">Cons</span>
          </div>
          <ul className="space-y-1">
            {career.cons.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-[11px] text-[#0b1c30] leading-snug">
                <span className="text-[#ba1a1a] mt-0.5 leading-none font-bold shrink-0">•</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
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
