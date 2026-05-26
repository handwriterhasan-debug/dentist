import { useState } from "react";
import { CLINIC_STATS, SERVICES } from "./data";
import ExperienceCaseStudies from "./components/ExperienceCaseStudies";
import AppointmentScheduler from "./components/AppointmentScheduler";
import SiriAssistant from "./components/SiriAssistant";
import FAQSection from "./components/FAQSection";
import SymptomPitches from "./components/SymptomPitches";
import PatientTestimonials from "./components/PatientTestimonials";
import {
  Sparkles,
  HeartPulse,
  ShieldCheck,
  Zap,
  Activity,
  Calendar,
  ArrowRight,
  Award,
  Smile,
  ChevronRight,
  Sofa,
  Clock,
  Eye,
  Check,
  Building
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>("");
  const [preselectedPromoNotes, setPreselectedPromoNotes] = useState<string>("");

  const handleServiceSelect = (serviceId: string) => {
    setPreselectedService(serviceId);
    setPreselectedPromoNotes("");
    const targetElement = document.getElementById("booking-engine");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPromo = (serviceId: string, promoNotes: string) => {
    setPreselectedService(serviceId);
    setPreselectedPromoNotes(promoNotes);
    const targetElement = document.getElementById("booking-engine");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mapIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-[#0066cc]" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-500" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-cyan-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#0066cc]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 font-sans selection:bg-[#0066cc]/10 selection:text-[#0066cc] overflow-x-hidden relative">
      
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-250/25 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[800px] left-[-150px] w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[400px] right-[-150px] w-[550px] h-[550px] bg-indigo-150/15 rounded-full blur-[125px] pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-sky-100/20 rounded-full blur-[115px] pointer-events-none z-0" />

      {/* Cupertino Top High-Blur Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/45 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white font-mono text-sm leading-none font-bold italic shadow-xs">
              P
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-neutral-900 block font-sans">
                PEARL DENTAL
              </span>
              <span className="text-[9px] text-neutral-400 block tracking-wider uppercase font-semibold leading-none">
                Signature Clinic
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <a href="#services-catalog" className="text-xs font-semibold text-neutral-550 hover:text-neutral-900 transition-colors">
              Treatments
            </a>
            <a href="#doctor-credentials" className="text-xs font-semibold text-neutral-550 hover:text-neutral-900 transition-colors">
              Work Experience
            </a>
            <a href="#patient-testimonials-center" className="text-xs font-semibold text-neutral-550 hover:text-neutral-900 transition-colors">
              Patient Journeys
            </a>
            <a href="#transformations" className="text-xs font-semibold text-neutral-550 hover:text-neutral-900 transition-colors">
              Our Casework
            </a>
            <a href="#booking-engine" className="text-xs font-semibold text-neutral-550 hover:text-[#0066cc] transition-colors">
              Secure Slot
            </a>
          </nav>

          {/* CTA Header Reservation Button */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] bg-white/60 border border-slate-200/60 px-2.5 py-1 rounded-full font-semibold font-mono shadow-xs text-neutral-500">
              Cupertino, CA
            </span>
            <a
              href="#booking-engine"
              className="bg-[#0066cc] hover:bg-[#007bf5] text-white text-[11px] font-semibold px-4.5 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer select-none active:scale-95 shadow-md shadow-blue-500/10"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Slot
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pb-24 relative z-10"
      >
        
        {/* HERO SECTION: The Smile, Engineered. */}
        <section className="relative px-4 sm:px-6 pt-16 sm:pt-20 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Direct typographic callouts */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-neutral-900/90 text-white rounded-full p-1 pr-3 shadow-sm backdrop-blur-md">
                <span className="text-[9px] font-mono tracking-wider font-bold bg-[#0066cc] uppercase px-2.5 py-1 rounded-full">
                  Special Announcement
                </span>
                <span className="text-[10px] text-zinc-300 font-light truncate max-w-xs">
                  Siri Dental Care AI is now online!
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-tight sm:leading-none">
                The smile. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-indigo-600 to-indigo-800">
                  Engineered with bio-precision.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-light">
                Pearl Specialist Clinic redesigns restorative medical dental experiences. Through micro-layered Swiss feldspathic porcelain, computer-guided implant surgeries, and AI-optimized treatment cycles, we guarantee aesthetic and biological perfection tailored around your life.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="#services-catalog"
                  className="bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md text-center flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Explore Advanced Treatments
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#doctor-credentials"
                  className="bg-white/60 hover:bg-white/90 border border-white/80 backdrop-blur-md text-neutral-700 text-xs font-semibold px-6 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  View Work Experience
                </a>
              </div>

              {/* Clinic Stats strip */}
              <div className="pt-8 border-t border-slate-300/40 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-mono">{CLINIC_STATS.yearsOfExcellence}</p>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Years of Excellence</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-mono">{CLINIC_STATS.casesCompleted}</p>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Transformations Done</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-mono">{CLINIC_STATS.patientSatisfaction}</p>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Patient Retention</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-mono">{CLINIC_STATS.boardSpecialists}</p>
                  <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Board Specialists</p>
                </div>
              </div>
            </div>

            {/* Apple Product Card presentation (Right Sidebar Takes 5 Cols on Desktop) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#0066cc]/10 to-indigo-500/10 blur-xl rounded-full opacity-60 pointer-events-none" />
              
              <div className="relative glass-panel rounded-[40px] p-8 shadow-[0_12px_36px_rgba(0,0,0,0.04)] space-y-6">
                <div className="flex items-center justify-between border-b border-white/60 pb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-neutral-800 animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase font-bold">
                      Clinic Affiliations
                    </span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-[#0066cc] border border-white/60 font-semibold px-2.5 py-0.5 rounded-full uppercase">
                    ISO-9001 Certified
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {CLINIC_STATS.description}
                </p>

                {/* Micro bento cells representing clinical guarantees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
                  <div className="p-3 bg-white/40 border border-white/60 rounded-2xl flex items-start gap-2 backdrop-blur-xs">
                    <Check className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a]">Laser Guided</p>
                      <p className="text-[10px] text-slate-400 mt-0.2">Pain-free decay repair</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white/40 border border-white/60 rounded-2xl flex items-start gap-2 backdrop-blur-xs">
                    <Check className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a]">3D Diagnostic</p>
                      <p className="text-[10px] text-slate-400 mt-0.2">Micron-level planning</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white/40 border border-white/60 rounded-2xl flex items-start gap-2 backdrop-blur-xs">
                    <Check className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a]">Biocompatible</p>
                      <p className="text-[10px] text-slate-400 mt-0.2">High-purity Swiss veneers</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white/40 border border-white/60 rounded-2xl flex items-start gap-2 backdrop-blur-xs">
                    <Check className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0f172a]">AI Assisted</p>
                      <p className="text-[10px] text-slate-400 mt-0.2">24/7 symptom diagnostics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: Clinique Interior Render Presentation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
          <div className="glass-card-dark rounded-[40px] overflow-hidden text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 relative border border-white/5">
            
            {/* Visual Column */}
            <div className="lg:col-span-6 relative h-64 sm:h-96 lg:h-auto min-h-[340px]">
              <img
                src="/src/assets/images/clinic_interior_1779748042690.png"
                alt="State of the art dental treat-room"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent lg:hidden block" />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6 relative z-10 backdrop-blur-md">
              <span className="text-[10px] font-mono tracking-widest text-sky-450 uppercase font-bold">
                Our Environment & Ergonomics
              </span>
              <h2 className="text-2xl sm:text-3.5xl font-bold tracking-tight">
                Architecturally Calibrated For Serenity.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                We design dental spaces to feel like quiet, architectural sanctuaries rather than sterile medical clinics. High acoustic damping, neural ambient lighting systems, premium ergonomic zero-gravity lounge structures, and noise-canceling audio loops are engineered into every treatment suite. At Pearl Dental, anxiety dissolves before your session begins.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-white/10 rounded-xl text-sky-400 mt-0.5 shadow-sm border border-white/15">
                    <Sofa className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-200">Zero-Gravity Comfort</h4>
                    <p className="text-[11px] text-neutral-400 font-light mt-0.5">Laminate gel chairs optimize lumbar alignment instantly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-white/10 rounded-xl text-indigo-400 mt-0.5 shadow-sm border border-white/15">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-200">Express Turnarounds</h4>
                    <p className="text-[11px] text-neutral-400 font-light mt-0.5">3D porcelain mills produce veneer crowns onsite in hours.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: Interactive Troubleshooter & Hot Promo Selector */}
        <SymptomPitches onSelectPromo={handleSelectPromo} />

        {/* SECTION: Dental Treatments Catalog */}
        <section id="services-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-bold">
              Therapies & Specialized Diagnostics
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
              Clinique Specialty Treatments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-light leading-snug">
              Every procedure is governed by microscopic precision instruments, leveraging computer guides to cut tissue trauma and ensure robust, beautiful integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="glass-card rounded-[36px] p-6 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:bg-white/70 hover:-translate-y-0.5 transition-all flex flex-col justify-between group relative"
              >
                <div className="space-y-4">
                  
                  {/* Icon & Specs Block */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/60 rounded-2xl border border-white group-hover:scale-110 transition-transform shadow-xs">
                      {mapIcon(srv.iconName)}
                    </div>
                    <span className="text-[10px] font-mono bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/10 font-bold px-2.5 py-1 rounded-full">
                      {srv.priceRange.split(" - ")[0]}
                    </span>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">
                      {srv.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {srv.shortDescription}
                    </p>
                  </div>

                  {/* Bullet Benefits array */}
                  <ul className="space-y-1.5 pt-2 border-t border-white/65">
                    {srv.benefits.map((b, idx) => (
                      <li key={idx} className="text-[10.5px] text-slate-600 flex items-start gap-1.5 leading-tight">
                        <span className="text-[#0066cc] font-bold mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/65 pt-4 mt-5 space-y-3.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {srv.durationMinutes} mins
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {srv.recoveryTime} recovery
                    </span>
                  </div>

                  <button
                    onClick={() => handleServiceSelect(srv.id)}
                    className="w-full py-2.5 px-4 bg-white hover:bg-neutral-900 hover:border-neutral-900 hover:text-white rounded-xl text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97 hover:shadow-xs border border-white"
                  >
                    Schedule Treatment Space
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Patient Frequently Asked Questions (FAQ) Accordion */}
        <FAQSection />

        {/* SECTION: Dentist Work Experience Matrix (Segmented Controller & Slider) */}
        <section id="doctor-credentials" className="py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-xl mx-auto space-y-1.5 relative">
              <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-semibold">
                Prestige Casework
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                Academic Experience & Outcomes
              </h2>
              <p className="text-xs text-slate-500 font-light leading-snug">
                Review our dental surgeons' fellowships, clinical publication records, and interact with micro-accurate procedural casework portfolios.
              </p>
            </div>

            <ExperienceCaseStudies />

          </div>
        </section>

        {/* SECTION: Patient Testimonials */}
        <PatientTestimonials onSelectTreatment={handleSelectPromo} />

        {/* SECTION: Secure Slot Booking Container */}
        <section id="booking-engine" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative">
          <AppointmentScheduler 
            preselectedServiceId={preselectedService} 
            preselectedPromoNotes={preselectedPromoNotes} 
          />
        </section>

      </motion.main>

      {/* Floating Siri AI Medical Assistant */}
      <SiriAssistant />

      {/* Elegant Cupertino Footers */}
      <footer className="bg-white border-t border-neutral-200/50 py-12 px-4 sm:px-6 text-neutral-400 font-light text-xs font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-neutral-900 flex items-center justify-center text-white text-xs font-mono font-bold leading-none italic">
                P
              </div>
              <span className="text-xs font-bold font-mono tracking-wider text-neutral-900 uppercase">
                Pearl Dental
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              Cupertino's signature clinic for digital orthodontics, laser endodontics, and biocompatible Swiss porcelain veneers. Redesigning dental experiences with Cupertino-inspired clinical design.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="font-semibold text-neutral-800 uppercase tracking-widest text-[9px] font-mono">Clinic Sites</p>
              <ul className="space-y-1 text-[11px] text-neutral-500">
                <li><a href="#services-catalog" className="hover:text-neutral-900">Advanced Treatments</a></li>
                <li><a href="#doctor-credentials" className="hover:text-neutral-900">Dentist Portfolios</a></li>
                <li><a href="#booking-engine" className="hover:text-neutral-900">Appointment Ledger</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-neutral-800 uppercase tracking-widest text-[9px] font-mono">Specialists</p>
              <ul className="space-y-1 text-[11px] text-neutral-500">
                <li>Dr. Olivia Vance</li>
                <li>Dr. Arthur Chen</li>
                <li>Dr. Kiara Brooks</li>
              </ul>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <p className="font-semibold text-neutral-800 uppercase tracking-widest text-[9px] font-mono">Clinic Location</p>
              <p className="text-[11px] text-neutral-500 leading-tight">
                10600 North Tantau Avenue<br />
                Cupertino, CA 95014<br />
                <span className="text-neutral-400">T: (408) 555-0101</span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-150 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400">
          <p>© 2026 Pearl Dental Specialist Clinics LLC. All rights clinical. Apple Health Wallet integrations reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-950 cursor-pointer">HIPAA Compliant</span>
            <span className="hover:text-neutral-950 cursor-pointer">Digital Privacy Standards</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
