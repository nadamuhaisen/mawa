import { useEffect, useRef, useState } from "react";
import { Building2, Users, MessageCircle, Smile } from "lucide-react";
import "../Styles/Stats.css";

const STATS = [
  { icon: Building2, value: 1200, suffix: "+", label: "عقار متاح" },
  { icon: Users, value: 8500, suffix: "+", label: "مستخدم نشط" },
  { icon: MessageCircle, value: 3400, suffix: "+", label: "طلب تواصل ناجح" },
  { icon: Smile, value: 96, suffix: "%", label: "نسبة رضا المستخدمين" },
];

/** Counts up from 0 to `value` once it scrolls into view. */
function StatItem({ icon: Icon, value, suffix, label }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1100;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplayValue(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-item__icon">
        <Icon size={22} strokeWidth={2} />
      </div>
      <p className="stat-item__value">
        {displayValue.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="stat-item__label">{label}</p>
    </div>
  );
}

function Stats() {
  return (
    <section className="stats-section">
      <div className="container stats-section__grid">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

export default Stats;
