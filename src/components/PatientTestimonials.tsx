import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Sparkles, 
  Bookmark, 
  BadgeCheck, 
  Play, 
  Pause,
  MessageSquareHeart,
  ExternalLink,
  Share2,
  Twitter,
  Facebook,
  Copy,
  Check
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  age: number;
  location: string;
  treatmentName: string;
  treatmentId: string;
  rating: number;
  quote: string;
  detailedStory: string;
  imageUrl: string;
  verifiedPatient: boolean;
  visitDate: string;
  category: "cosmetic" | "surgical" | "preventive" | "orthodontic";
  doctorReviewed: string;
}

const PATIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testi-sarah",
    name: "Sarah Jenkins",
    role: "Visual Designer & Art Director",
    age: 28,
    location: "Cupertino, CA",
    treatmentName: "Signature Porcelain Veneers",
    treatmentId: "aesthetic-veneers",
    rating: 5,
    quote: "Dr. Olivia Vance is a visual sculptor. I requested a vibrant but natural finish, and her Swiss feldspathic porcelain veneer matched my facial coordinates flawlessly. The digital 3D mockup prep is incredible.",
    detailedStory: "I always avoided showing my lateral incisors because of a childhood fracture. Dr. Vance didn't just place veneers; she mapped the natural light refraction (1.62 index) to blend with my surrounding enamel. Best of all, they are 100% stain-resistant, meaning my daily espresso habit has no effect on my smile.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    verifiedPatient: true,
    visitDate: "April 2026",
    category: "cosmetic",
    doctorReviewed: "Dr. Olivia Vance"
  },
  {
    id: "testi-marcus",
    name: "Marcus Vance",
    role: "Hardware Engineering Lead",
    age: 42,
    location: "San Jose, CA",
    treatmentName: "Computer-Guided Implants",
    treatmentId: "digital-implants",
    rating: 5,
    quote: "Losing a tooth in an athlete injury felt permanent. Dr. Kiara Brooks utilized her 3D Cone Beam CT mapping to direct a Grade-V surgical-grade titanium root with millimeter precision. Completely painless.",
    detailedStory: "I was extremely anxious about structural bone shrinkage. Dr. Brooks' surgical guide placed the titanium cylinder directly into optimal healthy bone volume in under 45 minutes of mild localized sedation. Real biometric alignment is back and my chewing power has fully restored.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    verifiedPatient: true,
    visitDate: "March 2026",
    category: "surgical",
    doctorReviewed: "Dr. Kiara Brooks"
  },
  {
    id: "testi-amira",
    name: "Dr. Amira Patel",
    role: "Pediatrician",
    age: 35,
    location: "Los Altos, CA",
    treatmentName: "Smart Aligner System",
    treatmentId: "clear-aligners",
    rating: 5,
    quote: "As a health provider, oral ergonomics matter deeply to me. The computational micro-force alignment strategy Dr. Arthur Chen executed resolved my deep crowded overjet in a record 6-month clear tray system.",
    detailedStory: "Traditional high-stress steel braces cause root tissue resorption and constant micro-cuts. Dr. Arthur Chen used smart polyurethane polymer materials that applied progressive gentle vector forces. It was removable, easy to brush, and virtually unseen in my daily clinical practices.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    verifiedPatient: true,
    visitDate: "January 2026",
    category: "orthodontic",
    doctorReviewed: "Dr. Arthur Chen"
  },
  {
    id: "testi-emily",
    name: "Emily Zhang",
    role: "Software Engineer",
    age: 31,
    location: "Sunnyvale, CA",
    treatmentName: "Laser Dental Therapy",
    treatmentId: "laser-restorations",
    rating: 5,
    quote: "Sudden pulpal pressure gave me sharp excruciating pain. Dr. Brooks' Er,Cr:YSGG dental laser sanitized my cavity root with zero vibration or high-pitched drill noises. My swelling vanished in just hours.",
    detailedStory: "I had a massive phobia of dental anesthetics and high-speed drilling. Dr. Brooks bypassed traditional heavy physical drilling. She instead targeted the active bacterial infection with pulsing sterile laser light. It sterilized the pulpal walls instantly and preserved my core tooth structure.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    verifiedPatient: true,
    visitDate: "May 2026",
    category: "surgical",
    doctorReviewed: "Dr. Kiara Brooks"
  },
  {
    id: "testi-david",
    name: "David Holtz",
    role: "Product Manager",
    age: 38,
    location: "Cupertino, CA",
    treatmentName: "Microscopic Dental Detox",
    treatmentId: "preventive-detox",
    rating: 5,
    quote: "The Guided Biofilm Detox is a revolution. Warm mineral water and high-magnification Carl Zeiss scopes completely remove tartar without scratching your delicate tooth enamel. Outstanding comfort.",
    detailedStory: "I hated traditional aggressive ultrasonic metal scraping. Pearl Dental's Guided Biofilm Therapy (GBT) uses warm water with erythritol micro-sprays. It was like a relaxing spa for my gums, and my sensitivity is entirely gone. They even magnified my healthy enamel on-screen to show the results.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verifiedPatient: true,
    visitDate: "May 2026",
    category: "preventive",
    doctorReviewed: "Dr. Kiara Brooks"
  }
];

interface PatientTestimonialsProps {
  onSelectTreatment: (serviceId: string, promoNotes: string) => void;
}

export default function PatientTestimonials({ onSelectTreatment }: PatientTestimonialsProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "cosmetic" | "surgical" | "preventive" | "orthodontic">("all");
  const [activeHighlightIdx, setActiveHighlightIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedIdState, setCopiedIdState] = useState<string | null>(null);

  const handleShareClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSharingId(sharingId === id ? null : id);
  };

  const getShareLinks = (item: TestimonialItem) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?testi_id=${item.id}`;
    const shareText = `Check out this verified dental treatment success story for ${item.name} at Pearl Dental Signature Clinic: "${item.quote}"`;
    return {
      copy: shareUrl,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedIdState(id);
    setTimeout(() => {
      setCopiedIdState(null);
      setSharingId(null);
    }, 2000);
  };

  // Synchronize dynamic sharing parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testiId = params.get("testi_id") || params.get("testimonial");
    if (testiId) {
      const targetItem = PATIENT_TESTIMONIALS.find(x => x.id === testiId);
      if (targetItem) {
        // Change category if needed
        if (targetItem.category !== activeCategory && activeCategory !== "all") {
          setActiveCategory("all");
        }
        // Small delay to allow category update
        setTimeout(() => {
          const index = (activeCategory === "all" ? PATIENT_TESTIMONIALS : PATIENT_TESTIMONIALS.filter(x => x.category === activeCategory))
            .findIndex(x => x.id === testiId);
          if (index !== -1) {
            setActiveHighlightIdx(index);
          } else {
            // Find overall
            const overallIdx = PATIENT_TESTIMONIALS.findIndex(x => x.id === testiId);
            if (overallIdx !== -1) {
              setActiveCategory("all");
              setActiveHighlightIdx(overallIdx);
            }
          }
          setIsAutoPlay(false);
          // Scroll to the review beautifully
          document.getElementById("patient-testimonials-center")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  // Filter items
  const filteredList = useMemo(() => {
    if (activeCategory === "all") return PATIENT_TESTIMONIALS;
    return PATIENT_TESTIMONIALS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Adjust active highlight index if list length changes
  useEffect(() => {
    setActiveHighlightIdx(0);
  }, [activeCategory]);

  // Handle autoplay loop
  useEffect(() => {
    if (isAutoPlay && filteredList.length > 1) {
      autoPlayTimer.current = setInterval(() => {
        setActiveHighlightIdx(prev => (prev + 1) % filteredList.length);
      }, 5500);
    } else {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [isAutoPlay, filteredList]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveHighlightIdx(prev => (prev - 1 + filteredList.length) % filteredList.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveHighlightIdx(prev => (prev + 1) % filteredList.length);
  };

  const currentHighlighted = filteredList[activeHighlightIdx] || PATIENT_TESTIMONIALS[0];

  const handleClaimTreatment = (item: TestimonialItem) => {
    const promoNotes = `I would like to schedule a consultation for "${item.treatmentName}" matching ${item.name}'s verified outcome. I am interested in achieving similar elite structural results under ${item.doctorReviewed}.`;
    onSelectTreatment(item.treatmentId, promoNotes);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative" id="patient-testimonials-center">
      
      {/* Decorative Blur Background Element */}
      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] bg-sky-100/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#0066cc]/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2 relative z-10">
        <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-bold inline-flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          Verified Patient Journeys
        </span>
        <h2 className="text-3xl sm:text-4.0xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Clinical Trust, Verified Daily
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-light leading-relaxed">
          Read genuine case testimonials from real local professionals who trusted our microscope diagnostics and laser treatments.
        </p>
      </div>

      {/* Category Segmented Control Tab buttons */}
      <div className="flex justify-center mb-10 relative z-10">
        <div className="inline-flex p-1 bg-slate-100/80 backdrop-blur-md rounded-2xl border border-slate-200/40">
          {(["all", "cosmetic", "orthodontic", "surgical", "preventive"] as const).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsAutoPlay(false);
                }}
                className={`px-3.5 sm:px-5 py-1.5 rounded-xl text-[10.5px] uppercase font-mono font-bold tracking-wider transition-all cursor-pointer ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat === "all" ? "Show All" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Grid: Rotating Hero Spotlight on Left / Structured Testimonial Grid on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* LEFT COLUMN: HERO ROTATING SPOTLIGHT (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between px-1 mb-3 text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
              Spotlight Case Interview
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                title={isAutoPlay ? "Pause slide loop" : "Play slide loop"}
              >
                {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 font-bold">
                {filteredList.length === 0 ? 0 : activeHighlightIdx + 1}/{filteredList.length}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentHighlighted.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              whileHover={{ 
                scale: 1.015, 
                y: -6,
                rotateX: 1.2,
                rotateY: -1.2,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)"
              }}
              transition={{ 
                duration: 0.35, 
                ease: "easeInOut",
                scale: { type: "spring", stiffness: 400, damping: 28 },
                y: { type: "spring", stiffness: 400, damping: 28 },
                rotateX: { type: "spring", stiffness: 400, damping: 28 },
                rotateY: { type: "spring", stiffness: 400, damping: 28 }
              }}
              className="bg-white rounded-[32px] p-6 sm:p-8 border border-slate-200/50 shadow-xs flex flex-col justify-between h-full relative overflow-hidden cursor-pointer"
              style={{ minHeight: "430px", transformStyle: "preserve-3d", perspective: 1000 }}
            >
              {/* Giant watermark quote icon */}
              <div className="absolute top-6 right-6 text-slate-50 opacity-80 pointer-events-none select-none">
                <Quote className="w-20 h-20" />
              </div>

              <div className="space-y-6 relative z-10">
                {/* Visual stars and verified indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(currentHighlighted.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold uppercase">
                    <BadgeCheck className="w-3.5 h-3.5 shrink-0" /> Verified Record
                  </span>
                </div>

                {/* Big quote statement */}
                <p className="text-sm font-bold text-slate-800 leading-relaxed italic">
                  "{currentHighlighted.quote}"
                </p>

                {/* Detailed dental journey story text */}
                <div className="space-y-2">
                  <h4 className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400">
                    Clinical Review & Story
                  </h4>
                  <p className="text-[11.5px] text-slate-500 font-light leading-relaxed">
                    {currentHighlighted.detailedStory}
                  </p>
                </div>

                {/* Treatment category tag mapping matches scheduler filters */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-[10px] font-mono text-[#0066cc] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-150/40">
                    Target Therapy: <strong className="font-bold">{currentHighlighted.treatmentName}</strong>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/50">
                    Surgical Lead: <span className="font-medium text-slate-700">{currentHighlighted.doctorReviewed}</span>
                  </span>
                </div>
              </div>

              {/* Patient bio footer */}
              <div className="border-t border-slate-100 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shrink-0">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={currentHighlighted.imageUrl}
                    alt={currentHighlighted.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shadow-xs shrink-0"
                  />
                  <div>
                    <h5 className="text-[12px] font-bold text-slate-800 leading-tight">
                      {currentHighlighted.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {currentHighlighted.role}, {currentHighlighted.age} • {currentHighlighted.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Share Experience Button */}
                  <div className="relative">
                    <button
                      onClick={(e) => handleShareClick(e, currentHighlighted.id)}
                      className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
                      title="Share Experience"
                      id={`btn-share-spotlight-${currentHighlighted.id}`}
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#0066cc]" />
                      <span>Share Story</span>
                    </button>

                    {/* Spotlight share popover */}
                    <AnimatePresence>
                      {sharingId === currentHighlighted.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-full mb-2 right-0 z-30 bg-white border border-slate-200 p-3 rounded-2xl shadow-xl w-56 space-y-2.5"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">Share Success Story</span>
                            <button onClick={() => setSharingId(null)} className="text-slate-400 hover:text-slate-600 font-mono text-[9px] font-bold">X</button>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => handleCopyLink(getShareLinks(currentHighlighted).copy, currentHighlighted.id)}
                              className="w-full p-2 rounded-xl text-left hover:bg-slate-50 border border-slate-100 flex items-center gap-2 text-[10px] font-medium font-sans text-slate-700 inline-flex"
                            >
                              {copiedIdState === currentHighlighted.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Copy Direct Link</span>
                                </>
                              )}
                            </button>

                            <a
                              href={getShareLinks(currentHighlighted).twitter}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full p-2 rounded-xl text-left hover:bg-slate-50 border border-slate-100 flex items-center gap-2 text-[10px] font-medium font-sans text-slate-700 inline-flex transition-colors"
                            >
                              <Twitter className="w-3.5 h-3.5 text-sky-500 fill-sky-50" />
                              <span>Share on Twitter / X</span>
                            </a>

                            <a
                              href={getShareLinks(currentHighlighted).facebook}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full p-2 rounded-xl text-left hover:bg-slate-50 border border-slate-100 flex items-center gap-2 text-[10px] font-medium font-sans text-slate-700 inline-flex transition-colors"
                            >
                              <Facebook className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                              <span>Share on Facebook</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => handleClaimTreatment(currentHighlighted)}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-[#0066cc] text-white text-[10.5px] rounded-xl font-bold tracking-tight transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-97"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Same Treatment
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Controls */}
          {filteredList.length > 1 && (
            <div className="flex items-center gap-2 mt-4 self-center lg:self-start">
              <button
                onClick={handlePrev}
                className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-250/50 hover:border-slate-350 transition-all cursor-pointer shadow-xs"
                id="btn-testi-prev"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <div className="flex items-center gap-1.5 px-1">
                {filteredList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlay(false);
                      setActiveHighlightIdx(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeHighlightIdx === idx ? "w-6 bg-[#0066cc]" : "w-1.5 bg-slate-300"
                    }`}
                    title={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-250/50 hover:border-slate-350 transition-all cursor-pointer shadow-xs"
                id="btn-testi-next"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: structured bento-themed grid layout with alternate ratings (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="px-1 mb-3 text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
            <span>Browse Patient Ledger Database</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full align-stretch" style={{ perspective: 1200 }}>
            {filteredList.map((item, idx) => {
              const isSpotlighted = item.id === currentHighlighted.id;
              return (
                <motion.div
                  key={item.id}
                  id={`testimonial-tile-${item.id}`}
                  onClick={() => {
                    setIsAutoPlay(false);
                    const realIdx = filteredList.findIndex(f => f.id === item.id);
                    if (realIdx !== -1) {
                      setActiveHighlightIdx(realIdx);
                    }
                  }}
                  whileHover={{ 
                    scale: 1.025, 
                    y: -6, 
                    rotateX: 1.8, 
                    rotateY: -1.8,
                    z: 8,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 380, 
                    damping: 24 
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`group text-left p-5 rounded-[28px] border flex flex-col justify-between cursor-pointer relative ${
                    isSpotlighted 
                      ? "bg-gradient-to-br from-[#0066cc]/5 via-white to-[#0066cc]/5 border-[#0066cc]/30 shadow-xs ring-1 ring-[#0066cc]/5" 
                      : "bg-white/45 hover:bg-white border-slate-200/50 hover:border-slate-300/85"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Verified check and Visit date */}
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 font-bold text-[#0066cc]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
                        {item.category.toUpperCase()}
                      </span>
                      <span>Verified: {item.visitDate}</span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 tracking-tight leading-relaxed line-clamp-3 group-hover:text-slate-900 transition-colors">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100/90 mt-4 flex items-center justify-between w-full relative">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-[11px] font-bold text-slate-800 leading-tight truncate">
                          {item.name}
                        </h4>
                        <p className="text-[9px] font-medium text-[#0066cc] tracking-tight truncate leading-none mt-0.5">
                          {item.treatmentName}
                        </p>
                      </div>
                    </div>
                    
                    {/* Stars + mini highlight link */}
                    <div className="flex flex-col items-end shrink-0 gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleShareClick(e, item.id)}
                          className="px-2 py-0.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 text-[9px] font-mono font-bold uppercase hover:text-slate-900 transition-all flex items-center gap-0.5 cursor-pointer"
                          title="Share Experience"
                          id={`btn-share-tile-${item.id}`}
                        >
                          <Share2 className="w-2.5 h-2.5 text-[#0066cc]" />
                          <span>Share</span>
                        </button>
                        <span className="text-[8px] font-mono text-[#0066cc] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 uppercase tracking-wide font-bold">
                          Focus <ExternalLink className="w-2" />
                        </span>
                      </div>
                    </div>

                    {/* Share Panel Overlay inside each specific tile */}
                    <AnimatePresence>
                      {sharingId === item.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()} // Prevent selecting the parent card
                          className="absolute inset-0 bg-white/97 backdrop-blur-md rounded-[28px] z-20 p-4 flex flex-col justify-between"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#0066cc]">
                                Share {item.name}'s Journey
                              </span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setSharingId(null); }} 
                                className="text-slate-400 hover:text-slate-600 font-mono text-[9px] font-bold px-1"
                              >
                                Close X
                              </button>
                            </div>
                            <p className="text-[10px] text-slate-500 font-light leading-snug line-clamp-2">
                              "{item.quote}"
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 text-[9.5px] font-semibold mt-auto pt-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCopyLink(getShareLinks(item).copy, item.id); }}
                              className="p-1 px-2.5 rounded-lg border border-slate-150 hover:bg-slate-50 flex items-center gap-1 justify-center text-slate-700 cursor-pointer text-left inline-flex"
                            >
                              {copiedIdState === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-emerald-700 font-semibold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-400" />
                                  <span>Copy Link</span>
                                </>
                              )}
                            </button>

                            <a
                              href={getShareLinks(item).twitter}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 px-2.5 rounded-lg border border-slate-150 hover:bg-slate-50 flex items-center gap-1 justify-center text-slate-700 inline-flex transition-colors"
                            >
                              <Twitter className="w-3 h-3 text-sky-500 fill-sky-50" />
                              <span>Twitter</span>
                            </a>

                            <a
                              href={getShareLinks(item).facebook}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 px-2.5 rounded-lg border border-slate-150 hover:bg-slate-50 flex items-center gap-1 justify-center text-slate-700 col-span-2 inline-flex transition-colors"
                            >
                              <Facebook className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                              <span>Share to Facebook</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Small assurance card footer */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5 leading-none">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Average Google & Yelp review rating: <span className="font-bold text-slate-850">4.96/5.0</span> (Based on 1.4K+ reviews)
            </span>
            <span className="hidden sm:inline-flex text-slate-400 font-light">
              No sponsored promotions included
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
