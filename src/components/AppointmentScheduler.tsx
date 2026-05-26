import React, { useState, useEffect } from "react";
import { DOCTORS, SERVICES } from "../data";
import { Appointment } from "../types";
import { Calendar, Clock, Sparkles, User, Mail, Phone, FileText, Check, Trash2, ShieldCheck, Ticket, Search, AlertCircle, X } from "lucide-react";

interface AppointmentSchedulerProps {
  preselectedServiceId?: string;
  preselectedPromoNotes?: string;
}

export default function AppointmentScheduler({ preselectedServiceId, preselectedPromoNotes }: AppointmentSchedulerProps) {
  // Appointment form state
  const [selectedDocId, setSelectedDocId] = useState<string>(DOCTORS[0].id);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientNotes, setPatientNotes] = useState<string>("");

  // System actions state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");

  // Define timeslots mimicking smart clinics
  const TIMESLOTS = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:30 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM"
  ];

  // Monitor treatment preselection shifts
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      // Auto preselect matching doctor based on treatment specialty guidelines
      if (preselectedServiceId === "clear-aligners") {
        setSelectedDocId("dr-arthur-chen"); // Orthodontist
      } else if (preselectedServiceId === "aesthetic-veneers") {
        setSelectedDocId("dr-olivia-vance"); // Aesthetic
      } else if (preselectedServiceId === "digital-implants" || preselectedServiceId === "laser-restorations" || preselectedServiceId === "preventive-detox") {
        setSelectedDocId("dr-kiara-brooks"); // Endodontist/Surgery/Hygienist
      }
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedPromoNotes) {
      setPatientNotes(preselectedPromoNotes);
    }
  }, [preselectedPromoNotes]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
    setSelectedTime(TIMESLOTS[1]); // default 10:00 AM
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    try {
      const stored = localStorage.getItem("pearl_dental_bookings");
      if (stored) {
        setAppointments(JSON.parse(stored));
      } else {
        // Hydrate with 1 mock default booking so the page doesn't look empty initially!
        const parsedTomorrow = new Date();
        parsedTomorrow.setDate(parsedTomorrow.getDate() + 2);
        const mockBooking: Appointment = {
          id: "appt-sample-01",
          doctorId: "dr-olivia-vance",
          serviceId: "aesthetic-veneers",
          date: parsedTomorrow.toISOString().split("T")[0],
          time: "10:00 AM",
          patientName: "Alexis Sterling",
          patientEmail: "alexis@apple.com",
          patientPhone: "+1 (408) 555-0199",
          notes: "Focusing on dental tone alignment and natural enamel shine.",
          status: "Confirmed",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("pearl_dental_bookings", JSON.stringify([mockBooking]));
        setAppointments([mockBooking]);
      }
    } catch (e) {
      console.error("Error reading appointments", e);
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!patientName.trim()) {
      setErrorMessage("Please supply a valid patient name.");
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes("@")) {
      setErrorMessage("Please supply an email address.");
      return;
    }
    if (!patientPhone.trim()) {
      setErrorMessage("Please supply a mobile contact number.");
      return;
    }
    if (!selectedDate) {
      setErrorMessage("Please pick an appointment date.");
      return;
    }
    if (!selectedTime) {
      setErrorMessage("Please select an available clock time.");
      return;
    }

    const newAppointment: Appointment = {
      id: `appt-${Date.now()}`,
      doctorId: selectedDocId,
      serviceId: selectedServiceId,
      date: selectedDate,
      time: selectedTime,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      notes: patientNotes.trim(),
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    try {
      const updated = [newAppointment, ...appointments];
      localStorage.setItem("pearl_dental_bookings", JSON.stringify(updated));
      setAppointments(updated);
      
      // Reset parts of form
      setPatientName("");
      setPatientEmail("");
      setPatientPhone("");
      setPatientNotes("");
      
      setSuccessMessage("Appointment secured! Your Pearl Health Wallet Pass is now active below.");
      
      // Auto dismiss success toast
      setTimeout(() => {
        setSuccessMessage("");
      }, 8000);
    } catch (err) {
      setErrorMessage("Could not save appointment in clinical storage.");
    }
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      const updated = appointments.map((appt) => {
        if (appt.id === id) {
          return { ...appt, status: "Cancelled" as const };
        }
        return appt;
      });
      localStorage.setItem("pearl_dental_bookings", JSON.stringify(updated));
      setAppointments(updated);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Permanently archive and delete this clinical booking?")) {
      const updated = appointments.filter((appt) => appt.id !== id);
      localStorage.setItem("pearl_dental_bookings", JSON.stringify(updated));
      setAppointments(updated);
    }
  };

  // Filter bookings based on user query
  const filteredAppointments = appointments.filter((appt) => {
    const docName = DOCTORS.find((d) => d.id === appt.doctorId)?.name || "";
    const srvName = SERVICES.find((s) => s.id === appt.serviceId)?.name || "";
    const terms = [
      appt.patientName.toLowerCase(),
      appt.patientEmail.toLowerCase(),
      docName.toLowerCase(),
      srvName.toLowerCase(),
      appt.date,
      appt.time.toLowerCase()
    ];
    return terms.some((term) => term.includes(filterQuery.toLowerCase()));
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
      
      {/* Clinique Reservation Scheduler Box (Takes 7 Cols on Desktop) */}
      <div className="lg:col-span-7 glass-card rounded-[40px] shadow-[0_12px_36px_rgba(0,0,0,0.03)] p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#0066cc] uppercase font-semibold">
            Digital Reservation Applet
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Secure Dental Space
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-light">
            Choose your signature dental treatment, expert clinician, and secure an interactive slot instantly. Custom bookings synchronize directly to your browser key.
          </p>
        </div>

        {/* Success / Error Feedbacks */}
        {successMessage && (
          <div className="bg-emerald-50/60 border border-emerald-100/80 p-4 rounded-2xl flex items-start gap-3 animate-fade-in backdrop-blur-xs">
            <div className="p-1 bg-emerald-500 rounded-full text-white text-[10px] shrink-0 mt-0.5">
              <Check className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-800">Reservation Success</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-2xl flex items-start gap-3 backdrop-blur-xs">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-rose-800">Booking Blocked</p>
              <p className="text-[11px] text-rose-600 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Apple System Form */}
        <form onSubmit={handleBook} className="space-y-5">
          
          {/* Section 1: Clinical Choices */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
              Step 1: Clinical Choices
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Treatment Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                  Treatment Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full glass-input-light hover:bg-white/80 border border-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0066cc] cursor-pointer"
                >
                  {SERVICES.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} ({srv.priceRange.split(" - ")[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialist Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0066cc]" />
                  Clinician Specialist
                </label>
                <select
                  value={selectedDocId}
                  onChange={(e) => setSelectedDocId(e.target.value)}
                  className="w-full glass-input-light hover:bg-white/80 border border-white rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0066cc] cursor-pointer"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name.split(",")[0]} — {doc.specialty.split(" (")[0]}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Section 2: Personal Identifiers */}
          <div className="space-y-3.5 border-t border-white/60 pt-5">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
              Step 2: Patient Identity
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Patient Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-650 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Full Patient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Appleseed"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="w-full glass-input-light border border-white rounded-xl px-3 py-2.5 text-xs text-slate-805 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                />
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-655 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Mobile Airplay / Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (408) 555-0199"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                  className="w-full glass-input-light border border-white rounded-xl px-3 py-2.5 text-xs text-slate-805 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                />
              </div>

              {/* E-mail Contact */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-650 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Patient Email Account
                </label>
                <input
                  type="email"
                  placeholder="appleseed@icloud.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  required
                  className="w-full glass-input-light border border-white rounded-xl px-3 py-2.5 text-xs text-slate-805 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                />
              </div>

            </div>
          </div>

          {/* Section 3: Date & iOS Time Dial Grid */}
          <div className="space-y-3.5 border-t border-white/60 pt-5">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold text-nowrap">
              Step 3: Space & Clock Selection
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-650 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Clinical Calendar Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="w-full glass-input-light border border-white rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0066cc] cursor-pointer"
                />
              </div>

              {/* Time Slots Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-650 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Clinical Hour Allocation
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIMESLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 text-[10px] font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        selectedTime === t
                          ? "bg-[#0066cc] border-[#0066cc] text-white shadow-sm"
                          : "bg-white/40 hover:bg-white/80 border-white/60 text-slate-705"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: Clinical Directives */}
          <div className="space-y-1.5 border-t border-white/60 pt-4">
            <label className="text-[11px] font-semibold text-slate-650 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Optional Doctor Directives / Medical Notes
            </label>
            <textarea
              placeholder="e.g. History of tooth sensitivity under cold food, desire veneer biological shade B1 etc."
              rows={2}
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              className="w-full glass-input-light border border-white rounded-xl p-3 text-xs text-slate-805 placeholder:text-slate-450 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0066cc] hover:bg-[#007bf5] text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-md shadow-[#0066cc]/15 hover:shadow-lg hover:shadow-[#0066cc]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Ticket className="w-4 h-4" />
            Book Signature Space
          </button>

        </form>
      </div>

      {/* active Wallet Passes Feed column (Takes 5 cols on Desktop) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Pass Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#0066cc]" />
              iOS Wallet Passes
            </h3>
            <span className="text-[10px] font-mono bg-white/60 border border-white/80 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
              {appointments.length} Active Pass{appointments.length !== 1 ? "es" : ""}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug font-light">
            Manage your booked dental consultations as unified Apple Wallet passes in local storage. Present this barcode upon entry.
          </p>
        </div>

        {/* Barcode Search / Filter */}
        {appointments.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter passes by clinician, service..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full glass-input-light border border-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* List of Passes */}
        <div className="space-y-5 max-h-[640px] overflow-y-auto pr-1">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appt) => {
              const doctor = DOCTORS.find((d) => d.id === appt.doctorId) || DOCTORS[0];
              const service = SERVICES.find((s) => s.id === appt.serviceId) || SERVICES[0];
              const isCancelled = appt.status === "Cancelled";

              return (
                <div
                  key={appt.id}
                  className={`glass-card-dark text-white rounded-[32px] overflow-hidden shadow-2xl transition-all relative flex flex-col justify-between ${
                    isCancelled ? "opacity-60 grayscale filter" : "hover:border-white/20"
                  }`}
                >
                  
                  {/* Top segment representing Apple Card branding */}
                  <div className="p-5 border-b border-white/5 space-y-4">
                    
                    {/* Brand header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#0066cc] to-sky-400 flex items-center justify-center text-[10px] font-bold text-white uppercase italic">
                          P
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066cc] font-bold">
                          Pearl Dental
                        </span>
                      </div>
                      <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full font-bold ${
                        isCancelled
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-emerald-500/15 text-emerald-405 border border-emerald-500/20"
                      }`}>
                        {appt.status}
                      </span>
                    </div>

                    {/* Patient and Clinician overview */}
                    <div className="grid grid-cols-2 gap-y-3 pt-1">
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Patient Name</p>
                        <p className="text-xs font-bold text-white mt-0.5 leading-snug">{appt.patientName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Clinician Specialist</p>
                        <p className="text-xs font-bold text-white mt-0.5 leading-snug">{doctor.name.split(",")[0]}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Treatment</p>
                        <p className="text-xs font-bold text-sky-400 mt-0.5 leading-snug">{service.name}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Calendar Block</p>
                        <p className="text-xs font-bold text-white mt-0.5 leading-snug font-mono flex items-center gap-1">
                          {appt.date} • {appt.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Perforated Tickets divider line */}
                  <div className="relative h-4 bg-slate-950/20 border-b border-t border-white/5 flex items-center justify-between">
                    <div className="absolute left-0 -top-2 w-4 h-4 rounded-full bg-[#f0f4f8] border-r border-white/5 shrink-0 select-none z-10 -translate-x-1/2" />
                    <div className="w-full border-t border-dashed border-white/10 mx-5" />
                    <div className="absolute right-0 -top-2 w-4 h-4 rounded-full bg-[#f0f4f8] border-l border-white/5 shrink-0 select-none z-10 translate-x-1/2" />
                  </div>

                  {/* Bottom Ticket segment representing checkout & bar code */}
                  <div className="p-5 space-y-4">
                    {appt.notes && (
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                        <p className="text-[8px] uppercase font-mono text-slate-400">Biological Directives</p>
                        <p className="text-[10px] text-zinc-300 mt-0.5 font-light leading-relaxed">{appt.notes}</p>
                      </div>
                    )}

                    {/* Barcode representation */}
                    <div className="space-y-1 bg-white p-3 rounded-2xl flex flex-col items-center justify-center">
                      {/* Generates a nice SVG barcode alignment */}
                      <svg className="w-full h-8 max-w-[200px]" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <rect x="0" y="0" width="1.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="3" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="5" y="0" width="2.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="9" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="11" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="13" y="0" width="3" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="18" y="0" width="1.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="21" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="23" y="0" width="2" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="27" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="29" y="0" width="2.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="33" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="35" y="0" width="1.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="38" y="0" width="3" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="42" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="44" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="46" y="0" width="2" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="49" y="0" width="1.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="52" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="54" y="0" width="3.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="59" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="61" y="0" width="2" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="64" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="66" y="0" width="2.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="70" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="72" y="0" width="1.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="75" y="0" width="3" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="79" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="81" y="0" width="2" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="84" y="0" width="1.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="87" y="0" width="2.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="91" y="0" width="0.5" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="93" y="0" width="3" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="97" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                        <rect x="99" y="0" width="1" height="20" fill="currentColor" className="text-neutral-900" />
                      </svg>
                      <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
                        {appt.id}
                      </span>
                    </div>

                    {/* Controller Actions */}
                    <div className="flex items-center gap-2 pt-1 justify-end">
                      {!isCancelled ? (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          className="px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-300 text-[10px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel Space
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(appt.id)}
                          className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/20 text-zinc-300 text-[10px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Log
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="glass-card text-center p-8 rounded-[28px] flex flex-col items-center justify-center space-y-3">
              <Ticket className="w-8 h-8 text-slate-400 animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-slate-605">No slots matched your query</p>
                <p className="text-[10px] text-slate-400 max-w-xs mt-0.5 leading-relaxed font-light">
                  Secure an open slot using the booking applet to generate your custom Apple Health Wallet pass.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
