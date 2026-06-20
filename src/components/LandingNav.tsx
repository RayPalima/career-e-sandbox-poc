"use client";

import Link from "next/link";

export default function LandingNav() {
  return (
    <nav className="bg-white border-b border-[#1a56db] px-6 md:px-8 h-14 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-7">
        <Link href="/" className="text-base font-bold text-[#0b1c30] tracking-tight">
          Career-E-Sandbox
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-[#494455] hover:text-[#0b1c30] transition-colors">How It Works</a>
          <a href="#frameworks" className="text-sm text-[#494455] hover:text-[#0b1c30] transition-colors">Frameworks</a>
          <a href="#your-results" className="text-sm text-[#494455] hover:text-[#0b1c30] transition-colors">Your Results</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-semibold text-[#1a56db] border-2 border-[#1a56db] px-4 py-1.5 rounded hover:bg-[#1a56db]/5 transition-colors hidden sm:inline-flex"
        >
          Log In
        </Link>
        <Link
          href="/create-account"
          className="bg-[#1a56db] text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-[#1648c4] transition-colors"
        >
          Create an Account
        </Link>
      </div>
    </nav>
  );
}
