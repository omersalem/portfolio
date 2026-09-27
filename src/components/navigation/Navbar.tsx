import React, { useState, useEffect, useRef } from 'react';
import { getPortfolioData } from '../../data/portfolioData';
import { useEffectSettings } from '../../context/EffectSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Sparkles, EyeOff, Languages } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reducedEffects, toggleReducedEffects, reducedMotion } = useEffectSettings();
  const { language, toggleLanguage } = useLanguage();

  const { navItems, ui } = getPortfolioData(language);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navPanelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Monitor scroll state for subtle backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle focus trapping and keyboard navigation for mobile menu
  useEffect(() => {
    if (!isOpen) return;

    // Focus the first navigation link when menu opens
    const timer = setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && navPanelRef.current) {
        const focusableElements = navPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling when modal menu is open
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = (returnFocus = true) => {
    setIsOpen(false);
    if (returnFocus) {
      menuButtonRef.current?.focus();
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu(false);

      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        if (reducedMotion) {
          element.scrollIntoView({ behavior: 'auto' });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      closeMenu(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-chrome-black/90 backdrop-blur-md border-b border-chrome-border/80 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="layout-container h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#main-content"
          className="group flex items-center gap-3 text-white focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none rounded-sm px-1 py-1"
          aria-label={language === 'ar' ? 'عمر سالم — الصفحة الرئيسية' : 'Omer Salem — Home'}
        >
          <span className="w-2.5 h-2.5 bg-chrome-orange rounded-full group-hover:scale-125 transition-transform shrink-0" />
          <span className="font-display text-sm tracking-widest text-neutral-200 font-bold uppercase">
            {ui.brandName}
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 border-s border-neutral-700 ps-3">
            {ui.brandRole}
          </span>
        </a>

        {/* Right side group: Desktop Nav + Language Toggle + Effect Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Desktop Navigation (>= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label={language === 'ar' ? 'قائمة التنقل الرئيسية' : 'Primary Navigation'}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('#') ? undefined : '_blank'}
                rel={item.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                onClick={(e) => handleNavClick(e, item.href)}
                className="touch-target text-xs font-mono tracking-widest text-neutral-300 hover:text-chrome-orange transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none rounded-sm after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-0 after:h-[1px] after:bg-chrome-orange hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="touch-target px-3 py-1.5 text-xs font-mono rounded-lg border border-cyber-cyan/40 hover:border-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 text-cyber-cyan hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.12)] cursor-pointer"
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Languages className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
            <span className="font-bold tracking-wider">
              {language === 'ar' ? 'English' : 'العربية'}
            </span>
          </button>

          {/* Reduced Effects Accessibility Toggle */}
          <button
            type="button"
            onClick={toggleReducedEffects}
            className="touch-target px-3 py-1.5 text-xs font-mono rounded-lg border border-chrome-border hover:border-chrome-orange/60 text-neutral-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none cursor-pointer"
            aria-label={reducedEffects ? ui.fullEffectsTitle : ui.reducedEffectsTitle}
            title={reducedEffects ? ui.fullEffectsTitle : ui.reducedEffectsTitle}
          >
            {reducedEffects ? (
              <span className="flex items-center gap-1.5 text-amber-400">
                <EyeOff className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{ui.reducedEffects}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-chrome-orange shrink-0" />
                <span className="hidden sm:inline">{ui.fullEffects}</span>
              </span>
            )}
          </button>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <div className="lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="touch-target px-3.5 py-2 bg-chrome-charcoal border border-chrome-border hover:border-chrome-orange text-white text-xs font-mono tracking-wider uppercase transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none flex items-center gap-2 cursor-pointer"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isOpen ? ui.close : ui.menu}
            >
              {isOpen ? (
                <>
                  <X className="w-4 h-4 text-chrome-orange" />
                  <span>{ui.close}</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-chrome-orange" />
                  <span>{ui.menu}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Modal (< 1024px) */}
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={navPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label={language === 'ar' ? 'قائمة التنقل' : 'Navigation Menu'}
          className="fixed inset-0 top-20 bg-chrome-black/98 backdrop-blur-xl border-t border-chrome-border z-50 flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
        >
          {/* Top Quick Language Switcher inside Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-chrome-border/60">
            <span className="text-xs font-mono text-neutral-400">
              {language === 'ar' ? 'اللغة الحالية: العربية' : 'Current Language: English'}
            </span>
            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                closeMenu(false);
              }}
              className="px-3.5 py-1.5 rounded-lg border border-cyber-cyan/50 bg-cyber-cyan/15 text-cyber-cyan font-mono text-xs font-bold flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-5 pt-6" aria-label="Mobile Navigation">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                target={item.href.startsWith('#') ? undefined : '_blank'}
                rel={item.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                onClick={(e) => handleNavClick(e, item.href)}
                className="touch-target text-2xl sm:text-3xl font-display tracking-wide text-neutral-200 hover:text-chrome-orange transition-colors flex items-center justify-between border-b border-chrome-border/60 pb-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-chrome-orange/60">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-chrome-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-neutral-500">
            <div>
              <span>{ui.brandName}</span> — {ui.brandRole}
            </div>
            <button
              type="button"
              onClick={() => closeMenu(true)}
              className="touch-target text-neutral-400 hover:text-white underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none cursor-pointer"
            >
              {ui.closeEsc}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
