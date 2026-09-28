import { useEffect, useState } from 'react';

const ROLES = ['web development', 'QA testing', 'e-commerce', 'data analytics', 'customer support', 'operations'];

/** Cycles through what I do, each word rolling up into place (after React Bits' Rotating Text) */
const RotatingRole = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % ROLES.length), 2400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <span className="role-rotator" aria-live="polite">
      {ROLES.map((role, n) => (
        <span
          key={role}
          className="role-rotator__word"
          data-state={n === i ? 'in' : n === (i - 1 + ROLES.length) % ROLES.length ? 'above' : 'below'}
          aria-hidden={n !== i}
        >
          {role}
        </span>
      ))}
    </span>
  );
};

export default RotatingRole;
