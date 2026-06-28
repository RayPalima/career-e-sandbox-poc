"use client";

import { useEffect, useRef, useState } from "react";
import { mbtiOptions } from "@/src/lib/mockData";
import { ASSESSMENT_HELP } from "@/src/lib/assessmentHelp";
import {
  AGE_RANGES,
  CLIFTON_STRENGTHS,
  DISC_STYLES,
  EDU_TARGET_LABELS,
  ENNEAGRAM_OPTIONS,
  GENDER_OPTIONS,
  ORG_OPTIONS,
  RACE_OPTIONS,
  SPARKETYPE_OPTIONS,
  SUN_SIGNS,
  TASK_DISLIKE_OPTIONS,
  WORK_ENV_OPTIONS,
  ZODIAC_ANIMALS,
  ZODIAC_ELEMENTS,
  type OrgStructure,
  type WorkEnv,
} from "@/src/lib/formOptions";

export interface AssessmentValues {
  mbtiType: string;
  variant: "A" | "T" | "";
  workEnv: WorkEnv;
  targetEduIndex: number;
}

interface AssessmentFormProps {
  layout: "sidebar" | "page";
  preload?: boolean;
  onMbtiChange?: (type: string) => void;
  onValuesChange?: (values: AssessmentValues) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
}

function ChevronUp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold text-[#7a7486] uppercase tracking-widest block mb-2">
      {children}
    </span>
  );
}

function StyledSelect({
  value, onChange, options, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded px-3 py-2 text-sm text-[#0b1c30] pr-8 focus:outline-none focus:border-[#1a56db] cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#494455]">
        <ChevronDown />
      </span>
    </div>
  );
}

function PillGroup<T extends string>({
  options, value, onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            value === o
              ? "bg-[#1a56db] text-white border border-[#1a56db]"
              : "bg-white text-[#494455] border border-[#e2e8f0] hover:border-[#1a56db]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function BigFiveSlider({
  label, value, onChange, traitKey,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  traitKey?: string;
}) {
  const descriptor = value <= 33 ? "Low" : value <= 66 ? "Moderate" : "High";
  const traitTips: Record<string, { low: string; high: string }> = {
    Openness: { low: "Prefers routine and practical tasks.", high: "Seeks creative, exploratory roles." },
    Conscientiousness: { low: "Thrives in flexible, spontaneous settings.", high: "Excels in structured, detail-oriented work." },
    Extraversion: { low: "Best suited to independent, low-interaction roles.", high: "Energized by team-facing, social environments." },
    Agreeableness: { low: "Comfortable in competitive, direct cultures.", high: "Fits collaborative, service-oriented teams." },
    Neuroticism: { low: "Handles high-pressure environments well.", high: "May prefer stable, predictable work settings." },
  };
  const tip = traitKey ? traitTips[traitKey] : null;
  const activeTip = value <= 50 ? tip?.low : tip?.high;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-[#0b1c30]">{label}</span>
        <span className="text-xs font-bold text-[#1a56db] w-20 text-right">{descriptor} ({value})</span>
      </div>
      <input
        type="range" min="0" max="100" value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#1a56db] cursor-pointer"
      />
      <div className="flex justify-between mt-0.5">
        <span className="text-[9px] text-[#7a7486]">Low</span>
        <span className="text-[9px] text-[#7a7486]">High</span>
      </div>
      {activeTip && (
        <p className="text-[10px] text-[#7a7486] mt-1.5 italic">Good to know: {activeTip}</p>
      )}
    </div>
  );
}

function AccordionSection({
  title, isOpen, onToggle, children, compact, helpKey,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  compact?: boolean;
  helpKey?: keyof typeof ASSESSMENT_HELP;
}) {
  const [helpOpen, setHelpOpen] = useState(false);
  const anyOpen = isOpen || helpOpen;

  return (
    <div className={`border-b ${anyOpen ? "border-[#cac3d8]/60" : "border-[#e2e8f0]"}`}>
      <div className={`flex items-center gap-1 ${compact ? "px-6 py-4" : "px-5 py-4"} ${anyOpen ? "bg-[#f8f9ff]" : "hover:bg-[#f8f9ff]"} transition-colors`}>
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 flex items-center justify-between text-sm font-semibold text-[#0b1c30] text-left"
        >
          <span>{title}</span>
          <span className={isOpen ? "text-[#1a56db]" : "text-[#7a7486]"}>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </button>
        {helpKey && (
          <button
            type="button"
            onClick={() => setHelpOpen((p) => !p)}
            className={`ml-2 w-7 h-7 rounded-lg border font-bold text-sm leading-none transition-colors shrink-0 ${
              helpOpen
                ? "bg-[#1a56db] border-[#1a56db] text-white"
                : "border-[#e2e8f0] text-[#7a7486] hover:border-[#1a56db] hover:text-[#1a56db]"
            }`}
          >
            ?
          </button>
        )}
      </div>
      {anyOpen && (
        <div className={`${compact ? "px-6" : "px-5"} pb-5 bg-[#f8f9ff] border-t border-[#e2e8f0]`}>
          {helpOpen && helpKey && (
            <div className="pt-4">
              <InlineHelpPanel helpKey={helpKey} />
            </div>
          )}
          {isOpen && (
            <div className={`space-y-4 ${helpOpen ? "mt-4 pt-4 border-t border-[#e2e8f0]" : "pt-4"}`}>
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InlineHelpPanel({ helpKey }: { helpKey: keyof typeof ASSESSMENT_HELP }) {
  const help = ASSESSMENT_HELP[helpKey];
  const isPlaceholder = help.providerUrl === "#" || help.providerUrl.startsWith("[");
  return (
    <div className="rounded-lg border border-[#e2e8f0] bg-[#f8f9ff] p-4 space-y-3">
      <p className="text-xs text-[#494455] leading-relaxed">{help.description}</p>
      {isPlaceholder ? (
        <span className="text-xs font-semibold text-[#7a7486] inline-block">
          {help.providerLabel} — {help.providerUrl}
        </span>
      ) : (
        <a
          href={help.providerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[#1a56db] hover:underline inline-block"
        >
          {help.providerLabel} ↗
        </a>
      )}
    </div>
  );
}

function CollapsibleCard({
  id,
  title,
  helpKey,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  helpKey: keyof typeof ASSESSMENT_HELP;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-[#f8f9ff]">
        <h3 className="text-sm font-bold text-[#0b1c30]">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHelpOpen((p) => !p)}
            aria-expanded={helpOpen}
            className={`w-8 h-8 rounded-lg border font-bold text-sm leading-none transition-colors ${
              helpOpen
                ? "bg-[#1a56db] border-[#1a56db] text-white"
                : "border-[#e2e8f0] text-[#7a7486] hover:border-[#1a56db] hover:text-[#1a56db]"
            }`}
          >
            ?
          </button>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`section-${id}`}
            className="w-8 h-8 rounded-lg border border-[#e2e8f0] text-[#1a56db] font-bold text-lg leading-none hover:bg-[#dbeafe] hover:border-[#1a56db] transition-colors"
          >
            {isOpen ? "−" : "+"}
          </button>
        </div>
      </div>

      {(helpOpen || isOpen) && (
        <div id={`section-${id}`} className="px-5 pb-5 space-y-4 border-t border-[#e2e8f0]">
          {helpOpen && <div className="pt-4"><InlineHelpPanel helpKey={helpKey} /></div>}
          {isOpen && <div className={helpOpen ? "" : "pt-4"}>{children}</div>}
        </div>
      )}
    </div>
  );
}

function OptionalFieldBlock({
  label,
  description,
  enabled,
  onToggle,
  children,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-lg border p-4 transition-colors ${enabled ? "border-[#1a56db]/30 bg-[#f8f9ff]" : "border-[#e2e8f0] bg-white"}`}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="w-4 h-4 mt-0.5 accent-[#1a56db] cursor-pointer shrink-0"
        />
        <div>
          <span className="text-sm font-semibold text-[#0b1c30] block">{label}</span>
          <span className="text-xs text-[#494455]">{description}</span>
        </div>
      </label>
      {enabled && <div className="mt-4 pl-7">{children}</div>}
    </div>
  );
}

export default function AssessmentForm({
  layout,
  preload = false,
  onMbtiChange,
  onValuesChange,
  onSubmit,
  isLoading,
}: AssessmentFormProps) {
  const usePrefill = layout === "sidebar" || preload;
  const [sidebarTab, setSidebarTab] = useState<"assessments" | "additional">("assessments");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [enabledOptional, setEnabledOptional] = useState<Set<string>>(new Set());

  const [mbtiType, setMbtiType] = useState("INTJ");
  const [variant, setVariant] = useState<"A" | "T" | "">("");
  const [primarySpark, setPrimarySpark] = useState(usePrefill ? "Maven" : "");
  const [secondarySpark, setSecondarySpark] = useState(usePrefill ? "Sage" : "");
  const [antiSpark, setAntiSpark] = useState(usePrefill ? "Advisor" : "");
  const [strengths, setStrengths] = useState(
    usePrefill
      ? ["Strategic", "Learner", "Analytical", "Ideation", ""]
      : ["", "", "", "", ""]
  );
  const [bigFive, setBigFive] = useState({ O: 65, C: 70, E: 30, A: 55, N: 40 });
  const [enneagramType, setEnneagramType] = useState(usePrefill ? "Type 5 — Investigator" : "");
  const [discStyle, setDiscStyle] = useState(usePrefill ? "Conscientiousness (C)" : "");
  const [zodiacAnimal, setZodiacAnimal] = useState(usePrefill ? "Dragon" : "");
  const [zodiacElement, setZodiacElement] = useState(usePrefill ? "Water" : "");
  const [sunSign, setSunSign] = useState(usePrefill ? "Scorpio" : "");
  const [workEnv, setWorkEnv] = useState<WorkEnv>("Fully Remote");
  const [orgStructure, setOrgStructure] = useState<OrgStructure>("Hierarchical");
  const [targetEduIndex, setTargetEduIndex] = useState(3);
  const [taskDislikes, setTaskDislikes] = useState<Set<string>>(new Set());
  const [ageRange, setAgeRange] = useState(usePrefill ? "22-25" : "");
  const [gender, setGender] = useState(usePrefill ? "Prefer not to say" : "");
  const [race, setRace] = useState("");

  const onValuesChangeRef = useRef(onValuesChange);
  onValuesChangeRef.current = onValuesChange;

  const lastEmittedRef = useRef<AssessmentValues | null>(null);

  useEffect(() => {
    const current: AssessmentValues = { mbtiType, variant, workEnv, targetEduIndex };
    const last = lastEmittedRef.current;
    if (
      last &&
      last.mbtiType === current.mbtiType &&
      last.variant === current.variant &&
      last.workEnv === current.workEnv &&
      last.targetEduIndex === current.targetEduIndex
    ) {
      return;
    }
    lastEmittedRef.current = current;
    onValuesChangeRef.current?.(current);
  }, [mbtiType, variant, workEnv, targetEduIndex]);

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function setStrength(i: number, v: string) {
    setStrengths((prev) => prev.map((s, idx) => (idx === i ? v : s)));
  }

  function setBigFiveTrait(trait: keyof typeof bigFive, v: number) {
    setBigFive((prev) => ({ ...prev, [trait]: v }));
  }

  function toggleOptional(id: string) {
    setEnabledOptional((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleTaskDislike(task: string) {
    setTaskDislikes((prev) => {
      const next = new Set(prev);
      next.has(task) ? next.delete(task) : next.add(task);
      return next;
    });
  }

  function handleMbtiChange(newType: string) {
    setMbtiType(newType);
    onMbtiChange?.(newType);
  }

  const mbtiFields = (
    <>
      <div>
        <FieldLabel>Type Designation</FieldLabel>
        <StyledSelect
          value={mbtiType}
          onChange={handleMbtiChange}
          options={mbtiOptions.map((o) => ({ value: o.type, label: o.label }))}
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FieldLabel>Variant Modifier</FieldLabel>
          <span className="text-[9px] font-semibold text-[#7a7486] uppercase tracking-widest -mt-2">(optional)</span>
        </div>
        <div className="flex gap-2">
          {(["A", "T"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant((prev) => prev === v ? "" : v)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                variant === v
                  ? "bg-[#1a56db] text-white border border-[#1a56db]"
                  : "bg-white text-[#7a7486] border border-[#e2e8f0] hover:border-[#1a56db] hover:text-[#1a56db]"
              }`}
            >
              {v === "A" ? "Assertive (-A)" : "Turbulent (-T)"}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const sparkFields = (
    <>
      <div><FieldLabel>Primary Sparketype</FieldLabel><StyledSelect value={primarySpark} onChange={setPrimarySpark} options={SPARKETYPE_OPTIONS} placeholder="Select primary..." /></div>
      <div><FieldLabel>Secondary Sparketype</FieldLabel><StyledSelect value={secondarySpark} onChange={setSecondarySpark} options={SPARKETYPE_OPTIONS} placeholder="Select secondary..." /></div>
      <div><FieldLabel>Anti-Sparketype</FieldLabel><StyledSelect value={antiSpark} onChange={setAntiSpark} options={SPARKETYPE_OPTIONS} placeholder="Select anti-type..." /></div>
    </>
  );

  const cliftonFields = (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i}>
          <FieldLabel>Strength {i + 1}</FieldLabel>
          <StyledSelect value={strengths[i]} onChange={(v) => setStrength(i, v)} options={CLIFTON_STRENGTHS} placeholder={`Select strength ${i + 1}...`} />
        </div>
      ))}
    </>
  );

  const bigFiveFields = (
    <>
      <BigFiveSlider label="Openness" traitKey="Openness" value={bigFive.O} onChange={(v) => setBigFiveTrait("O", v)} />
      <BigFiveSlider label="Conscientiousness" traitKey="Conscientiousness" value={bigFive.C} onChange={(v) => setBigFiveTrait("C", v)} />
      <BigFiveSlider label="Extraversion" traitKey="Extraversion" value={bigFive.E} onChange={(v) => setBigFiveTrait("E", v)} />
      <BigFiveSlider label="Agreeableness" traitKey="Agreeableness" value={bigFive.A} onChange={(v) => setBigFiveTrait("A", v)} />
      <BigFiveSlider label="Neuroticism" traitKey="Neuroticism" value={bigFive.N} onChange={(v) => setBigFiveTrait("N", v)} />
    </>
  );

  const additionalInfoContent = (
    <div className="space-y-4">
      <p className="text-sm text-[#494455]">
        Optional fields to enhance your results. Check any categories you want to include — some allow only one selection.
      </p>

      <OptionalFieldBlock
        label="Work Environment"
        description="Single-select: Fully Remote, Hybrid, or In-Office."
        enabled={enabledOptional.has("workEnv")}
        onToggle={() => toggleOptional("workEnv")}
      >
        <PillGroup options={WORK_ENV_OPTIONS} value={workEnv} onChange={setWorkEnv} />
      </OptionalFieldBlock>

      <OptionalFieldBlock
        label="Organizational Structure"
        description="Single-select: Hierarchical (e.g., Military/Medicine) vs. Flat/Collaborative (e.g., IT)."
        enabled={enabledOptional.has("orgStructure")}
        onToggle={() => toggleOptional("orgStructure")}
      >
        <PillGroup options={ORG_OPTIONS} value={orgStructure} onChange={setOrgStructure} />
      </OptionalFieldBlock>

      <OptionalFieldBlock
        label="Target Education Level"
        description="Slider from High School Diploma to PhD."
        enabled={enabledOptional.has("targetEdu")}
        onToggle={() => toggleOptional("targetEdu")}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#494455]">Current anchor</span>
          <span className="text-xs font-bold text-[#1a56db]">{EDU_TARGET_LABELS[targetEduIndex]}</span>
        </div>
        <input type="range" min="0" max={EDU_TARGET_LABELS.length - 1} value={targetEduIndex} onChange={(e) => setTargetEduIndex(Number(e.target.value))} className="w-full accent-[#1a56db] cursor-pointer" />
        <div className="flex justify-between mt-1.5">
          {EDU_TARGET_LABELS.map((l) => (
            <span key={l} className="text-[9px] text-[#7a7486]">{l.split(" ")[0]}</span>
          ))}
        </div>
      </OptionalFieldBlock>

      <OptionalFieldBlock
        label="Task Dislikes (Aversions)"
        description="Multi-select: check all task types you want to avoid."
        enabled={enabledOptional.has("taskDislikes")}
        onToggle={() => toggleOptional("taskDislikes")}
      >
        <div className="space-y-2.5">
          {TASK_DISLIKE_OPTIONS.map((task) => (
            <label key={task} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={taskDislikes.has(task)} onChange={() => toggleTaskDislike(task)} className="w-4 h-4 accent-[#1a56db] cursor-pointer" />
              <span className="text-sm text-[#494455] group-hover:text-[#0b1c30] transition-colors">{task}</span>
            </label>
          ))}
        </div>
      </OptionalFieldBlock>

      <OptionalFieldBlock
        label="Age Range"
        description="Optional demographic input to refine recommendations."
        enabled={enabledOptional.has("demoAge")}
        onToggle={() => toggleOptional("demoAge")}
      >
        <StyledSelect value={ageRange} onChange={setAgeRange} options={AGE_RANGES} placeholder="Select range..." />
      </OptionalFieldBlock>

      <OptionalFieldBlock
        label="Gender"
        description="Optional demographic input."
        enabled={enabledOptional.has("demoGender")}
        onToggle={() => toggleOptional("demoGender")}
      >
        <StyledSelect value={gender} onChange={setGender} options={GENDER_OPTIONS} placeholder="Select..." />
      </OptionalFieldBlock>

      <OptionalFieldBlock
        label="Race / Ethnicity"
        description="Optional demographic input, if you choose to share."
        enabled={enabledOptional.has("demoRace")}
        onToggle={() => toggleOptional("demoRace")}
      >
        <StyledSelect value={race} onChange={setRace} options={RACE_OPTIONS} placeholder="Select..." />
      </OptionalFieldBlock>
    </div>
  );

  const preferencesFields = (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-[0.15em] mb-3">Work Environment</p>
        <PillGroup options={WORK_ENV_OPTIONS} value={workEnv} onChange={setWorkEnv} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-[0.15em] mb-3">Organizational Structure</p>
        <PillGroup options={ORG_OPTIONS} value={orgStructure} onChange={setOrgStructure} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-[0.15em]">Target Education Level</p>
          <span className="text-xs font-bold text-[#1a56db]">{EDU_TARGET_LABELS[targetEduIndex]}</span>
        </div>
        <input type="range" min="0" max={EDU_TARGET_LABELS.length - 1} value={targetEduIndex} onChange={(e) => setTargetEduIndex(Number(e.target.value))} className="w-full accent-[#1a56db] cursor-pointer" />
        <div className="flex justify-between mt-1.5">
          {EDU_TARGET_LABELS.map((l) => (
            <span key={l} className="text-[9px] text-[#7a7486]">{l.split(" ")[0]}</span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-[0.15em] mb-3">Task Dislikes (Aversions)</p>
        <div className="space-y-2.5">
          {TASK_DISLIKE_OPTIONS.map((task) => (
            <label key={task} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={taskDislikes.has(task)} onChange={() => toggleTaskDislike(task)} className="w-4 h-4 accent-[#1a56db] cursor-pointer" />
              <span className="text-sm text-[#494455] group-hover:text-[#0b1c30] transition-colors">{task}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#7a7486] uppercase tracking-[0.15em] mb-3">Demographics</p>
        <div className="space-y-3">
          <div><FieldLabel>Age Range</FieldLabel><StyledSelect value={ageRange} onChange={setAgeRange} options={AGE_RANGES} placeholder="Select range..." /></div>
          <div><FieldLabel>Gender</FieldLabel><StyledSelect value={gender} onChange={setGender} options={GENDER_OPTIONS} placeholder="Select..." /></div>
        </div>
      </div>
    </div>
  );

  if (layout === "page") {
    const assessmentCards = [
      { id: "mbti", title: "Myers-Briggs (MBTI)", helpKey: "mbti" as const, content: mbtiFields },
      { id: "spark", title: "Sparketype", helpKey: "spark" as const, content: sparkFields },
      { id: "clifton", title: "CliftonStrengths", helpKey: "clifton" as const, content: cliftonFields },
      { id: "bigfive", title: "Big Five Model", helpKey: "bigfive" as const, content: bigFiveFields },
      { id: "ennea", title: "Enneagram", helpKey: "ennea" as const, content: <div><FieldLabel>Core Type</FieldLabel><StyledSelect value={enneagramType} onChange={setEnneagramType} options={ENNEAGRAM_OPTIONS} placeholder="Select type..." /></div> },
      { id: "disc", title: "DiSC Assessment", helpKey: "disc" as const, content: <div><FieldLabel>Primary Style</FieldLabel><StyledSelect value={discStyle} onChange={setDiscStyle} options={DISC_STYLES} placeholder="Select style..." /></div> },
      { id: "zodiac", title: "Chinese Zodiac", helpKey: "zodiac" as const, content: <><div><FieldLabel>Animal</FieldLabel><StyledSelect value={zodiacAnimal} onChange={setZodiacAnimal} options={ZODIAC_ANIMALS} placeholder="Select animal..." /></div><div><FieldLabel>Element</FieldLabel><StyledSelect value={zodiacElement} onChange={setZodiacElement} options={ZODIAC_ELEMENTS} placeholder="Select element..." /></div></> },
      { id: "astro", title: "Astrology", helpKey: "astro" as const, content: <div><FieldLabel>Sun Sign</FieldLabel><StyledSelect value={sunSign} onChange={setSunSign} options={SUN_SIGNS} placeholder="Select sign..." /></div> },
    ].sort((a, b) => a.title.localeCompare(b.title));

    return (
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight">Career Search</h1>
          <p className="text-sm md:text-base text-[#494455] mt-2">
            Please enter your personality assessment results below. Use <span className="font-semibold text-[#1a56db]">+</span> to expand inputs and <span className="font-semibold text-[#1a56db]">?</span> for inline guidance.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold text-[#1a56db] uppercase tracking-widest mb-4">Assessments</h2>
          <div className="grid grid-cols-1 gap-5">
            {assessmentCards.map((card) => (
              <CollapsibleCard
                key={card.id}
                id={card.id}
                title={card.title}
                helpKey={card.helpKey}
                isOpen={openSections.has(card.id)}
                onToggle={() => toggleSection(card.id)}
              >
                {card.content}
              </CollapsibleCard>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-[#1a56db] uppercase tracking-widest mb-4">Preference</h2>
          <CollapsibleCard
            id="additional"
            title="Optional Inputs"
            helpKey="additional"
            isOpen={openSections.has("additional")}
            onToggle={() => toggleSection("additional")}
          >
            {additionalInfoContent}
          </CollapsibleCard>
        </div>

        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-[#1a56db] text-white font-semibold text-base px-8 py-3.5 rounded hover:bg-[#1648c4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculating Career Path Results...
              </>
            ) : (
              "Generate Results"
            )}
          </button>
        </div>
      </form>
    );
  }

  // Sidebar layout
  return (
    <aside className="w-80 shrink-0 bg-white border-r border-[#e2e8f0] flex flex-col hidden md:flex h-full">
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h2 className="text-[22px] font-bold text-[#0b1c30] leading-tight">Personality<br />Assessment</h2>
      </div>

      <div className="flex border-b border-[#e2e8f0] shrink-0">
        {(["assessments", "additional"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSidebarTab(tab)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              sidebarTab === tab
                ? "text-[#1a56db] border-b-2 border-[#1a56db] -mb-px"
                : "text-[#7a7486] hover:text-[#494455]"
            }`}
          >
            {tab === "assessments" ? "Assessments" : "Preference"}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {sidebarTab === "assessments" && (
          <div>
            <AccordionSection title="Astrology" isOpen={openSections.has("astro")} onToggle={() => toggleSection("astro")} helpKey="astro" compact>
              <div><FieldLabel>Sun Sign</FieldLabel><StyledSelect value={sunSign} onChange={setSunSign} options={SUN_SIGNS} placeholder="Select sign..." /></div>
            </AccordionSection>
            <AccordionSection title="Big Five Model" isOpen={openSections.has("bigfive")} onToggle={() => toggleSection("bigfive")} helpKey="bigfive" compact>{bigFiveFields}</AccordionSection>
            <AccordionSection title="Chinese Zodiac" isOpen={openSections.has("zodiac")} onToggle={() => toggleSection("zodiac")} helpKey="zodiac" compact>
              <div><FieldLabel>Animal</FieldLabel><StyledSelect value={zodiacAnimal} onChange={setZodiacAnimal} options={ZODIAC_ANIMALS} placeholder="Select animal..." /></div>
              <div><FieldLabel>Element</FieldLabel><StyledSelect value={zodiacElement} onChange={setZodiacElement} options={ZODIAC_ELEMENTS} placeholder="Select element..." /></div>
            </AccordionSection>
            <AccordionSection title="CliftonStrengths" isOpen={openSections.has("clifton")} onToggle={() => toggleSection("clifton")} helpKey="clifton" compact>{cliftonFields}</AccordionSection>
            <AccordionSection title="DiSC Assessment" isOpen={openSections.has("disc")} onToggle={() => toggleSection("disc")} helpKey="disc" compact>
              <div><FieldLabel>Primary Style</FieldLabel><StyledSelect value={discStyle} onChange={setDiscStyle} options={DISC_STYLES} placeholder="Select style..." /></div>
            </AccordionSection>
            <AccordionSection title="Enneagram" isOpen={openSections.has("ennea")} onToggle={() => toggleSection("ennea")} helpKey="ennea" compact>
              <div><FieldLabel>Core Type</FieldLabel><StyledSelect value={enneagramType} onChange={setEnneagramType} options={ENNEAGRAM_OPTIONS} placeholder="Select type..." /></div>
            </AccordionSection>
            <AccordionSection title="Myers-Briggs (MBTI)" isOpen={openSections.has("mbti")} onToggle={() => toggleSection("mbti")} helpKey="mbti" compact>{mbtiFields}</AccordionSection>
            <AccordionSection title="Sparketype" isOpen={openSections.has("spark")} onToggle={() => toggleSection("spark")} helpKey="spark" compact>{sparkFields}</AccordionSection>
          </div>
        )}
        {sidebarTab === "additional" && (
          <div className="px-6 pt-5">{additionalInfoContent}</div>
        )}

        {onSubmit && (
          <div className="px-4 py-4 border-t border-[#e2e8f0] mt-2">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#1a56db] text-white font-semibold text-sm py-2.5 rounded hover:bg-[#1648c4] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Recalculating...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
