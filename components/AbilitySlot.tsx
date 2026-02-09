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
        <span style={{ fontSize: '0.5rem', color: '#7A7A84', marginTop: '1px' }}>{slotNumber}</span>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="game-tooltip left-1/2 bottom-full mb-2 w-40 z-50"
            style={{ transform: 'translateX(-50%)' }}
          >
            <h4>{icon} {name}</h4>
            {description && <p>{description}</p>}
            <p style={{ color: '#7A7A84', fontSize: '0.6rem', marginTop: '0.25rem' }}>
              Hotkey: {slotNumber}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
