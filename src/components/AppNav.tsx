"use client";

import Link from "next/link";
import UserMenu from "@/src/components/UserMenu";

export type AppNavPage = "dashboard" | "search" | "results-history";

function navLinkClass(active: boolean) {
  return active
    ? "text-sm text-[#1a56db] font-semibold border-b-2 border-[#1a56db] pb-0.5"
    : "text-sm text-[#494455] hover:text-[#0b1c30] transition-colors";
}

export default function AppNav({ active }: { active: AppNavPage }) {
  return (
    <nav className="bg-white border-b border-[#1a56db] px-6 md:px-8 h-14 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className={navLinkClass(active === "dashboard")}>Home</Link>
        <Link href="/search" className={navLinkClass(active === "search")}>Search</Link>
        <Link href="/results-history" className={navLinkClass(active === "results-history")}>
          Results History
        </Link>
      </div>
      <Link
        href="/dashboard"
        className="text-lg font-bold text-[#0b1c30] absolute left-1/2 -translate-x-1/2 hidden md:block"
      >
        Career-E-Sandbox
      </Link>
      <UserMenu />
    </nav>
  );
}
