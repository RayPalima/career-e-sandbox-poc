"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/components/AuthProvider";

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    signOut();
    setOpen(false);
    router.push("/");
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-semibold text-[#5826d1] border-2 border-[#5826d1] px-4 py-1.5 rounded hover:bg-[#5826d1]/5 transition-colors hidden sm:inline-flex"
        >
          Log In
        </Link>
        <Link
          href="/create-account"
          className="bg-[#5826d1] text-white text-sm font-semibold px-4 py-1.5 rounded hover:bg-[#4000ae] transition-colors"
        >
          Create Account
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm font-semibold text-[#0b1c30] hover:text-[#5826d1] transition-colors"
      >
        <span>{user.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-[#e2e8f0] rounded-lg shadow-[0_4px_20px_rgba(15,23,42,0.08)] py-1 z-30">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2.5 text-sm text-[#494455] hover:bg-[#f8f9ff] hover:text-[#0b1c30] transition-colors"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2.5 text-sm text-[#494455] hover:bg-[#f8f9ff] hover:text-[#0b1c30] transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
