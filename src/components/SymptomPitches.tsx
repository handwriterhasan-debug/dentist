import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  HeartPulse, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Check, 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  Ticket, 
  AlertCircle,
  Clock,
  ThumbsUp,
  HelpCircle,
  Timer,
  Activity
} from "lucide-react";

export interface SymptomPitch {
  id: string;
  title: string;
  symptomLabel: string;
  commonSigns: string[];
  severity: "high" | "medium" | "low";
  iconType: "flame" | "sparkles" | "gap" | "missing" | "gums";
  pitchTitle: string;
  pitchSubtitle: string;
  recommendedServiceId: string;
  recommendedServiceName: string;
  specialPromoCode: string;
  promoValue: string;
  originalPrice: string;
  promoPrice: string;
  offerExpires: string;
  scientificInsight: string;
  clinicAssurances: string[];
}

const DENTAL_SYMPTOMS: SymptomPitch[] = [
  {
    id: "pain-emergency",
    title: "Sharp Throbbing Pain & Toothaches",
    symptomLabel: "Sudden toothache, extreme cold/heat sensitivity, pulp discomfort",
    commonSigns: ["Sharply worse eating or drinking", "Continuous dull pressure in face", "Severe cold/hot reaction lingering for minutes"],
    severity: "high",
    iconType: "flame",
    pitchTitle: "Microscopic Pulpal Laser Rescue",
    pitchSubtitle: "Immediate bacterial sterilization and nerve preservation",
    recommendedServiceId: "laser-restorations",
    recommendedServiceName: "Laser Dental Therapy",
    specialPromoCode: "PAINRESCUE",
    promoValue: "Complimentary Digital Diagnosis & Laser Scan with Cavity Treatment",
    originalPrice: "$600",
    promoPrice: "$250",
    offerExpires: "Lock slot today",
    scientificInsight: "Deep structural pain occurs when oral biofilms breach the outer healthy dentin and start impinging of the rich vascular bundle of the inner pulp. Instead of old aggressive structural drilling, our specialized Er,Cr:YSGG lasers selectively target the bacterial colonies with microscopic light pulses, avoiding physical pressure changes and pain.",
    clinicAssurances: ["Conducted using Swiss Carl Zeiss clinical microscopes", "98.7% instant pulpal inflammation relief rate", "Guaranteed pain-free digital treatment or immediate doctor dispatch"]
  },
  {
    id: "aesthetic-yellow",
    title: "Dull, Yellow, or Stained Enamel",
    symptomLabel: "Stubborn discolorations from coffee, tea, wine, smoking, or natural aging",
    commonSigns: ["Persistent dark shades in smile zone", "Tetracycline greyish internal stains", "Veneer-wear or uneven tooth lengths"],
    severity: "low",
    iconType: "sparkles",
    pitchTitle: "Signature Porcelain White Glow Up",
    pitchSubtitle: "Swiss high-density feldspathic dental porcelain structures",
    recommendedServiceId: "aesthetic-veneers",
    recommendedServiceName: "Signature Porcelain Veneers",
    specialPromoCode: "VENEER20",
    promoValue: "Free 3D Smile Mockup & 20% off Aesthetic Plan Consultation",
    originalPrice: "$1,200",
    promoPrice: "$960 / tooth",
    offerExpires: "Exclusive this week",
    scientificInsight: "Veneer porcelain is chemically bonded using custom light-activated glass polymers. We select Swiss high-density feldspathic porcelain structures which match the light refraction index (1.62) of pure healthy human enamel, recreating a perfect aesthetic white finish that coffee and red wine physically cannot penetrate.",
    clinicAssurances: ["3D digital aesthetic simulation before bonding", "Customized to your facial coordinates and skin undertones", "Life-time anti-staining chemical guarantee"]
  },
  {
    id: "missing-decayed",
    title: "Missing Single or Multiple Teeth",
    symptomLabel: "Gaps in dental structure, old empty sockets, compromised bite stability",
    commonSigns: ["Difficulties chewing confidently", "Bone volume shrinkage of the jaw", "Neighboring teeth slowly drifting outward"],
    severity: "high",
    iconType: "missing",
    pitchTitle: "Biomimetic Computer-Guided Implants",
    pitchSubtitle: "Grade-V biocompatible surgical-grade titanium root fusion",
    recommendedServiceId: "digital-implants",
    recommendedServiceName: "Computer-Guided Implants",
    specialPromoCode: "IMPLANT350",
    promoValue: "Complimentary 3D CBCT Bone Mapping Scan (Worth $350)",
    originalPrice: "$2,800",
    promoPrice: "$2,450 / root",
    offerExpires: "Available per slot",
    scientificInsight: "When teeth are missing, the surrounding alveolar bone lacks stimulation, leading to structural jaw contraction. Our 3D Cone Beam Computed Tomography (CBCT) bone diagnostic is matched with computer guides to slide a sterile Grade-V biomimetic titanium root into position at custom computed force angles, promoting strong osteointegration.",
    clinicAssurances: ["Precision computer guided mechanics to eliminate manual guessing", "Completed in under 60 mins under mild high-safety local anesthesia", "Fully biocompatible materials ensuring zero tissue rejection risk"]
  },
  {
    id: "ortho-crowded",
    title: "Spaced Gaps, Crowding, or Overbites",
    symptomLabel: "Genetic crowding, overlapping dental bodies, wide diastema spacing gaps",
    commonSigns: ["Tooth overlap trapping hard food particles", "Overjet or deep overbite causing jaw fatigue", "Confidence blocks when speaking or smiling publicly"],
    severity: "medium",
    iconType: "gap",
    pitchTitle: "Smart Computational Custom Clear Aligners",
    pitchSubtitle: "High-speed 3D force tracking therapy with virtual aligners",
    recommendedServiceId: "clear-aligners",
    recommendedServiceName: "Smart Aligner System",
    specialPromoCode: "ALIGNFREE",
    promoValue: "$500 Treatment Credit + Complimentary 360° Orthodontics Scan",
    originalPrice: "$3,500",
    promoPrice: "$3,000 package",
    offerExpires: "New patient slot only",
    scientificInsight: "Computational orthodontics leverages precise low-forces mapped inside an interactive virtual 3D timeline. Instead of high-stress metallic wires that cut mucosal blood flow, progressive smart aligners adjust teeth micrometrically, shortening the time needed to perfect vertical symmetry by up to 40%.",
    clinicAssurances: ["Ultra-clear, medical-grade polyurethane materials by Apple standards", "Removable daily for comfortable, hygienic flossing & eating", "Includes custom structural overnight retainers to lock alignment forever"]
  },
  {
    id: "gums-bleeding",
    title: "Red, Swollen, or Bleeding Gums",
    symptomLabel: "Tender bleeding while brushing, heavy plaque calcification, periodontal pockets",
    commonSigns: ["Pink brush bristles or bleeding gums during meals", "Plaque build-up producing chronic bad breath", "Slowly pulling/receding gum margins exposing roots"],
    severity: "medium",
    iconType: "gums",
    pitchTitle: "Microscopic Dental Detox & Biofilm Flush",
    pitchSubtitle: "Deep scaling under high-magnification with Swiss mineral sprays",
    recommendedServiceId: "preventive-detox",
    recommendedServiceName: "Microscopic Dental Detox",
    specialPromoCode: "DETOX149",
    promoValue: "Special First-Visit EMS Guided Biofilm Scaling Campaign Promo",
    originalPrice: "$350",
    promoPrice: "$149 basic",
    offerExpires: "Daily limited slots",
    scientificInsight: "Bleeding gums are a direct sign of active bacterial infiltration of the soft sulcus tissue. Left untreated, plaque bacteria calcifies into hard tartar. Guided Biofilm Therapy (GBT) utilizes warm mineral water sprays with erythritol powder to dissolve bacteria under 20x optical magnification, leaving teeth incredibly smooth and gum fibers immediately calm.",
    clinicAssurances: ["Zero-abrasion cleaning protecting your natural porcelain glaze", "Warm mineral water spray avoids traditional cold sensitivity shock", "Reverses gingivitis within 4-7 days of clinical session completion"]
  }
];

export default function SymptomPitches({ onSelectPromo }: { onSelectPromo: (serviceId: string, promoNotes: string) => void }) {
  const [selectedId, setSelectedId] = useState<string>("pain-emergency");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Daily Countdown Timer to establish authentic professional scarcity of dental promotional slots
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // Loop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activePitch = DENTAL_SYMPTOMS.find(x => x.id === selectedId) || DENTAL_SYMPTOMS[0];

  const handleCopyCodeAndScroll = (pitch: SymptomPitch) => {
    // Write code to clipboard
    navigator.clipboard.writeText(pitch.specialPromoCode);
    setCopiedId(pitch.id);
    
    // Auto-preselect and apply coupon in booking system
    const notesString = `Please apply the ${pitch.specialPromoCode} promo code for "${pitch.promoValue}". My core symptom: ${pitch.title}.`;
    onSelectPromo(pitch.recommendedServiceId, notesString);
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "flame":
        return <Flame className="w-5 h-5 text-rose-500 animate-bounce" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-[#0066cc]" />;
      case "missing":
        return <HeartPulse className="w-5 h-5 text-indigo-500" />;
      case "gap":
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case "gums":
        return <Activity className="w-5 h-5 text-cyan-500" />;
      default:
        return <HelpCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative" id="symptom-concerns-hub">
      
      {/* Visual Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-bold inline-flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <TrendingUp className="w-3.5 h-3.5" />
          Interactive Symptoms & Signature Offers
        </span>
        <h2 className="text-3xl sm:text-4.5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Have a Dental Concern? Pitching Special Clinic Offers
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
          Select any dental issue below to view computerized diagnostic insights, recommended therapies, and exclusive first-visit clinical offers pre-loaded for your reservation.
        </p>
      </div>

      {/* Grid of the Interactive Concerns Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: interactive symptom selector rail (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5">
          <div className="px-1 flex items-center justify-between text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
            <span>Select Your Symptom or Goal</span>
            <span className="flex items-center gap-1 text-[#0066cc]">
              <Timer className="w-3.5 h-3.5 shrink-0" />
              Offers Active: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </div>

          <div className="space-y-3">
            {DENTAL_SYMPTOMS.map((symptom) => {
              const isActive = selectedId === symptom.id;
              return (
                <button
                  key={symptom.id}
                  id={`symptom-btn-${symptom.id}`}
                  onClick={() => setSelectedId(symptom.id)}
                  className={`w-full text-left p-4 rounded-[26px] border transition-all duration-300 relative overflow-hidden flex items-start gap-4 cursor-pointer group ${
                    isActive 
                      ? "bg-white border-[#0066cc]/45 shadow-[0_12px_24px_rgba(0,102,204,0.045)] ring-1 ring-[#0066cc]/5" 
                      : "bg-white/45 border-slate-200/50 hover:bg-white hover:border-slate-300/80"
                  }`}
                >
                  <div className={`p-3 rounded-2xl shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "bg-[#0066cc]/10 text-[#0066cc] border border-[#0066cc]/10" : "bg-slate-100/80 text-slate-500"
                  }`}>
                    {getIcon(symptom.iconType)}
                  </div>

                  <div className="space-y-1 pr-2 w-full">
                    <div className="flex items-center justify-between gap-2.5">
                      <h3 className={`text-xs font-bold font-sans tracking-tight ${
                        isActive ? "text-[#0066cc]" : "text-slate-805"
                      }`}>
                        {symptom.title}
                      </h3>
                      {symptom.severity === "high" && (
                        <span className="text-[8px] uppercase tracking-wider font-mono font-bold bg-rose-50 border border-rose-100 text-rose-600 px-2 py-0.5 rounded-full shrink-0">
                          Urgent Priority
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug line-clamp-2 font-light">
                      {symptom.symptomLabel}
                    </p>
                    
                    {/* Tiny coupon hint */}
                    <div className="pt-2 flex items-center justify-between text-[9px] font-mono font-semibold">
                      <span className={isActive ? "text-[#0066cc]/90" : "text-slate-400"}>
                        Code: {symptom.specialPromoCode}
                      </span>
                      <span className={isActive ? "text-emerald-600" : "text-slate-400"}>
                        Save {symptom.originalPrice !== "$350" ? `up to ${symptom.promoValue.includes("500") ? "$500" : "Save 20%"}` : "Save $200+"}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#0066cc] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick clinical emergency callout */}
          <div className="p-4 rounded-[26px] bg-slate-900 text-white space-y-3 border border-white/5 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-[40px] pointer-events-none" />
            <div className="space-y-1">
              <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-rose-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                Severe Dental Emergency?
              </span>
              <h4 className="text-xs font-bold">Unbearable Pulp pain or Knocked Tooth?</h4>
              <p className="text-[10px] text-zinc-300 font-light leading-relaxed">
                Skip standard queues instantly. Our onsite Microscopic Oral Surgeon, Dr. Kiara Brooks, reserves 2 specialized daily priority slots for sudden trauma.
              </p>
            </div>
            
            <a
              href="#booking-engine"
              onClick={() => {
                onSelectPromo("laser-restorations", "URGENT CLINICAL DENTAL EMERGENCY: Direct allocation required immediately under sudden severe discomfort.");
              }}
              className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors px-3 py-1.5 rounded-xl cursor-pointer"
            >
              Reserve Critical Slot <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Side: Diagnosis Insight & High-converting Offer Pitch (7 Columns) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePitch.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="glass-card rounded-[40px] p-6 sm:p-8 border border-white h-full flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden"
            >
              {/* Subtle design accents */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-[#0066cc]/5 to-indigo-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-5">
                
                {/* Diagnostic headers */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 font-sans tracking-tight">
                      {activePitch.pitchTitle}
                    </h3>
                    <p className="text-[11px] text-[#0066cc] font-mono font-semibold">
                      {activePitch.pitchSubtitle}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full font-bold uppercase animate-pulse">
                      <Ticket className="w-3.5 h-3.5" /> Approved Special Offer
                    </span>
                  </div>
                </div>

                {/* Offer Pitch Highlight Box */}
                <div className="p-4.5 bg-gradient-to-br from-[#0066cc]/5 via-[#0066cc]/10 to-indigo-500/5 border border-[#0066cc]/15 rounded-[28px] space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#0066cc]">
                      Exclusive Clinique Coupon
                    </span>
                    <span className="text-[9px] text-slate-500 font-light font-mono">
                      Promo Code: <strong className="font-bold text-[#0066cc] font-mono">{activePitch.specialPromoCode}</strong>
                    </span>
                  </div>

                  <p className="text-xs font-extrabold text-slate-900 leading-snug">
                    {activePitch.promoValue}
                  </p>

                  <div className="flex items-center gap-4 pt-2 border-t border-[#0066cc]/10 w-full justify-between">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-mono">Standard First-time Rate</p>
                      <p className="text-sm font-light text-slate-500 font-mono line-through leading-none mt-1">{activePitch.originalPrice}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-[9px] text-emerald-600 uppercase font-mono font-bold">Campaign Special Rate</p>
                      <p className="text-xl font-black text-emerald-600 tracking-tight font-mono leading-none mt-1">{activePitch.promoPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Scientific Insight */}
                <div className="space-y-1.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                    Micro-Clinical Science & Diagnosis
                  </h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-light">
                    {activePitch.scientificInsight}
                  </p>
                </div>

                {/* Quality Guarantees checklist */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                    Pearl Signature Guarantees
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                    {activePitch.clinicAssurances.map((assurance, index) => (
                      <div key={index} className="flex items-start gap-2 text-slate-650">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-snug">{assurance}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Pitch Bottom bar */}
              <div className="border-t border-slate-100 pt-5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-450 font-mono">
                  <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span>Limited Campaign Slots: <strong className="text-slate-700 font-bold">Only 2/15 remaining</strong></span>
                </div>

                <button
                  onClick={() => handleCopyCodeAndScroll(activePitch)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 hover:bg-[#0066cc] text-white hover:shadow-md hover:shadow-blue-500/10 text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer group select-none active:scale-97"
                >
                  {copiedId === activePitch.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Promo Claimed & Card Applied!
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      Claim Promo & Auto-Fill Booking
                    </>
                  )}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Special Limited Offers Bento Cards Strip */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4.5">
        
        <div className="p-4.5 rounded-[28px] bg-white border border-slate-200/50 hover:border-[#0066cc]/25 transition-all flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-[#0066cc] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">Wedding Day Glow Package</h4>
            <p className="text-[10.5px] text-slate-450 font-light leading-snug">
              Comprehensive clinical whitening and premium porcelain cleaning for couples. Rebuild beautiful brilliance before your big day.
            </p>
            <p className="text-[10px] font-mono font-bold text-[#0066cc] pt-1">Inclusive Price: $450 complete</p>
          </div>
        </div>

        <div className="p-4.5 rounded-[28px] bg-white border border-slate-200/50 hover:border-indigo-500/25 transition-all flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">The Executive Dental Checkup</h4>
            <p className="text-[10.5px] text-slate-450 font-light leading-snug">
              Complete computed 3D radiography, plaque breakdown detox, organic polish, and custom board certification diagnosis report.
            </p>
            <p className="text-[10px] font-mono font-bold text-indigo-600 pt-1">Inclusive Price: $290 complete</p>
          </div>
        </div>

        <div className="p-4.5 rounded-[28px] bg-white border border-slate-200/50 hover:border-emerald-500/25 transition-all flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
            <ThumbsUp className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800">Senior Biomimetic Trust Plan</h4>
            <p className="text-[10.5px] text-slate-450 font-light leading-snug">
              Specially designed bite-reconstruction consultation with computerized diagnostic modeling, ensuring robust nutrition and comfort.
            </p>
            <p className="text-[10px] font-mono font-bold text-emerald-600 pt-1">Pre-selected Special rate: 100% Free Consultation</p>
          </div>
        </div>

      </div>

    </div>
  );
}
