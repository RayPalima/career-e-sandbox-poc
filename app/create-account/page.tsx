"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppNav from "@/src/components/AppNav";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_NAME, useAuth } from "@/src/components/AuthProvider";

export default function CreateAccountPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [name, setName] = useState(DEFAULT_USER_NAME);
  const [email, setEmail] = useState(DEFAULT_USER_EMAIL);
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn({ name, email });
    router.push("/search");
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}>
      <AppNav active="home" />
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
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#5826d1]"
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
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#5826d1]"
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
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#5826d1]"
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
                className="w-full border border-[#e2e8f0] rounded px-3 py-2.5 text-sm text-[#0b1c30] focus:outline-none focus:border-[#5826d1]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#5826d1] text-white font-semibold text-sm py-3 rounded hover:bg-[#4000ae] transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-[#494455] text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#5826d1] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
