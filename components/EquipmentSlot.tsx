import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EquipmentSlotProps {
  name: string;
  icon: string; // emoji or image
  type: 'Weapon' | 'Armor' | 'Tool' | 'Artifact';
  description: string;
  stats?: string[];
  isEmpty?: boolean;
}

export default function EquipmentSlot({
  name,
  icon,
  type,
  description,
  stats = [],
  isEmpty = false
}: EquipmentSlotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const typeColors = {
    Weapon: 'border-red-600',
    Armor: 'border-blue-600',
    Tool: 'border-green-600',
    Artifact: 'border-purple-600'
  };

  return (
    <div className="relative">
      <motion.div
        className={`equipment-slot ${isEmpty ? 'opacity-50' : ''} ${typeColors[type]}`}
        onMouseEnter={() => !isEmpty && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={!isEmpty ? { scale: 1.1 } : {}}
        whileTap={!isEmpty ? { scale: 0.95 } : {}}
      >
        {isEmpty ? (
          <span className="text-stone-light text-2xl">⬚</span>
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
        
        {/* Equipped indicator */}
        {!isEmpty && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-bronze rounded-full animate-pulse-glow" />
        )}
      </motion.div>

      {/* Equipment name */}
      {!isEmpty && (
        <p className="text-center text-parchment-dark text-xs mt-1 font-game">
          {name}
        </p>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isEmpty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="game-tooltip left-1/2 -translate-x-1/2 bottom-full mb-2 w-64"
          >
            {/* Item header */}
            <div className="border-b border-bronze-dark pb-2 mb-2">
              <div className="flex items-center justify-between">
                <h4 className="text-bronze-light font-medieval text-base">
                  {icon} {name}
                </h4>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  type === 'Weapon' ? 'bg-red-900 text-red-200' :
                  type === 'Armor' ? 'bg-blue-900 text-blue-200' :
                  type === 'Tool' ? 'bg-green-900 text-green-200' :
                  'bg-purple-900 text-purple-200'
                }`}>
                  {type}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-parchment text-sm italic mb-3">"{description}"</p>

            {/* Stats/Effects */}
            {stats.length > 0 && (
              <div className="space-y-1">
                <p className="text-bronze text-xs uppercase tracking-wide">Effects:</p>
                {stats.map((stat, i) => (
                  <div key={i} className="text-parchment-dark text-xs flex items-start gap-2">
                    <span className="text-green-400">+</span>
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
