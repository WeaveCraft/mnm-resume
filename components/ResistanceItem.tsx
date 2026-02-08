import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResistanceItemProps {
  name: string;
  value: number;
  description?: string;
}

export default function ResistanceItem({ name, value, description }: ResistanceItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const valueColor = value >= 70 ? 'text-green-400' : value >= 40 ? 'text-mnm-gold' : 'text-red-400';

  return (
    <div
      className="resistance-item relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="text-mnm-text-dark">{name}</span>
      <span className={`${valueColor} font-bold`}>+{value}</span>

      <AnimatePresence>
        {showTooltip && description && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="game-tooltip left-0 bottom-full mb-1 w-48 z-50"
          >
            <p className="text-bronze-light font-game text-xs mb-1">{name}</p>
            <p className="text-parchment-dark text-xs">{description}</p>
            <p className={`${valueColor} text-xs mt-1`}>Resistance: +{value}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
