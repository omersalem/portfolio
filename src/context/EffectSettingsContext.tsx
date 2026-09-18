import React, { createContext, useContext, useState, useEffect } from 'react';
import { EffectSettings } from '../types';

const EffectSettingsContext = createContext<EffectSettings | null>(null);

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export const EffectSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [reducedEffects, setReducedEffects] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('omer_portfolio_reduced_effects');
      return stored === 'true';
    } catch {
      return false;
    }
  });
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [saveData, setSaveData] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL
    setWebGLSupported(checkWebGLSupport());

    // Check Save-Data
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    if (connection && typeof connection.saveData === 'boolean') {
      setSaveData(connection.saveData);
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleReducedEffects = () => {
    setReducedEffects((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('omer_portfolio_reduced_effects', String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  return (
    <EffectSettingsContext.Provider
      value={{
        reducedMotion,
        reducedEffects,
        webGLSupported,
        saveData,
        toggleReducedEffects,
      }}
    >
      {children}
    </EffectSettingsContext.Provider>
  );
};

export const useEffectSettings = (): EffectSettings => {
  const context = useContext(EffectSettingsContext);
  if (!context) {
    throw new Error('useEffectSettings must be used within an EffectSettingsProvider');
  }
  return context;
};
