import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => onComplete(), 4500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="intro-overlay">
      <button onClick={onComplete} className="intro-skip">
        [ESC] Skip
      </button>

      <div style={{ maxWidth: '500px', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#9876;&#65039;</div>
              <h1 style={{ fontSize: '1.5rem', letterSpacing: '0.1em' }}>
                A hero approaches...
              </h1>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Viktor Hurtig</h2>
              <p style={{ color: '#C4B5A0', fontSize: '0.85rem', fontFamily: 'Courier New, monospace' }}>
                Level 28 &middot; Unity Programmer (Aspiring)
              </p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p style={{ color: '#8B7E71', fontSize: '0.8rem', fontFamily: 'Courier New, monospace' }}>
                Inspecting character...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
