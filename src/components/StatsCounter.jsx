import { useState, useEffect, useRef } from 'react';
import './StatsCounter.css';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }) {
  return (
    <section className="stats section" id="stats-section">
      <div className="stats__inner container">
        {stats.map((stat, i) => (
          <div key={i} className="stats__item glass-card" id={`stat-${i}`}>
            <div className="stats__value">
              <Counter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="stats__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
