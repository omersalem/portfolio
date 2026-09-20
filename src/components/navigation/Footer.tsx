import React from 'react';
import { ArrowUp, Github } from 'lucide-react';
import { NAV_ITEMS } from '../../data/portfolioData';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const Footer: React.FC = () => {
  const { reducedMotion } = useEffectSettings();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="bg-chrome-charcoal border-t border-chrome-border/80 text-white py-12 lg:py-16">
      <div className="layout-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-chrome-border/60">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-2 bg-chrome-orange rounded-full" />
              <span className="font-mono text-base tracking-widest font-bold uppercase">
                OMER SALEM
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Computer Engineer • High-Performance Web Platforms & Infrastructure
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('#') ? undefined : '_blank'}
                rel={item.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                className="touch-target text-xs font-mono tracking-widest text-neutral-400 hover:text-chrome-orange transition-colors focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/omersalem"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest text-neutral-400 hover:text-chrome-orange transition-colors focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
              aria-label="Omer Salem GitHub Profile"
            >
              <Github className="w-3.5 h-3.5 text-chrome-orange" />
              <span>GITHUB</span>
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} Omer Salem. All architectural & engineering rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center space-x-1 text-emerald-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </span>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="touch-target inline-flex items-center space-x-1.5 text-neutral-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
              aria-label="Back to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
