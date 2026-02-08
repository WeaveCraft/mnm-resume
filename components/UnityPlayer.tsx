import { useState, useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

interface UnityPlayerProps {
  buildPath?: string;
  buildName?: string;
}

export default function UnityPlayer({
  buildPath = '/unity-build',
  buildName = 'Build',
}: UnityPlayerProps) {
  const [buildExists, setBuildExists] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: `${buildPath}/${buildName}.loader.js`,
    dataUrl: `${buildPath}/${buildName}.data`,
    frameworkUrl: `${buildPath}/${buildName}.framework.js`,
    codeUrl: `${buildPath}/${buildName}.wasm`,
  });

  useEffect(() => {
    fetch(`${buildPath}/${buildName}.loader.js`, { method: 'HEAD' })
      .then((res) => {
        setBuildExists(res.ok);
        if (!res.ok) {
          setHasError(true);
          setErrorMessage('Unity build files not found.');
        }
      })
      .catch(() => {
        setBuildExists(false);
        setHasError(true);
        setErrorMessage('Could not reach Unity build files.');
      });
  }, [buildPath, buildName]);

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

  if (buildExists === false) {
    return (
      <div className="game-panel" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>&#127959;&#65039;</p>
        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Unity Build Not Found</h4>
        <p style={{ color: '#8B7E71', fontSize: '0.7rem', fontFamily: 'Courier New, monospace', fontStyle: 'italic' }}>
          The demo area awaits a Unity WebGL build
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#1a1614',
          border: '1px solid #5A4A2A',
          textAlign: 'left',
        }}>
          <p style={{ color: '#D4AF37', fontSize: '0.7rem', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '0.5rem' }}>
            Required files:
          </p>
          {[`${buildName}.loader.js`, `${buildName}.data`, `${buildName}.framework.js`, `${buildName}.wasm`].map((file) => (
            <p key={file} style={{ color: '#8B7E71', fontSize: '0.6rem', fontFamily: 'Courier New, monospace' }}>
              &#9656; public{buildPath}/{file}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (hasError && buildExists !== null) {
    return (
      <div className="game-panel" style={{ textAlign: 'center', borderColor: '#8A4A4A' }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#128128;</p>
        <h4 style={{ color: '#8A4A4A', fontSize: '0.9rem' }}>Something went wrong</h4>
        <p style={{ color: '#8B7E71', fontSize: '0.7rem', fontFamily: 'Courier New, monospace', margin: '0.5rem 0' }}>
          The Unity build encountered an error while loading.
        </p>
        {errorMessage && (
          <p style={{ color: '#8A4A4A', fontSize: '0.6rem', fontFamily: 'Courier New, monospace', wordBreak: 'break-all' }}>
            {errorMessage}
          </p>
        )}
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '0.75rem',
            padding: '0.4rem 1rem',
            background: 'linear-gradient(135deg, #1E1A17 0%, #151210 100%)',
            border: '1px solid #5A4A2A',
            color: '#C4B5A0',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.7rem',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {!isLoaded && (
        <div className="game-panel" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#127918;</p>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Loading Unity Build...</h4>
          <div className="stat-bar-track" style={{ marginBottom: '0.5rem' }}>
            <div className="stat-bar-fill" style={{ width: `${loadingPercentage}%` }} />
          </div>
          <p style={{ color: '#8B7E71', fontSize: '0.65rem', fontFamily: 'Courier New, monospace' }}>
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

      <div style={{ display: isLoaded ? 'block' : 'none' }}>
        <div style={{ border: '3px solid #8B6914', overflow: 'hidden' }}>
          <Unity
            unityProvider={unityProvider}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#1a1614',
            }}
          />
        </div>
      </div>
    </div>
  );
}
