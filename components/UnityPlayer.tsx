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

  // Check if the Unity build files exist before attempting to load
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

  // Catch global Unity/WebAssembly errors
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

  // Build not found - show helpful placeholder
  if (buildExists === false) {
    return <BuildNotFoundMessage buildPath={buildPath} buildName={buildName} />;
  }

  // Error during loading
  if (hasError && buildExists !== null) {
    return (
      <div className="w-full rounded border-4 border-red-900 bg-stone-dark p-8 text-center">
        <div className="text-4xl mb-4">💀</div>
        <h4 className="text-red-400 font-medieval text-lg mb-2">
          Critical Hit! Something went wrong
        </h4>
        <p className="text-parchment-dark text-sm mb-4">
          The Unity build encountered an error while loading.
        </p>
        {errorMessage && (
          <div className="bg-stone/50 border border-red-900 rounded p-3 mt-2">
            <p className="text-red-300 text-xs font-game break-all">{errorMessage}</p>
          </div>
        )}
        <button
          onClick={() => window.location.reload()}
          className="stone-button mt-4 text-sm"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="w-full rounded border-4 border-bronze-dark bg-stone-dark p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3 animate-bounce">🎮</div>
            <h4 className="text-bronze-light font-medieval text-lg mb-1">
              Loading Unity Build...
            </h4>
            <p className="text-parchment-dark text-xs font-game">
              Summoning the game engine from the arcane realm
            </p>
          </div>

          {/* Progress bar using stat-bar styling */}
          <div className="stat-bar mb-2">
            <div
              className="stat-bar-fill"
              style={{ width: `${loadingPercentage}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-parchment text-xs font-game drop-shadow-lg">
                {loadingPercentage}%
              </span>
            </div>
          </div>
          <p className="text-parchment-dark text-xs text-center font-game">
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

      {/* Unity canvas */}
      <div className={`w-full ${isLoaded ? '' : 'h-0 overflow-hidden'}`}>
        <div className="rounded border-4 border-bronze-dark overflow-hidden">
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

// Placeholder when Unity build files are not present
function BuildNotFoundMessage({
  buildPath,
  buildName,
}: {
  buildPath: string;
  buildName: string;
}) {
  return (
    <div className="w-full rounded border-4 border-bronze-dark bg-stone-dark p-8">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🏗️</div>
        <h4 className="text-bronze-light font-medieval text-xl mb-2">
          Unity Build Not Found
        </h4>
        <p className="text-parchment text-sm italic">
          The demo area awaits a Unity WebGL build
        </p>
      </div>

      <div className="bg-stone/50 border-2 border-bronze-dark rounded p-4 mb-4">
        <h5 className="text-bronze font-medieval text-sm mb-3">
          To deploy a Unity build, place these files:
        </h5>
        <div className="space-y-1 font-game text-xs">
          <FileEntry path={`public${buildPath}/${buildName}.loader.js`} />
          <FileEntry path={`public${buildPath}/${buildName}.data`} />
          <FileEntry path={`public${buildPath}/${buildName}.framework.js`} />
          <FileEntry path={`public${buildPath}/${buildName}.wasm`} />
        </div>
      </div>

      <p className="text-parchment-dark text-xs text-center font-game">
        See <span className="text-bronze">UNITY_SETUP.md</span> for detailed build instructions
      </p>
    </div>
  );
}

function FileEntry({ path }: { path: string }) {
  return (
    <div className="flex items-center gap-2 text-parchment-dark">
      <span className="text-bronze">▸</span>
      <code className="bg-stone-dark px-2 py-0.5 rounded text-parchment">{path}</code>
    </div>
  );
}
