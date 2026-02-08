import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [step, setStep] = useState(0);
  const [autoProgress, setAutoProgress] = useState(true);

  useEffect(() => {
    if (!autoProgress) return;
    
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 4000),
      setTimeout(() => setStep(3), 6000),
      setTimeout(() => onComplete(), 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [autoProgress, onComplete]);

  const skipIntro = () => {
    setAutoProgress(false);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-dark flex items-center justify-center">
      <button
        onClick={skipIntro}
        className="absolute top-4 right-4 px-4 py-2 text-parchment-dark text-sm font-game hover:text-parchment border border-bronze-dark hover:border-bronze rounded transition-all"
      >
        [ESC] Skip Intro
      </button>

      <div className="max-w-2xl mx-auto p-8 text-center space-y-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="text-6xl mb-4">⚔️</div>
              <h1 className="text-4xl font-medieval text-bronze-light glow-text">
                A hero approaches...
              </h1>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
            >
              <div className="character-panel p-8">
                <div className="text-5xl mb-4">🎮</div>
                <h2 className="text-3xl font-medieval text-bronze-light mb-4">
                  Viktor Hurtig
                </h2>
                <p className="text-parchment text-lg font-game">
                  Level 28 Full-Stack Developer
                </p>
                <p className="text-parchment-dark text-sm mt-2">
                  Seeking to join the Monsters & Memories guild
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <div className="space-y-4">
                <div className="text-4xl mb-4">📜</div>
                <h2 className="text-2xl font-medieval text-bronze-light mb-4">
                  Quest Accepted
                </h2>
                <div className="text-parchment text-lg italic">
                  "Prove your worth to the M&M guild<br />
                  and join their legendary team"
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="text-bronze-light font-game text-lg animate-pulse">
                Inspecting character...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
