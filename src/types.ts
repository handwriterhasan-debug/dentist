export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  education: string[];
  bio: string;
  imageUrl: string;
  publications?: string[];
  memberships?: string[];
}

export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  priceRange: string;
  iconName: string; // from lucide
  benefits: string[];
  recoveryTime: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  category: string;
  dentistId: string;
  beforeImage: string;
  afterImage: string;
  complexity: "Routine" | "Moderate" | "Advanced";
  durationWeeks?: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  status: "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}
