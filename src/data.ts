import { Doctor, Service, CaseStudy } from "./types";

export const CLINIC_STATS = {
  yearsOfExcellence: 18,
  casesCompleted: "24,000+",
  patientSatisfaction: "99.4%",
  boardSpecialists: 6,
  description: "Pearl Dental is a signature clinic engineered with surgical precision and modern care designed around you. For over 18 years, our practice is recognized as a leader in reconstructive dentistry, digital diagnostics, and bespoke cosmetic smile design."
};

export const DOCTORS: Doctor[] = [
  {
    id: "dr-olivia-vance",
    name: "Dr. Olivia Vance, DDS, FAGD",
    title: "Chief of Aesthetic Dentistry & Laser Treatment",
    specialty: "Cosmetic & Laser Smile Design",
    experienceYears: 14,
    education: [
      "Doctor of Dental Surgery — Columbia University College of Dental Medicine",
      "Surgical Fellowship in Advanced Implant Dentistry — Harvard School of Dental Medicine",
      "Mastership in the Academy of General Dentistry (MAGD) — 500+ hours of clinical mastery"
    ],
    bio: "Dr. Olivia Vance is a premier provider of signature veneers and non-invasive laser restorations. Renowned for combining the microscopic design principles of Swiss dental mechanics with the aesthetic nuance of Apple-style precision, she crafts smiles that are biologically sound and visually perfect.",
    imageUrl: "/src/assets/images/dentist_portrait_1779748065960.png",
    publications: [
      "Vance O. et al., 'Biocompatible Porcelain Venears: Microfracture Mechanics and Bonding Success Rate', Journal of Cosmetic Prosthodontics, 2023.",
      "Vance O., 'The Digital Patient Journey: Reconceptualizing Dental Care in the Modern Ergonomic Practice', International Dental Research, 2024."
    ],
    memberships: [
      "Fellow of the American Academy of Cosmetic Dentistry (AACD)",
      "Board Member, Association of Digital Implantology (ADI)",
      "active member, Academy of General Dentistry (AGD)"
    ]
  },
  {
    id: "dr-arthur-chen",
    name: "Dr. Arthur Chen, DDS, MS",
    title: "Lead Orthodontist & Craniofacial Specialist",
    specialty: "Modern Orthodontics (Invisalign & Lingual Aligner Systems)",
    experienceYears: 12,
    education: [
      "MS in Craniofacial Biology & Orthodontics Cert. — University of California, San Francisco (UCSF)",
      "DDS — NYU College of Dentistry (Valedictorian)"
    ],
    bio: "Dr. Arthur Chen has spent over a decade perfecting digital orthodontic mechanics. Utilizing custom computed-torque aligners and 3D computer models, he designs high-speed alignment plans that cut average orthodontic timelines by as much as 40 percent.",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    publications: [
      "Chen A., 'Low-Force Computerized Orthodontic Acceleration', American Journal of Orthodontics, 2022."
    ],
    memberships: [
      "American Association of Orthodontists (AAO)",
      "World Federation of Orthodontists (WFO)"
    ]
  },
  {
    id: "dr-kiara-brooks",
    name: "Dr. Kiara Brooks, DDS, Board Certified",
    title: "Director of Micro-Endodontics & Oral Surgery",
    specialty: "Microscopic Root Canal Therapy & Oral Reconstruction",
    experienceYears: 16,
    education: [
      "Board Certification in Oral Surgery — American Board of Oral and Maxillofacial Endodontics",
      "Surgical Residency — Johns Hopkins Hospital",
      "DDS — University of Michigan School of Dentistry"
    ],
    bio: "Dr. Kiara Brooks specialize in pain-free microscopic dental surgeries. Utilizing specialized Swiss Carl Zeiss optics and ultra-fine laser tools, she conducts complex root canal therapy with extreme success rates and minimal post-treatment downtime.",
    imageUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=400&auto=format&fit=crop",
    publications: [
      "Brooks K., 'Ultrasonic Mechanics in Micro-Endodontic Canal Cleaning', Endodontic Journal of North West, 2021."
    ],
    memberships: [
      "American Association of Endodontists (AAE)",
      "Johns Hopkins Dental Surgical Society"
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: "aesthetic-veneers",
    name: "Signature Porcelain Veneers",
    shortDescription: "Ultra-thin, custom-crafted Swiss optical porcelain structures for timeless aesthetic elevation.",
    fullDescription: "Bespoke veneer designs crafted from premium high-density feldspathic dental porcelain. Each unit is microscopically customized, hand-layered to replicate the translucency and natural light refraction of pure healthy cartilage and enamel. Non-invasive, durable, and highly bio-compatible.",
    durationMinutes: 90,
    priceRange: "$1,200 - $2,500 / tooth",
    iconName: "Sparkles",
    benefits: [
      "Flawless white visual restoration matching your biological tint",
      "High chemical resistance against staining from coffee, tea, and red wine",
      "Minimal structure grinding preserving up to 95% of natural ivory tissue",
      "Designed digitally using custom 3D diagnostic mockups"
    ],
    recoveryTime: "Minimal (0 - 1 days of mild sensitivity)"
  },
  {
    id: "digital-implants",
    name: "Computer-Guided Implants",
    shortDescription: "3D guided biomimetic titanium root replacements finished with handcrafted crowns.",
    fullDescription: "Leveraging 3D Cone Beam Computed Tomography (CBCT) and laser intraoral scanner mapping, our implants are computer-guided for micron-level alignment. This lowers surgery trauma, decreases physical healing schedules, and ensures structural bite perfection.",
    durationMinutes: 60,
    priceRange: "$2,800 - $4,500 / implant",
    iconName: "HeartPulse",
    benefits: [
      "Computer-guided precision lowering healing times by 50%",
      "Solid Grade-V biocompatible surgical-grade titanium root fusion",
      "Beautiful structural recovery matching tooth bite profile",
      "Life-time implant integration guarantee"
    ],
    recoveryTime: "3 - 5 days of structural healing"
  },
  {
    id: "clear-aligners",
    name: "Smart Aligner System",
    shortDescription: "High-speed custom tooth alignment powered by 3D computational force tracking.",
    fullDescription: "Our crystal-clear modern orthodontic therapy uses advanced computational forces. Instead of monthly bulky adjustments, we design progressive custom-molded aligners that map continuous low-force movements to achieve straight alignment.",
    durationMinutes: 45,
    priceRange: "$3,500 - $6,500 full plan",
    iconName: "ShieldCheck",
    benefits: [
      "Virtually invisible aesthetic design matching iOS lifestyle",
      "Removable for effortless eating and thorough oral hygiene",
      "Computer-calculated dental forces yielding 40% speed-ups",
      "No bulky brackets, wire cuts, or emergency dentist visits"
    ],
    recoveryTime: "0 days (seamless integration)"
  },
  {
    id: "laser-restorations",
    name: "Laser Dental Therapy",
    shortDescription: "Revolutionary non-drill laser cavity treatment and soft-tissue sculpting.",
    fullDescription: "Say goodbye to mechanical drills. We utilize state-of-the-art Waterlase Er,Cr:YSGG dental lasers that selectively vaporize decayed material without touching dental nerves, providing near pain-free treatment without needing heavy local anesthesia injections.",
    durationMinutes: 30,
    priceRange: "$250 - $600 / cavity",
    iconName: "Zap",
    benefits: [
      "No drilling vibrations, high-pitch sounds, or dental anxiety",
      "Enables laser-precise decay removal preserving precious ivory",
      "Natural laser sterilization reducing infection rates to zero",
      "Reduces soft tissue bleeding and speeds gum recovery immensely"
    ],
    recoveryTime: "Instant (no frozen cheek state!)"
  },
  {
    id: "preventive-detox",
    name: "Microscopic Dental Detox",
    shortDescription: "Advanced deep cleansing and ultrasonic scaling under optical microscopes.",
    fullDescription: "A deep clinical clean powered by Swiss EMS Guided Biofilm Therapy and warm mineral water. Conducted under high-magnification surgical microscopes, our hygiene specialists dissolve microscopic plaque bacteria and hard calculus deposits safely.",
    durationMinutes: 60,
    priceRange: "$150 - $350",
    iconName: "Activity",
    benefits: [
      "Eliminates harmful plaque bacteria before decay develops",
      "Gentle warm-water mineral spray prevents tooth sensitivity",
      "High magnifications ensure perfect coverage above and below gums",
      "Polishing treatment returns smooth glaze to tooth coatings"
    ],
    recoveryTime: "0 days"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-01",
    title: "Full Arch Aesthetic Restoration",
    description: "Correction of severe enamel fluorosis and dental wear. Utilized 10 hand-layered feldspathic porcelain veneers in the upper bridge to reconstruct correct structural bite length and beautiful natural white color integration.",
    category: "Cosmetic Dentistry",
    dentistId: "dr-olivia-vance",
    beforeImage: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
    complexity: "Advanced",
    durationWeeks: 3
  },
  {
    id: "case-02",
    title: "Craniofacial Diastema Closure",
    description: "Closure of a wide 4mm genetic midline diastema including corrective canine rotation. Fully aligned using 12 stages of Smart Aligners and meticulous tooth color bonding on lateral incisors.",
    category: "Orthodontics",
    dentistId: "dr-arthur-chen",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=600&auto=format&fit=crop",
    complexity: "Moderate",
    durationWeeks: 14
  },
  {
    id: "case-03",
    title: "Single Missing Lateral Reconstruction",
    description: "Patient presented with a congenital missing right incisor. Completed computerized 3D-guided surgical implant placement paired with immediate custom screw-retained ceramic crown, perfectly color-matched to sibling teeth.",
    category: "Implants",
    dentistId: "dr-kiara-brooks",
    beforeImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop",
    complexity: "Advanced",
    durationWeeks: 12
  }
];
