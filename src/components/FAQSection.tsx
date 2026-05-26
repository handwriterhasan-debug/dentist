import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  ChevronDown, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  HelpCircle,
  FileCheck2,
  Calendar,
  X,
  ArrowRight,
  TrendingUp,
  Eye
} from "lucide-react";

export interface FAQItem {
  id: string;
  category: "all" | "treatments" | "billing" | "policy";
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-insurance",
    category: "billing",
    question: "Which insurance providers does Pearl Dental accept, and how do copays work?",
    answer: "Pearl Dental is a high-precision boutique clinic. We are proud to accept and process outer-layer claims for all major PPO insurance policies (such as Delta Dental, MetLife, Cigna, Guardian, and Aetna). We assist you by handling all billing communications and submitting medical paperwork for automatic out-of-network reimbursement. However, we are out-of-network with DHMO and Medicaid plans to preserve our uncompromising standard of using high-purity Swiss dental ceramics and laser-guided micro-diagnostics.",
    tags: ["insurance", "billing", "ppo", "payment", "copay"]
  },
  {
    id: "faq-veneers-process",
    category: "treatments",
    question: "What is the procedure for Swiss Porcelain Veneers and how long do they last?",
    answer: "Our signature veneers represent crown-level artistry. First, our board specialists take micro-accurate 3D oral scans of your ivory structures. Second, we custom-prep your teeth under magnification, preserving up to 95% of your natural enamel. Finally, our Swiss dental artisans hand-layer feldspathic ceramics to map natural dental light refractions. With standard premium hygiene care, our Signature bio-porcelain veneers are engineered to last 15 to 20 years without showing any staining, discoloration, or structural wear.",
    tags: ["veneers", "pricing", "cosmetic", "swiss", "porcelain"]
  },
  {
    id: "faq-guided-implants",
    category: "treatments",
    question: "How do computer-guided implants differ from traditional dental bone surgery?",
    answer: "Traditional dental implants rely purely on hand-eye alignment estimation. At Pearl Clinic, we utilize 3D Cone Beam Computed Tomography (CBCT) combined with custom-milled optical surgery guides. The precision titanium root replacement is inserted precisely through computed guides down to the micron. This extreme laser positioning avoids unnecessary vascular disruption, reduces postoperative discomfort by 75%, and accelerates your overall jawbone integration timeline to less than a week.",
    tags: ["implants", "surgery", "3d", "precision", "cavity"]
  },
  {
    id: "faq-aligners-timeline",
    category: "treatments",
    question: "How does the Smart Aligner system achieve high-speed tooth correction?",
    answer: "Instead of binding heavy metallic wires to teeth which apply inconsistent, high-trauma forces, our Smart Aligner system maps progressive adjustments digitally. Utilizing sophisticated bio-force alignment software, Dr. Arthur Chen calculates custom sequential clear aligners that exert continuous, optimized, low-force points. This continuous stimulation accelerates tissue restructuring safely, resulting in straight cosmetic alignment up to 40% faster than classic brass brackets.",
    tags: ["aligners", "orthodontics", "invisalign", "braces", "duration"]
  },
  {
    id: "faq-laser-pain",
    category: "treatments",
    question: "Is the Waterlase Laser cavity therapy completely pain-free? Do I need anesthesia?",
    answer: "Yes, in over 92% of cases, patients require zero numbing needles or local anesthesia injections. Waterlase laser technology is revolutionary; it combines high-intensity laser energy with atomized mineral water droplets to vaporize decayed enamel instantly. Because there is no mechanical friction, drilling heat, or bone-level vibration, pain receptors inside your teeth are never triggered. Furthermore, the natural coherent light sterilizes your dentin on-contact, ensuring perfect cavity recovery with absolutely no lingering frozen cheek paralysis.",
    tags: ["laser", "pain", "anesthesia", "cavity", "decay"]
  },
  {
    id: "faq-billing-installments",
    category: "billing",
    question: "Do you offer clinical financing or split-payment installments?",
    answer: "Yes, dental health should not be delayed. Under our premium financial ledger system, patients can opt for 0% APR split-payment structures for all cosmetics (veneers) and reconstructive treatments (orthodontics and implants). We partner directly with premium care financing platforms like CareCredit and LendingClub. Additionally, we create customized in-house payment solutions scheduled across your specific procedural cycle.",
    tags: ["financing", "payment", "installments", "cost", "carecredit"]
  },
  {
    id: "faq-cancellation-policy",
    category: "policy",
    question: "What is your clinical cancellation and rescheduling policy?",
    answer: "To preserve pristine ergonomic patient cycles and zero-wait environments, structural surgery blocks and specialist slots are reserved exclusively for you. We request a courteous 24-hour notification for any schedule modifications or slot cancellations. Cancellations within the 24-hour clinical block may incur a specialized retention fee, which helps us balance our zero-gravity lounge availability for emergency cases.",
    tags: ["cancellation", "policy", "appointment", "schedule", "fees"]
  },
  {
    id: "faq-first-visit",
    category: "policy",
    question: "What should I expect during my primary diagnostic booking?",
    answer: "Your initial visit is a comprehensive, multi-spectral oral audit. We perform high-resolution 3D intraoral diagnostic imaging, localized digital x-rays, and an aesthetic alignment simulation. You will sit down directly with Dr. Olivia Vance to review your computer models and craft an optimized, bio-compatible treatment roadmap. No procedures are initiated until you have visualized and approved your dental blueprint.",
    tags: ["visit", "diagnostic", "consultation", "first", "scans"]
  }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "treatments" | "billing" | "policy">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Local states to track "Was this helpful" feedback votes
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, "yes" | "no">>({});

  // Track FAQ view counts from localStorage
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});

  // Record a view count increase for an FAQ item
  const recordView = (id: string) => {
    setViewCounts(prev => {
      const newCounts = { ...prev, [id]: (prev[id] || 0) + 1 };
      localStorage.setItem("pearl_faq_views", JSON.stringify(newCounts));
      return newCounts;
    });
  };

  // Synchronize search and category query params with the URL and load view counts
  useEffect(() => {
    // Load view counts from localStorage
    const saved = localStorage.getItem("pearl_faq_views");
    if (saved) {
      try {
        setViewCounts(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading view counts:", e);
      }
    }

    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("faq_search");
    const categoryParam = params.get("faq_category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (categoryParam && ["all", "treatments", "billing", "policy"].includes(categoryParam)) {
      setActiveCategory(categoryParam as "all" | "treatments" | "billing" | "policy");
    }

    // Listen to popstate event (e.g. browser back/forward buttons) to sync url param updates
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      setSearchQuery(p.get("faq_search") || "");
      setActiveCategory((p.get("faq_category") || "all") as "all" | "treatments" | "billing" | "policy");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (searchQuery.trim()) {
      params.set("faq_search", searchQuery);
    } else {
      params.delete("faq_search");
    }

    if (activeCategory && activeCategory !== "all") {
      params.set("faq_category", activeCategory);
    } else {
      params.delete("faq_category");
    }

    const newSearch = params.toString();
    const newPath = newSearch ? `${window.location.pathname}?${newSearch}` : window.location.pathname;
    
    // Only update url if search string actually is different to prevent duplicate loops
    if (window.location.search !== (newSearch ? `?${newSearch}` : "")) {
      window.history.replaceState(null, "", newPath);
    }
  }, [searchQuery, activeCategory]);

  // Reset expanded panel on filter/search switch
  const handleCategoryChange = (cat: "all" | "treatments" | "billing" | "policy") => {
    setActiveCategory(cat);
    setExpandedId(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setExpandedId(null);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    const isNowExpanding = expandedId !== id;
    setExpandedId(isNowExpanding ? id : null);
    if (isNowExpanding) {
      recordView(id);
    }
  };

  const handleVote = (id: string, type: "yes" | "no") => {
    if (helpfulVotes[id]) return; // Only allow voting once per panel
    setHelpfulVotes(prev => ({ ...prev, [id]: type }));
  };

  // Retrieve top 3 most viewed FAQs based on the localStorage views mapping
  const popularFAQs = useMemo(() => {
    return [...FAQ_ITEMS]
      .sort((a, b) => {
        const countA = viewCounts[a.id] || 0;
        const countB = viewCounts[b.id] || 0;
        if (countB !== countA) {
          return countB - countA;
        }
        return FAQ_ITEMS.indexOf(a) - FAQ_ITEMS.indexOf(b);
      })
      .slice(0, 3);
  }, [viewCounts]);

  // Handle a click on a popular question item, resetting category filter if needed
  const handlePopularClick = (item: FAQItem) => {
    if (activeCategory !== "all" && activeCategory !== item.category) {
      setActiveCategory("all");
    }
    setExpandedId(item.id);
    recordView(item.id);
    setTimeout(() => {
      document.getElementById(`faq-card-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 120);
  };

  // Perform dynamic filtered calculations
  const filteredFAQs = useMemo(() => {
    return FAQ_ITEMS.filter(faq => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const cleanSearch = searchQuery.toLowerCase().trim();
      
      const matchesSearch = !cleanSearch || 
        faq.question.toLowerCase().includes(cleanSearch) || 
        faq.answer.toLowerCase().includes(cleanSearch) ||
        faq.tags.some(t => t.toLowerCase().includes(cleanSearch));
        
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Scroll gracefully to the digital booking block
  const scrollToBooking = () => {
    document.getElementById("booking-engine")?.scrollIntoView({ behavior: "smooth" });
  };

  // Find related FAQs based on tag overlap or same category
  const getRelatedFAQs = (currentFaq: FAQItem): FAQItem[] => {
    const list = FAQ_ITEMS.filter((item) => item.id !== currentFaq.id);
    
    // Calculate tag overlap count
    const scored = list.map(item => {
      const overlapCount = item.tags.filter(tag => currentFaq.tags.includes(tag)).length;
      return { item, score: overlapCount };
    });
    
    // Sort by overlap count desc, then keep those with at least 1 overlapping tag
    const matched = scored
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.item);
      
    if (matched.length >= 2) {
      return matched.slice(0, 3);
    }
    
    // Fallback: items in the same category
    const sameCat = list.filter(item => item.category === currentFaq.category && !matched.map(m => m.id).includes(item.id));
    const combined = [...matched, ...sameCat];
    return combined.slice(0, 3);
  };

  // Helper function to render visual bullet indicators depending on category type
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "treatments":
        return {
          label: "Treatment Procedure",
          bg: "bg-blue-50 text-[#0066cc] border-blue-105",
          icon: <Sparkles className="w-3 h-3 text-[#0066cc]" />
        };
      case "billing":
        return {
          label: "Billing & Insurance",
          bg: "bg-emerald-50 text-emerald-700 border-emerald-110",
          icon: <CreditCard className="w-3 h-3 text-emerald-600" />
        };
      case "policy":
        return {
          label: "Clinic Policy",
          bg: "bg-purple-50 text-purple-700 border-purple-110",
          icon: <Clock className="w-3 h-3 text-purple-600" />
        };
      default:
        return {
          label: "General Q&A",
          bg: "bg-slate-50 text-slate-600 border-slate-100",
          icon: <HelpCircle className="w-3 h-3 text-slate-500" />
        };
    }
  };

  return (
    <section id="patient-faq" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
      
      {/* Visual Background Elements */}
      <div className="absolute top-[20%] right-[10%] w-[380px] h-[380px] bg-sky-200/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[420px] h-[420px] bg-indigo-150/15 rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="relative z-10 space-y-12">
        
        {/* Typographic Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-bold px-3 py-1 bg-white/40 border border-white/60 rounded-full shadow-xs">
            Patient Support Registry
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Patient Diagnosis & Policy FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-light leading-snug">
            Equip yourself with detailed knowledge on computer-guided surgeries, Swiss biocompatible materials, insurance processing, and appointment agreements.
          </p>
        </div>

        {/* Filters and Control Board */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center max-w-4xl mx-auto">
          
          {/* iOS Segmented Selector */}
          <div className="md:col-span-7 p-1 bg-white/40 border border-white/80 backdrop-blur-md rounded-2xl flex overflow-x-auto gap-0.5 shadow-sm">
            {(["all", "treatments", "billing", "policy"] as const).map((cat) => (
              <button
                key={cat}
                id={`faq-tab-${cat}`}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-1 py-2 text-[11px] font-semibold rounded-xl text-center capitalize transition-all duration-200 cursor-pointer text-nowrap px-3 ${
                  activeCategory === cat
                    ? "bg-white text-[#0066cc] shadow-xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat === "all" ? "View All Items" : cat}
              </button>
            ))}
          </div>

          {/* Interactive Search Field */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search procedures, insurers, pricing..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full glass-input-light border border-white rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
            />
            {searchQuery && (
              <button
                id="faq-search-clear"
                onClick={clearSearch}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Questions Section */}
        <div id="faq-popular-section" className="max-w-4xl mx-auto space-y-3 pt-1.5">
          <div className="flex items-center gap-2 px-1 text-[10px] uppercase tracking-wider font-bold text-slate-450 font-mono">
            <TrendingUp className="w-4 h-4 text-[#0066cc] animate-pulse" />
            <span>Popular Topics</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {popularFAQs.map((faq) => {
              const viewsCount = viewCounts[faq.id] || 0;
              return (
                <button
                  key={`popular-${faq.id}`}
                  id={`faq-popular-btn-${faq.id}`}
                  onClick={() => handlePopularClick(faq)}
                  className="text-left p-4 rounded-[22px] bg-white/45 hover:bg-white border border-[#0f172a]/5 hover:border-[#0066cc]/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 group relative overflow-hidden"
                >
                  {/* Subtle decorative design accent vector */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#0066cc]/5 to-transparent rounded-bl-[24px] pointer-events-none transition-transform duration-300 group-hover:scale-125" />
                  
                  <div className="space-y-1.5 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#0066cc]/80">
                        <span className="w-1 h-1 rounded-full bg-[#0066cc]" />
                        {faq.category === "treatments" ? "Treatment" : faq.category === "billing" ? "Billing" : "Policy"}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-[#0066cc] line-clamp-2 leading-relaxed transition-colors">
                      {faq.question}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100/80 w-full text-[9px] font-mono text-slate-400 relative z-10">
                    <span className="flex items-center gap-1 font-medium">
                      <Eye className="w-3.5 h-3.5 text-slate-350" />
                      {viewsCount} {viewsCount === 1 ? 'view' : 'views'}
                    </span>
                    <span className="text-[9px] font-bold text-[#0066cc] opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0 flex items-center gap-0.5">
                      View <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Items Grid / List */}
        <div className="max-w-4xl mx-auto space-y-3.5 relative">
          
          <AnimatePresence mode="popLayout">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const isExpanded = expandedId === faq.id;
                const catTheme = getCategoryTheme(faq.category);
                const voteState = helpfulVotes[faq.id];

                return (
                  <motion.div
                    key={faq.id}
                    id={`faq-card-${faq.id}`}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 240,
                      damping: 28,
                    }}
                    className={`glass-card rounded-[28px] overflow-hidden transition-all duration-300 relative border ${
                      isExpanded 
                        ? "bg-white border-[#0066cc]/20 shadow-[0_8px_32px_rgba(0,0,0,0.035)] ring-1 ring-[#0066cc]/5" 
                        : "hover:bg-white/60 border-white/60 shadow-xs"
                    }`}
                  >
                    {/* Header Summary Row */}
                    <button
                      id={`faq-btn-${faq.id}`}
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full text-left px-5 sm:px-7 py-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-2 flex-1">
                        {/* Category Badge metadata */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/40 shadow-2xs ${catTheme.bg}`}>
                            {catTheme.icon}
                            {catTheme.label}
                          </span>
                        </div>
                        <h3 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                          isExpanded ? "text-[#0066cc]" : "text-slate-900 group-hover:text-[#0066cc]"
                        }`}>
                          {faq.question}
                        </h3>
                      </div>

                      {/* Animated Rotator Icon element */}
                      <div className={`p-1.5 rounded-full border border-slate-200/65 bg-white shadow-3xs transition-transform duration-300 mt-1 shrink-0 ${
                        isExpanded ? "rotate-180 bg-[#0066cc]/10 border-[#0066cc]/20" : ""
                      }`}>
                        <ChevronDown className={`w-4 h-4 transition-colors ${isExpanded ? "text-[#0066cc]" : "text-slate-400"}`} />
                      </div>
                    </button>

                    {/* Animated Collapsible Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`faq-content-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 26 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-white/60 space-y-4">
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                              {faq.answer}
                            </p>

                            {/* Tags list segment */}
                            <div className="flex flex-wrap gap-1 pt-1.5">
                              {faq.tags.map(t => (
                                <span key={t} className="text-[9px] font-mono text-slate-400 bg-slate-100/60 border border-slate-200/20 px-2 py-0.5 rounded-md">
                                  #{t}
                                </span>
                              ))}
                            </div>

                            {/* Related Questions section */}
                            {(() => {
                              const related = getRelatedFAQs(faq);
                              if (related.length === 0) return null;
                              return (
                                <div className="pt-3 border-t border-slate-100/80 space-y-2">
                                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                                    Related Questions
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {related.map((item) => (
                                      <button
                                        key={item.id}
                                        id={`faq-related-link-${faq.id}-${item.id}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedId(item.id);
                                          recordView(item.id);
                                          setTimeout(() => {
                                            document.getElementById(`faq-card-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                          }, 100);
                                        }}
                                        className="text-left p-2.5 rounded-xl bg-slate-50/50 hover:bg-slate-100/70 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer group flex items-start justify-between gap-2"
                                      >
                                        <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#0066cc] line-clamp-2 leading-tight transition-colors">
                                          {item.question}
                                        </span>
                                        <ArrowRight className="w-3" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Helpfulness Voting Bar */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100/80 text-[10px] sm:text-xs">
                              <span className="text-slate-400 font-light flex items-center gap-1 font-mono">
                                <FileCheck2 className="w-3.5 h-3.5 text-slate-350" />
                                Was this answer helpful?
                              </span>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  id={`faq-vote-yes-${faq.id}`}
                                  onClick={() => handleVote(faq.id, "yes")}
                                  disabled={!!voteState}
                                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                                    voteState === "yes"
                                      ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-3xs"
                                      : voteState 
                                      ? "opacity-50 border-slate-100 text-slate-400"
                                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95"
                                  }`}
                                >
                                  <ThumbsUp className="w-3.5 h-3.5 shrink-0" />
                                  <span>{voteState === "yes" ? "Voted Helpful" : "Yes"}</span>
                                </button>
                                <button
                                  id={`faq-vote-no-${faq.id}`}
                                  onClick={() => handleVote(faq.id, "no")}
                                  disabled={!!voteState}
                                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                                    voteState === "no"
                                      ? "bg-rose-50 border-rose-200 text-rose-600 shadow-3xs"
                                      : voteState 
                                      ? "opacity-50 border-slate-100 text-slate-400"
                                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95"
                                  }`}
                                >
                                  <ThumbsDown className="w-3.5 h-3.5 shrink-0" />
                                  <span>{voteState === "no" ? "Voted Down" : "No"}</span>
                                </button>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                id="faq-empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card text-center p-12 rounded-[32px] flex flex-col items-center justify-center space-y-3"
              >
                <HelpCircle className="w-10 h-10 text-slate-400 animate-pulse" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-700">No matching questions found</p>
                  <p className="text-xs text-slate-450 max-w-sm leading-relaxed font-light">
                    We couldn't find FAQs matching <span className="font-semibold text-[#0066cc]">"{searchQuery}"</span>. Try typing "insurance", "veneers", "pricing", or clear filters.
                  </p>
                </div>
                <button
                  id="faq-empty-clear-btn"
                  onClick={clearSearch}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer active:scale-95 transition-all"
                >
                  Clear Search Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Bottom Prominent Interactive CTA Board */}
        <div className="max-w-4xl mx-auto glass-card rounded-[38px] p-6 sm:p-8 bg-gradient-to-r from-blue-50/20 via-sky-50/10 to-indigo-50/10 border border-white relative overflow-hidden">
          <div className="absolute -inset-2 bg-radial-gradient from-[#0066cc]/5 to-transparent blur-lg pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-left">
            <div className="space-y-1.5 flex-1">
              <h3 className="text-lg font-bold text-[#0f172a] tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-[#0066cc]" />
                Have other questions about clinical logistics?
              </h3>
              <p className="text-xs text-slate-500 max-w-xl font-light leading-relaxed">
                Connect directly with our 24/7 Siri AI Medical Assistant to diagnose sensitive dental symptoms or book custom slots that sync securely to your personal calendar block.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
              {/* Trigger Applet smooth scrolling */}
              <button
                id="faq-cta-book-slot"
                onClick={scrollToBooking}
                className="bg-[#0066cc] hover:bg-[#007bf5] text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-md shadow-blue-500/10"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Secure Slot
              </button>
              
              {/* Inform user about the Siri chatbot widget */}
              <button
                id="faq-cta-sum-siri"
                onClick={() => {
                  // Direct user to toggle Siri assistant trigger widget
                  const siriWidgetBtn = document.querySelector('button[class*="fixed bottom-6 right-6"]') as HTMLButtonElement;
                  if (siriWidgetBtn) {
                    siriWidgetBtn.click();
                  }
                }}
                className="bg-white/60 hover:bg-white/95 border border-white/80 text-neutral-700 text-xs font-semibold px-5 py-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Ask Siri Assistant
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
