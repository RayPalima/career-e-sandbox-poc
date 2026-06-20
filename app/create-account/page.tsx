"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppNav from "@/src/components/AppNav";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, useAuth } from "@/src/components/AuthProvider";

const ENGAGEMENT_OPTIONS = [
  {
    id: "newsletter",
    label: "Subscribe to email updates",
    description: "Receive announcements about new features and application progress.",
  },
  {
    id: "focusGroup",
    label: "Participate in focus groups or surveys",
    description: "Help shape the product by sharing feedback through occasional surveys.",
  },
  {
    id: "demo",
    label: "Book a demo appointment",
    description: "Schedule a one-on-one session to explore the platform and provide direct feedback.",
  },
];

export default function CreateAccountPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [name, setName] = useState(DEFAULT_USER_NAME);
  const [email, setEmail] = useState(DEFAULT_USER_EMAIL);
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [engagement, setEngagement] = useState<Set<string>>(new Set());

  function toggleEngagement(id: string) {
    setEngagement((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn({ name, email });
    router.push("/search");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}>
      <AppNav active="dashboard" />
      <main className="flex items-center justify-center p-6 min-h-[calc(100vh-56px)]">
        <div className="w-full max-w-md bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-8">
          <h1 className="text-2xl font-bold text-[#0b1c30] mb-1">Create Account</h1>
          <p className="text-sm text-[#494455] mb-8">Start building your career sandbox profile.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] font-semibold text-[#7a7486] uppercase tracking-widest block mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#1a56db]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#7a7486] uppercase tracking-widest block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#1a56db]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#7a7486] uppercase tracking-widest block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#1a56db]"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#7a7486] uppercase tracking-widest block mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#1a56db]"
              />
            </div>

            {/* Engagement & Feedback */}
            <div className="border border-[#e2e8f0] rounded-lg p-4 space-y-3">
              <div className="mb-1">
                <p className="text-[11px] font-bold text-[#7a7486] uppercase tracking-widest">
                  Stay Involved <span className="text-[#7a7486] font-normal normal-case tracking-normal">(optional)</span>
                </p>
                <p className="text-xs text-[#494455] mt-1">
                  Help us build a better product. All options are completely optional.
                </p>
              </div>
              {ENGAGEMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
                    engagement.has(opt.id)
                      ? "border-[#1a56db]/30 bg-[#f8f9ff]"
                      : "border-[#e2e8f0] hover:border-[#1a56db]/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={engagement.has(opt.id)}
                    onChange={() => toggleEngagement(opt.id)}
                    className="w-4 h-4 mt-0.5 accent-[#1a56db] cursor-pointer shrink-0"
                  />
                  <div>
                    <span className="text-sm font-semibold text-[#0b1c30] block">{opt.label}</span>
                    <span className="text-xs text-[#494455]">{opt.description}</span>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a56db] text-white font-semibold text-sm py-3 rounded hover:bg-[#1648c4] transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-[#494455] text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1a56db] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
