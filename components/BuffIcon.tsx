import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuffIconProps {
  name: string;
  icon: string;
  effect: string;
}

export default function BuffIcon({ name, icon, effect }: BuffIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="buff-icon">
        <span>{icon}</span>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="game-tooltip left-1/2 top-full mt-2 w-44 z-50"
            style={{ transform: 'translateX(-50%)' }}
          >
            <h4>{icon} {name}</h4>
            <p className="tooltip-stat">{effect}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
