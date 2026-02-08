import { useState } from 'react';
import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number; // 0-100
  icon: string; // emoji or icon
  description: string;
  details: string[];
  color?: string;
}

export default function StatBar({ 
  label, 
  value, 
  icon, 
  description, 
  details,
  color = 'from-bronze-dark via-bronze to-bronze-light'
}: StatBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative mb-4"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Stat Label */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-parchment font-game text-sm flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="uppercase tracking-wider">{label}</span>
        </span>
        <span className="text-bronze-light font-game text-sm">{value}/100</span>
      </div>

      {/* Stat Bar */}
      <div className="stat-bar group">
        <motion.div
          className={`stat-bar-fill bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ 
            duration: 1.5, 
            delay: 0.2,
            ease: "easeOut"
          }}
        />
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse" />
      </div>

      {/* Short description */}
      <p className="text-parchment-dark text-xs italic mt-1">{description}</p>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-tooltip left-0 top-full mt-2 w-80 z-50"
        >
          <h4 className="text-bronze-light font-medieval text-sm mb-2 border-b border-bronze-dark pb-1">
            {icon} {label} - {value}/100
          </h4>
          <p className="text-parchment text-xs mb-2">{description}</p>
          <ul className="space-y-1">
            {details.map((detail, i) => (
              <li key={i} className="text-parchment-dark text-xs flex items-start gap-2">
                <span className="text-bronze">▸</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
