import { useState, useEffect, useCallback, useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { motion } from 'framer-motion';

interface UnityOverlayProps {
  itemName: string;
  onComplete: (experience: number, npcMessage: string) => void;
  onClose: () => void;
}

export default function UnityOverlay({ itemName, onComplete, onClose }: UnityOverlayProps) {
  const [hasSentTrigger, setHasSentTrigger] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const completionRef = useRef(false);
  const unloadRef = useRef<() => Promise<void>>();

  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
    unload,
  } = useUnityContext({
    loaderUrl: '/unity-build/Build.loader.js',
    dataUrl: '/unity-build/Build.data',
    frameworkUrl: '/unity-build/Build.framework.js',
    codeUrl: '/unity-build/Build.wasm',
  });

  // Keep unload ref current for cleanup
  useEffect(() => {
    unloadRef.current = unload;
  }, [unload]);

  // Cleanup Unity instance on unmount
  useEffect(() => {
    return () => {
      unloadRef.current?.().catch(() => {});
    };
  }, []);

  // Send trigger message once Unity is loaded
  useEffect(() => {
    if (isLoaded && !hasSentTrigger) {
      const timer = setTimeout(() => {
        sendMessage('GameManager', 'TriggerHandIn', itemName);
        setHasSentTrigger(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasSentTrigger, sendMessage, itemName]);

  // Listen for completion event from Unity
  const handleHandInComplete = useCallback((...args: (string | number | undefined | void)[]) => {
    if (completionRef.current) return;
    completionRef.current = true;

    const experience = typeof args[0] === 'number' ? args[0] : 100;
    const npcMessage = typeof args[1] === 'string'
      ? args[1]
      : "I'll review this with great interest. Your dedication is impressive.";

    setIsClosing(true);
    setTimeout(() => {
      onComplete(experience, npcMessage);
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addEventListener('HandInComplete', handleHandInComplete as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => removeEventListener('HandInComplete', handleHandInComplete as any);
  }, [addEventListener, removeEventListener, handleHandInComplete]);

  // Catch Unity-specific errors
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      if (
        event.message?.includes('Unity') ||
        event.message?.includes('wasm') ||
        event.message?.includes('WebAssembly')
      ) {
        setHasError(true);
        setErrorMessage(event.message);
      }
    };
    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  const loadingPercentage = Math.round(loadingProgression * 100);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="unity-overlay"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: isClosing ? 0.92 : 1, opacity: isClosing ? 0 : 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="unity-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="unity-close-btn" onClick={handleClose} title="Close">
          &#10005;
        </button>

        {hasError ? (
          /* Error state */
          <div className="unity-status-panel">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#128128;</div>
            <h4 style={{ color: '#8A4A4A', fontSize: '0.9rem', margin: '0 0 0.5rem' }}>
              Something Went Wrong
            </h4>
            <p style={{
              color: '#7A7A84', fontSize: '0.65rem', fontFamily: 'Courier New, monospace',
              margin: '0 0 0.5rem', lineHeight: 1.6,
            }}>
              The Unity interaction could not be loaded.
            </p>
            {errorMessage && (
              <p style={{
                color: '#8A4A4A', fontSize: '0.55rem', fontFamily: 'Courier New, monospace',
                wordBreak: 'break-all', margin: '0 0 0.75rem',
              }}>
                {errorMessage}
              </p>
            )}
            <button className="unity-action-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Loading state */}
            {!isLoaded && (
              <div className="unity-status-panel">
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#D4AF37' }}>
                  &#9876;
                </div>
                <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.75rem' }}>
                  Summoning Shawn...
                </h4>
                <div className="unity-progress-track">
                  <motion.div
                    className="unity-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingPercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p style={{
                  color: '#7A7A84', fontSize: '0.65rem', fontFamily: 'Courier New, monospace',
                  margin: 0,
                }}>
                  {loadingPercentage < 30
                    ? 'Initializing engine...'
                    : loadingPercentage < 60
                    ? 'Loading assets...'
                    : loadingPercentage < 90
                    ? 'Preparing scene...'
                    : 'Almost ready...'}
                </p>
              </div>
            )}

            {/* Unity Canvas */}
            <div style={{ display: isLoaded ? 'block' : 'none', width: '100%', height: '100%' }}>
              <Unity
                unityProvider={unityProvider}
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#1a1614',
                }}
              />
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
