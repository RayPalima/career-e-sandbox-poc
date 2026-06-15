"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppNav from "@/src/components/AppNav";
import AssessmentForm from "@/src/components/AssessmentForm";

export default function SearchPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/results");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}>
      <AppNav active="search" />
      <main className="p-6 md:p-8">
        {isLoading ? (
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-[#e5eeff] border-t-[#5826d1] rounded-full animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-[#0b1c30] mb-2">Calculating Career Path Results</h2>
            <p className="text-sm text-[#494455] text-center max-w-md">
              Cross-referencing your personality profile against market data and environmental variables...
            </p>
            <div className="w-64 h-2 bg-[#e5eeff] rounded-full overflow-hidden mt-8">
              <div className="h-full bg-[#5826d1] rounded-full animate-pulse w-full" />
            </div>
          </div>
        ) : (
          <AssessmentForm layout="page" onSubmit={handleSubmit} />
        )}
      </main>
    </div>
  );
}
