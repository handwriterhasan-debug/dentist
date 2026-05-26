import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";

interface DuoComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function DuoComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before Treatment",
  afterLabel = "Signature Finish"
}: DuoComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden select-none cursor-ew-resize bg-slate-900 border border-white/20 shadow-2xl"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Behind) - Full coverage */}
      <img
        src={beforeImage}
        alt="Before dental case visualization"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Before Badge label */}
      <div className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10 text-[10px] font-mono tracking-wider uppercase text-white">
        {beforeLabel}
      </div>

      {/* After Image (Front) - Clipped via sliderPosition */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={afterImage}
          alt="After dental treatment result"
          className="absolute top-0 left-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* After Badge label */}
        <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40 z-10 text-[10px] font-mono tracking-wider uppercase text-slate-800 font-semibold shadow-xs">
          {afterLabel}
        </div>
      </div>

      {/* Sliding Drag Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.3)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Drag handle button center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex items-center justify-center pointer-events-auto cursor-ew-resize active:scale-90 transition-transform">
          <svg
            className="w-4.5 h-4.5 text-slate-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Instruction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/40 backdrop-blur-md text-[10px] text-zinc-300 px-4 py-1.5 rounded-full border border-white/10 pointer-events-none tracking-tight">
        Drag handle or tap across image to compare smile results
      </div>
    </div>
  );
}
