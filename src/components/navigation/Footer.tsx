import React from 'react';
import { ArrowUp, Github, MessageSquare, Terminal } from 'lucide-react';
import { getPortfolioData } from '../../data/portfolioData';
import { useEffectSettings } from '../../context/EffectSettingsContext';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { reducedMotion } = useEffectSettings();
  const { language } = useLanguage();
  const { navItems, ui } = getPortfolioData(language);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#04050d] text-white overflow-hidden text-start">
      {/* Top Rainbow Chromatic Horizon Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyber-cyan via-cyber-purple via-cyber-pink to-chrome-orange shadow-[0_0_15px_rgba(0,240,255,0.4)]" />

      {/* Subtle Aurora Glow in Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-cyber-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="layout-container py-12 lg:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan" />
              </span>
              <span className="font-display font-extrabold text-lg tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200">
                {ui.brandName}
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              {ui.footerSubtext}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6" aria-label={language === 'ar' ? 'روابط التذييل' : 'Footer Navigation'}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('#') ? undefined : '_blank'}
                rel={item.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                className="touch-target text-xs font-mono tracking-widest text-neutral-400 hover:text-cyber-cyan transition-colors focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/omersalem"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-neutral-400 hover:text-purple-400 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              aria-label="Omer Salem GitHub Profile"
            >
              <Github className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>GITHUB</span>
            </a>
            <a
              href="https://wa.me/970599228979"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-neutral-400 hover:text-emerald-400 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              aria-label="Direct WhatsApp Message"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WHATSAPP</span>
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan/70 shrink-0" />
            <span>{ui.copyright(new Date().getFullYear())}</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-emerald-400/90 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>{ui.allSystemsOperational}</span>
            </span>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-cyber-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none cursor-pointer"
              aria-label={ui.backToTop}
            >
              <span>{ui.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
