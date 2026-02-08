import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AbilitySlotProps {
  name: string;
  icon: string;
  slotNumber: number;
  description?: string;
}

export default function AbilitySlot({ name, icon, slotNumber, description }: AbilitySlotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="ability-slot">
        <span>{icon}</span>
        <span className="text-mnm-text-dark text-[8px] leading-none mt-0.5">{slotNumber}</span>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="game-tooltip left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 z-50"
          >
            <p className="text-bronze-light font-medieval text-sm mb-1">
              {icon} {name}
            </p>
            {description && (
              <p className="text-parchment-dark text-xs">{description}</p>
            )}
            <p className="text-mnm-text-dark text-[10px] mt-1 font-game">
              Hotkey: {slotNumber}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
