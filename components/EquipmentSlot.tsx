import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EquipmentSlotProps {
  name: string;
  icon: string;
  type: 'Weapon' | 'Armor' | 'Tool' | 'Artifact';
  description: string;
  stats?: string[];
  slot?: string;
}

export default function EquipmentSlot({
  name,
  icon,
  type,
  description,
  stats = [],
  slot,
}: EquipmentSlotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {slot && <span className="equip-slot-label">{slot}</span>}
      <div className="equip-slot">
        <span className="slot-icon">{icon}</span>
      </div>
      <span className="equip-slot-name">{name}</span>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="game-tooltip left-1/2 bottom-full mb-2 w-56 z-50"
            style={{ transform: 'translateX(-50%)' }}
          >
            <h4>{icon} {name}</h4>
            <p style={{ color: '#8B7E71', fontSize: '0.6rem', marginBottom: '0.4rem' }}>
              {type} &middot; Slot: {slot}
            </p>
            <p style={{ fontStyle: 'italic' }}>{description}</p>
            {stats.length > 0 && (
              <div style={{ marginTop: '0.4rem', borderTop: '1px solid #5A4A2A', paddingTop: '0.4rem' }}>
                {stats.map((stat, i) => (
                  <p key={i} className="tooltip-stat">{stat}</p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
