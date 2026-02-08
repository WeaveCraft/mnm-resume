import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuffIconProps {
  name: string;
  icon: string;
  effect: string;
  isDebuff?: boolean;
}

export default function BuffIcon({ name, icon, effect, isDebuff = false }: BuffIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`buff-icon ${isDebuff ? 'border-red-800' : ''}`}>
        <span>{icon}</span>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="game-tooltip left-1/2 -translate-x-1/2 top-full mt-2 w-48 z-50"
          >
            <p className={`font-medieval text-sm mb-1 ${isDebuff ? 'text-red-400' : 'text-bronze-light'}`}>
              {icon} {name}
            </p>
            <p className={`text-xs font-game ${isDebuff ? 'text-red-300' : 'text-green-400'}`}>
              {effect}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
