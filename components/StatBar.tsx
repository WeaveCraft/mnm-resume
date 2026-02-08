import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  icon: string;
  description: string;
  details: string[];
}

export default function StatBar({ label, value, icon, description, details }: StatBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="stat-row">
        <span className="stat-label">{label}</span>
        <div className="stat-bar-track">
          <motion.div
            className="stat-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
        <span className="stat-value">{value}/100</span>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="game-tooltip left-0 top-full mt-1 w-72 z-50"
          >
            <h4>{icon} {label} - {value}/100</h4>
            <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>{description}</p>
            {details.map((detail, i) => (
              <p key={i} className="tooltip-stat">&#9656; {detail}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
