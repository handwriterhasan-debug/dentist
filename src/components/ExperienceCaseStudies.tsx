import { useState } from "react";
import { Doctor, CaseStudy } from "../types";
import { DOCTORS, CASE_STUDIES } from "../data";
import DuoComparisonSlider from "./DuoComparisonSlider";
import { Award, BookOpen, GraduationCap, ArrowRight, Layers, Clock, CheckCircle } from "lucide-react";

export default function ExperienceCaseStudies() {
  const [selectedDocId, setSelectedDocId] = useState<string>(DOCTORS[0].id);
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const selectedDoctor = DOCTORS.find((d) => d.id === selectedDocId) || DOCTORS[0];
  const selectedCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];
  const caseDoctor = DOCTORS.find((d) => d.id === selectedCase.dentistId);

  return (
    <div className="space-y-12">
      {/* Clinicians & Academic Excellence Portfolio */}
      <div className="glass-card rounded-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/60 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-semibold">
              Medical Board & Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1 animate-pulse">
              Clinical Specialists
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-light">
              Meet our world-class Board-Certified dental practitioners with publications, fellowships, and over 40+ collective years of clinical experience.
            </p>
          </div>
          
          {/* iOS Segmented Controller */}
          <div className="p-1 bg-white/30 border border-white/60 backdrop-blur-md rounded-2xl flex overflow-x-auto self-start md:self-auto gap-0.5 shadow-xs">
            {DOCTORS.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`px-4.5 py-2.5 text-[11px] font-medium rounded-xl text-nowrap transition-all duration-205 ${
                  selectedDocId === doc.id
                    ? "bg-white text-[#0066cc] shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {doc.name.split(",")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Details Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Photo & Simple Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-3xl bg-white/50 border border-white/60 group shadow-sm">
              <img
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-70 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-85">
                  {selectedDoctor.specialty}
                </p>
                <p className="text-sm font-semibold mt-0.5">
                  {selectedDoctor.name.split(",")[0]}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-white/40 rounded-2xl border border-white/60 backdrop-blur-xs">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Professional Philosophy
              </span>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed italic font-light">
                "{selectedDoctor.bio}"
              </p>
            </div>
          </div>

          {/* Academic Profile, Research & Memberships */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Selected Credentials</p>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                {selectedDoctor.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/5 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  {selectedDoctor.experienceYears} Years Combined Residency
                </span>
                <span className="text-xs text-slate-400 font-light">• Certified Specialist</span>
              </div>
            </div>

            {/* Structured Academic Timeline */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/60 border border-white rounded-xl mt-0.5 text-[#0066cc] shadow-xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Education & Advanced Fellowships
                  </h4>
                  <ul className="space-y-1">
                    {selectedDoctor.education.map((edu, idx) => (
                      <li key={idx} className="text-xs text-slate-650 leading-normal flex items-start gap-1.5 font-light">
                        <span className="text-[#0066cc] font-bold mt-0.5">•</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedDoctor.publications && selectedDoctor.publications.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/60 border border-white rounded-xl mt-0.5 text-emerald-600 shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Medical Publications & Research
                    </h4>
                    <ul className="space-y-1">
                      {selectedDoctor.publications.map((pub, idx) => (
                        <li key={idx} className="text-xs text-slate-500 leading-relaxed italic font-light">
                          "{pub}"
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {selectedDoctor.memberships && selectedDoctor.memberships.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/60 border border-white rounded-xl mt-0.5 text-amber-600 shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Board Memberships & Associations
                    </h4>
                    <ul className="space-y-1">
                      {selectedDoctor.memberships.map((mem, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5 capitalize font-light">
                          <CheckCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{mem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Casework & Transformations Gallery */}
      <div className="glass-card rounded-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-semibold">
              Actual Patient Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Transformational Case Studies
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-light">
              Compare actual before-and-after smile designs. Drag the vertical divider in real-time to witness the precision of our Swiss porcelain layering and custom alignment mechanics.
            </p>
          </div>

          {/* Miniature Selector Cards */}
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 items-center">
            {CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3.5 py-2.5 text-[11px] rounded-2xl text-left border flex flex-col gap-0.5 shrink-0 transition-all ${
                  selectedCaseId === c.id
                    ? "bg-[#0066cc]/10 border-[#0066cc]/20 ring-1 ring-[#0066cc]/20 shadow-xs"
                    : "bg-white/30 hover:bg-white/60 border-white/60 text-slate-600 font-light"
                }`}
              >
                <span className={`font-semibold ${selectedCaseId === c.id ? "text-[#0066cc]" : "text-slate-800"}`}>
                  {c.title}
                </span>
                <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">
                  {c.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlighted Case Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Compare Slider Column */}
          <div className="lg:col-span-7">
            <DuoComparisonSlider
              beforeImage={selectedCase.beforeImage}
              afterImage={selectedCase.afterImage}
              beforeLabel="Pre-Care Outline"
              afterLabel={`${selectedCase.title} Finished`}
            />
          </div>

          {/* Case Technical Specifications Column */}
          <div className="lg:col-span-5 space-y-5 bg-white/40 p-6 rounded-[28px] border border-white/60 shadow-xs backdrop-blur-md">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-[#0066cc] uppercase bg-[#0066cc]/10 px-2.5 py-1 rounded-full font-semibold">
                {selectedCase.category}
              </span>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-3">
                {selectedCase.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-light">
                {selectedCase.description}
              </p>
            </div>

            <div className="border-t border-white/60 pt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-450 uppercase flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  Complexity
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md inline-block ${
                  selectedCase.complexity === "Advanced"
                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                    : selectedCase.complexity === "Moderate"
                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                }`}>
                  {selectedCase.complexity} Casework
                </span>
              </div>

              {selectedCase.durationWeeks && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-450 uppercase flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Overall Duration
                  </span>
                  <span className="text-xs font-semibold text-slate-750 block mt-0.5">
                    {selectedCase.durationWeeks} Weeks total
                  </span>
                </div>
              )}
            </div>

            {caseDoctor && (
              <div className="border-t border-white/60 pt-4 flex items-center gap-3">
                <img
                  src={caseDoctor.imageUrl}
                  alt={caseDoctor.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/60 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-[11px]">
                  <p className="text-slate-400 font-serif leading-none">Designed & Operated by</p>
                  <p className="font-semibold text-slate-800 mt-1 leading-none">{caseDoctor.name.split(",")[0]}</p>
                  <p className="text-[10px] text-[#0066cc] leading-none mt-0.5 font-light">{caseDoctor.specialty}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
