import React, { createContext, useContext, useState, useEffect } from 'react';
import { EffectSettings } from '../types';

const EffectSettingsContext = createContext<EffectSettings | null>(null);

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    if (!window.WebGLRenderingContext) return false;
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export const EffectSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [reducedEffects, setReducedEffects] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('omer_portfolio_reduced_effects');
      return stored === 'true';
    } catch {
      return false;
    }
  });
  const [webGLSupported] = useState<boolean>(() => typeof document !== 'undefined' && checkWebGLSupport());
  const [saveData] = useState<boolean>(() => {
    if (typeof navigator === 'undefined') return false;
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    return !!connection?.saveData;
  });

  useEffect(() => {
    // Initial values are read in the state initializers; only live changes are tracked here
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
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
