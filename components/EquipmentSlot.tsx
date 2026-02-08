import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EquipmentSlotProps {
  name: string;
  icon: string; // emoji or image
  type: 'Weapon' | 'Armor' | 'Tool' | 'Artifact';
  description: string;
  stats?: string[];
  isEmpty?: boolean;
  slot?: string; // e.g. HEAD, NECK, CHEST
}

export default function EquipmentSlot({
  name,
  icon,
  type,
  description,
  stats = [],
  isEmpty = false,
  slot,
}: EquipmentSlotProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const typeColors = {
    Weapon: 'border-red-600',
    Armor: 'border-blue-600',
    Tool: 'border-green-600',
    Artifact: 'border-purple-600',
  };

  if (slot) {
    // M&M-style slot with label
    return (
      <div className="relative flex flex-col items-center">
        <span className="text-mnm-text-dark font-game text-[9px] uppercase mb-0.5">{slot}</span>
        <motion.div
          className={`equipment-slot-mnm ${isEmpty ? 'opacity-50' : ''}`}
          onMouseEnter={() => !isEmpty && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={!isEmpty ? { scale: 1.08 } : {}}
          whileTap={!isEmpty ? { scale: 0.95 } : {}}
        >
          {isEmpty ? (
            <span className="text-stone-light text-xl">&#11034;</span>
          ) : (
            <span className="text-2xl">{icon}</span>
          )}

          {!isEmpty && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-mnm-gold rounded-full animate-pulse-glow" />
          )}
        </motion.div>

        {!isEmpty && (
          <p className="text-center text-mnm-text-dark text-[9px] mt-0.5 font-game leading-tight w-16 truncate">
            {name}
          </p>
        )}

        <AnimatePresence>
          {showTooltip && !isEmpty && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="game-tooltip left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 z-50"
            >
              <div className="border-b border-bronze-dark pb-2 mb-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-bronze-light font-medieval text-sm">
                    {icon} {name}
                  </h4>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    type === 'Weapon' ? 'bg-red-900 text-red-200' :
                    type === 'Armor' ? 'bg-blue-900 text-blue-200' :
                    type === 'Tool' ? 'bg-green-900 text-green-200' :
                    'bg-purple-900 text-purple-200'
                  }`}>
                    {type}
                  </span>
                </div>
                <p className="text-mnm-text-dark text-[10px] font-game mt-0.5">Slot: {slot}</p>
              </div>
              <p className="text-parchment text-xs italic mb-2">&quot;{description}&quot;</p>
              {stats.length > 0 && (
                <div className="space-y-0.5">
                  <p className="text-bronze text-[10px] uppercase tracking-wide">Effects:</p>
                  {stats.map((stat, i) => (
                    <div key={i} className="text-parchment-dark text-[11px] flex items-start gap-1">
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

  // Original layout without slot label
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
          <span className="text-stone-light text-2xl">&#11034;</span>
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
            <p className="text-parchment text-sm italic mb-3">&quot;{description}&quot;</p>

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
