import { useEffect, useRef, useState } from "react";

/** simple count-up when visible */
function useCountUp(target = 0, duration = 1200) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            setValue(Math.round(target * p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

/** uniform circular icon wrapper */
function IconCircle({ children }) {
  return (
    <div className="h-16 w-16 rounded-full bg-base-100 shadow ring-1 ring-base-300 flex items-center justify-center">
      {/* keep all icons */}
      <div className="h-7 w-7 text-base-content">{children}</div>
    </div>
  );
}


function IconUtensils() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3c-.6 0-1 .4-1 1v4a2 2 0 002 2v9a1 1 0 01-2 0V7a2 2 0 01-2-2V4a1 1 0 011-1" />
      <path d="M14 3v6a2 2 0 004 0V3" />
      <path d="M16 21v-7" />
    </svg>
  );
}

/** smile face */
function IconSmile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14c1.2 1.2 2.7 2 4 2s2.8-.8 4-2" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** avater */
function IconChef() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20a7 7 0 0114 0" />
      <path d="M12 12.2l2 2m-4 0l2-2" />
    </svg>
  );
}

/** heart */
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-6.8-4.4-9.4-7.1A5.6 5.6 0 016 3a6 6 0 016 3 6 6 0 016-3 5.6 5.6 0 013.4 10.9C18.8 16.6 12 21 12 21z" />
    </svg>
  );
}

function Stat({ icon, label, target }) {
  const { ref, value } = useCountUp(target, 1400);
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <IconCircle>{icon}</IconCircle>
      <div className="text-3xl font-semibold tracking-wide">{value}</div>
      <div className="text-sm md:text-base uppercase tracking-wider opacity-80">{label}</div>
    </div>
  );
}

export default function StatsRibbon() {
  return (
    <section className="relative bg-base-200 py-12">
    
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(1000px 380px at 8% -40%, #000 1px, transparent 1px), radial-gradient(900px 330px at 92% -50%, #000 1px, transparent 1px)"
        }}
      />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <Stat target={300} label="MENU ITEMS" icon={<IconUtensils />} />
          <Stat target={600} label="VISITOR EVERYDAY" icon={<IconSmile />} />
          <Stat target={400} label="EXPERT CHEF" icon={<IconChef />} />
          <Stat target={100} label="TEST & LOVE" icon={<IconHeart />} />
        </div>
      </div>
    </section>
  );
}
