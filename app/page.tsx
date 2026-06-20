import Link from "next/link";
import LandingNav from "@/src/components/LandingNav";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconBrain() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-3.22-3.22A2.25 2.25 0 0015 10.22V3.104M19.8 15a2.25 2.25 0 01.45 2.247A10.5 10.5 0 0112 21a10.5 10.5 0 01-8.25-3.753 2.25 2.25 0 01.45-2.247L7.5 13.5m4.5 0l-1.5 1.5m4.5-1.5l1.5 1.5" />
    </svg>
  );
}

function IconSliders() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  );
}

function IconChartBar() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
    </svg>
  );
}

const RESULTS_CALLOUTS = [
  {
    title: "Match percentage",
    body: "See how closely each career aligns with your personality profile, ranked from strongest to weakest fit.",
  },
  {
    title: "Pros & cons",
    body: "Every result explains why a path works for you and what might not, tied directly to your traits and preferences.",
  },
  {
    title: "Market data",
    body: "Salary range, job growth outlook, and education required are shown for every career on the list.",
  },
  {
    title: "Recommended & non-recommended",
    body: "Browse careers to pursue and careers to avoid, each with a clear breakdown of why they fit or don't.",
  },
];

function ResultsPreviewMock() {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F8FAFC] border-b border-[#e2e8f0]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#fcd34d]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" />
        <span className="ml-2 text-[10px] text-[#7a7486] font-medium">Career Path Results</span>
      </div>

      <div className="flex min-h-[340px]">
        {/* Mini sidebar */}
        <div className="w-[72px] shrink-0 border-r border-[#e2e8f0] bg-white p-2 hidden sm:block">
          <p className="text-[7px] font-bold text-[#0b1c30] leading-tight mb-2">Personality Assessment</p>
          {["MBTI", "Sparketype", "Big Five", "Ennea.", "DiSC"].map((label) => (
            <div key={label} className="text-[7px] text-[#7a7486] py-1 border-b border-[#f1f5f9] truncate">
              {label}
            </div>
          ))}
          <div className="mt-2 bg-[#1a56db] rounded text-[7px] text-white text-center py-1 font-semibold">Submit</div>
        </div>

        {/* Main results area */}
        <div className="flex-1 bg-[#F8FAFC] p-3 sm:p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] leading-tight">Career Path Results</h3>
            <div className="shrink-0 text-[8px] bg-white border border-[#e2e8f0] rounded px-2 py-1 text-[#494455]">
              All Domains ▾
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-[#e2e8f0] mb-3 text-[9px] sm:text-[10px] font-semibold">
            <span className="text-[#1a56db] border-b-2 border-[#1a56db] pb-1.5">Recommended (5)</span>
            <span className="text-[#7a7486] pb-1.5">Non-Recommended (5)</span>
          </div>

          {/* Primary card */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-3 mb-2">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9px] font-bold text-[#1a56db] bg-[#dbeafe] px-2 py-0.5 rounded-full">96% Match</span>
              <span className="text-[8px] font-bold text-[#7a7486] uppercase">Technology</span>
            </div>
            <p className="text-xs font-bold text-[#0b1c30] mb-2">Data Scientist / ML Engineer</p>
            <div className="flex flex-wrap gap-2 text-[8px] text-[#494455] mb-2">
              <span className="text-[#16a34a]">↑ High Growth (14% YoY)</span>
              <span className="text-[#006591] font-bold">$$$$</span>
              <span>$115k – $170k</span>
              <span>MS Preferred</span>
            </div>
            <p className="text-[9px] text-[#494455] leading-snug border-t border-[#e2e8f0] pt-2">
              This career aligns with your profile because deep systems thinking perfectly matches ML model architecture work.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-2 text-[8px]">
              <div>
                <p className="font-bold text-[#006591] uppercase mb-1">Pros</p>
                <p className="text-[#0b1c30]">• Remote-friendly industry standard</p>
                <p className="text-[#0b1c30]">• High analytical autonomy</p>
              </div>
              <div>
                <p className="font-bold text-[#ba1a1a] uppercase mb-1">Cons</p>
                <p className="text-[#0b1c30]">• Stakeholder presentations</p>
                <p className="text-[#0b1c30]">• Sprint interruptions</p>
              </div>
            </div>
          </div>

          {/* Secondary card stubs */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { pct: "89%", title: "Quantitative Research Analyst" },
              { pct: "85%", title: "Cybersecurity Architect" },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-lg border border-[#e2e8f0] p-2">
                <span className="text-[8px] font-bold text-[#1a56db] bg-[#dbeafe] px-1.5 py-0.5 rounded-full">{card.pct} Match</span>
                <p className="text-[9px] font-bold text-[#0b1c30] mt-1 leading-tight">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <IconBrain />,
    title: "Input Your Results",
    body: "Plug in your scores from the personality tests you've already taken. We cover 8 different models, including MBTI, Big Five, and CliftonStrengths.",
  },
  {
    step: "02",
    icon: <IconSliders />,
    title: "Tweak the Sandbox",
    body: "Set your personal dealbreakers. Filter by what matters to you: remote vs. in-office, how much schooling you want to do, and the tasks you absolutely hate.",
  },
  {
    step: "03",
    icon: <IconChartBar />,
    title: "See Your Matches",
    body: "Get a ranked list of careers that line up with your traits. We show you exactly why a job is a good fit (and why it might not be), along with real job market data.",
  },
];

const FRAMEWORKS = [
  {
    name: "Astrology",
    category: "Celestial Influence",
    descriptor: "Sun-sign archetypes as a supplementary lens.",
    index: "01",
  },
  {
    name: "Big Five Model",
    category: "Trait Psychology",
    descriptor: "OCEAN: the gold standard in personality science.",
    index: "02",
  },
  {
    name: "Chinese Zodiac",
    category: "Eastern Framework",
    descriptor: "12-animal cycle with 5-element elemental modifiers.",
    index: "03",
  },
  {
    name: "CliftonStrengths",
    category: "Talent Profile",
    descriptor: "34-theme strengths inventory from Gallup research.",
    index: "04",
  },
  {
    name: "DiSC Assessment",
    category: "Behavioral Style",
    descriptor: "Dominance, Influence, Steadiness, Conscientiousness.",
    index: "05",
  },
  {
    name: "Enneagram",
    category: "Motivational Type",
    descriptor: "9 types mapping core fears, desires, and growth paths.",
    index: "06",
  },
  {
    name: "Myers-Briggs (MBTI)",
    category: "Personality Type",
    descriptor: "16 cognitive preference types across 4 dichotomies.",
    index: "07",
  },
  {
    name: "Sparketype",
    category: "Energy & Purpose",
    descriptor: "Identifies the work that makes you feel most alive.",
    index: "08",
  },
];

// ── Landing Page ───────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "var(--font-geist-sans, Geist, sans-serif)" }}
    >

      <LandingNav />

      {/* ══ Hero ════════════════════════════════════════════════════════════ */}
      <section className="bg-white pt-20 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="font-bold leading-[1.1] tracking-tight mb-6">
            <span className="block text-4xl sm:text-5xl md:text-[3.75rem] text-[#0b1c30]">
              Need Career Clarity?
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl text-[#1a56db] mt-2">
              Explore the possibilities.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#494455] leading-relaxed max-w-2xl mx-auto mb-10">
            Career E-Sandbox takes results from popular personality tests and gives you visibility into career paths for your profile.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create-account"
              className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-semibold text-base px-7 py-3.5 rounded hover:bg-[#1648c4] transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            >
              Start your search
              <IconArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ How It Works ════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-[#1a56db] py-20 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-xl border border-[#e2e8f0] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-shadow"
              >
                {/* Step number + icon */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#1a56db]">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-[#1a56db] leading-none select-none">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0b1c30] mb-2">{step.title}</h3>
                <p className="text-sm text-[#494455] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9 Frameworks ════════════════════════════════════════════════════ */}
      <section id="frameworks" className="bg-white border-t border-[#e2e8f0] py-20 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight">
              8 Personality Frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FRAMEWORKS.map((fw) => (
              <div
                key={fw.name}
                className="group flex items-start gap-4 bg-white border border-[#e2e8f0] rounded-xl p-5 hover:border-[#1a56db]/40 hover:shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all"
              >
                <span className="shrink-0 w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#e2e8f0] flex items-center justify-center text-[10px] font-bold text-[#7a7486] group-hover:bg-[#dbeafe] group-hover:text-[#1a56db] group-hover:border-[#1a56db]/30 transition-colors">
                  {fw.index}
                </span>
                <div>
                  <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-widest mb-0.5">
                    {fw.category}
                  </p>
                  <p className="text-sm font-bold text-[#0b1c30] mb-1">{fw.name}</p>
                  <p className="text-xs text-[#494455] leading-relaxed">{fw.descriptor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Results Preview ════════════════════════════════════════════════════ */}
      <section id="your-results" className="bg-[#F8FAFC] border-t border-[#e2e8f0] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight mb-4">
                Your Results
              </h2>
              <p className="text-base text-[#494455] leading-relaxed mb-8">
                After you submit your personality inputs, Career-E-Sandbox generates a full results page
                with ranked career matches, clear pros and cons, and real market data for every path.
              </p>

              <ul className="space-y-5 mb-8">
                {RESULTS_CALLOUTS.map((item) => (
                  <li key={item.title}>
                    <p className="text-sm font-bold text-[#0b1c30] mb-0.5">{item.title}</p>
                    <p className="text-sm text-[#494455] leading-relaxed">{item.body}</p>
                  </li>
                ))}
              </ul>

              <Link
                href="/create-account"
                className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-semibold text-sm px-6 py-3 rounded hover:bg-[#1648c4] transition-colors"
              >
                Start your search
                <IconArrowRight />
              </Link>
            </div>

            <ResultsPreviewMock />
          </div>
        </div>
      </section>

      {/* ══ Footer ══════════════════════════════════════════════════════ */}
      <section className="bg-[#1a56db] py-12 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-xs text-[#c9b9ff] leading-relaxed max-w-md mx-auto">
            <span className="font-semibold text-white">Early-Stage Research Beta Disclaimer:</span>{" "}
            Career-E-Sandbox is a research prototype. Results are generated algorithmically and are intended
            for exploratory purposes only. They do not constitute professional career counseling or academic
            advising. Use at your own discretion.
          </p>
          <div className="flex items-center justify-center gap-5">
            <a href="#" className="text-xs text-[#c9b9ff] hover:text-white transition-colors underline underline-offset-2">
              Terms of Use
            </a>
            <span className="text-[#c9b9ff]/40 text-xs">•</span>
            <a href="#" className="text-xs text-[#c9b9ff] hover:text-white transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
