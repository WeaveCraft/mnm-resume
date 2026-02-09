import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HandInDialogProps {
  npcName: string;
  itemName: string;
  itemIcon: string;
  onHandIn: () => void;
  onClose: () => void;
}

export default function HandInDialog({ npcName, itemName, itemIcon, onHandIn, onClose }: HandInDialogProps) {
  const [handing, setHanding] = useState(false);
  const [complete, setComplete] = useState(false);

  const emptySlots = Array(7).fill(null);

  const handleHandIn = () => {
    setHanding(true);
    setTimeout(() => {
      setComplete(true);
      setTimeout(() => {
        onHandIn();
      }, 2000);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="handin-window"
      >
        {/* NPC Name Header */}
        <div className="handin-header">
          <span>{npcName}</span>
        </div>

        {/* Inventory Grid */}
        <div className="handin-grid">
          {/* The formal note in first slot */}
          <AnimatePresence>
            {!handing && (
              <motion.div
                className="handin-slot handin-slot-filled"
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                title={itemName}
              >
                <span className="handin-item-icon">{itemIcon}</span>
              </motion.div>
            )}
            {handing && (
              <div className="handin-slot" />
            )}
          </AnimatePresence>

          {/* Empty slots */}
          {emptySlots.map((_, i) => (
            <div key={i} className="handin-slot" />
          ))}
        </div>

        {/* Hand In Button */}
        <div className="handin-footer">
          <AnimatePresence mode="wait">
            {!complete ? (
              <motion.button
                key="handin-btn"
                className="handin-button"
                onClick={handleHandIn}
                disabled={handing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                exit={{ opacity: 0 }}
              >
                {handing ? 'Handing in...' : 'Hand in'}
              </motion.button>
            ) : (
              <motion.div
                key="handin-success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="handin-success"
              >
                <div className="handin-success-icon">&#10003;</div>
                <div className="handin-success-text">
                  You have given <span className="handin-item-highlight">{itemName}</span> to <span className="handin-npc-highlight">{npcName}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
