import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS } from '../../data/portfolioData';
import { useEffectSettings } from '../../context/EffectSettingsContext';
import { Menu, X, Sparkles, EyeOff } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reducedEffects, toggleReducedEffects, reducedMotion } = useEffectSettings();

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
          className="group flex items-center space-x-3 text-white focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none rounded-sm px-1 py-1"
          aria-label="Omer Salem — Home"
        >
          <span className="w-2.5 h-2.5 bg-chrome-orange rounded-full group-hover:scale-125 transition-transform" />
          <span className="font-mono text-sm tracking-widest text-neutral-300 font-semibold uppercase">
            OMER SALEM
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-500 border-l border-neutral-700 pl-3">
            COMPUTER ENGINEER
          </span>
        </a>

        {/* Right side group: Desktop Nav + Effect Toggle + Mobile Menu Trigger */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Reduced Effects Accessibility Toggle */}
          <button
            type="button"
            onClick={toggleReducedEffects}
            className="touch-target px-3 py-1.5 text-xs font-mono rounded border border-chrome-border hover:border-chrome-orange/60 text-neutral-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
            aria-label={reducedEffects ? "Enable full 3D and visual effects" : "Enable reduced effects for lower power and simpler rendering"}
            title={reducedEffects ? "Enable full 3D" : "Reduce 3D effects"}
          >
            {reducedEffects ? (
              <span className="flex items-center space-x-1.5 text-amber-400">
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">REDUCED EFFECTS</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-chrome-orange" />
                <span className="hidden sm:inline">FULL EFFECTS</span>
              </span>
            )}
          </button>

          {/* Desktop Navigation (>= 1024px) */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label="Primary Navigation"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="touch-target text-xs font-mono tracking-widest text-neutral-300 hover:text-chrome-orange transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none rounded-sm after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-chrome-orange hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile / Tablet Menu Button (< 1024px) */}
          <div className="lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="touch-target px-4 py-2 bg-chrome-charcoal border border-chrome-border hover:border-chrome-orange text-white text-xs font-mono tracking-wider uppercase transition-colors rounded focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none flex items-center space-x-2"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? (
                <>
                  <X className="w-4 h-4 text-chrome-orange" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-chrome-orange" />
                  <span>MENU</span>
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
          aria-label="Navigation Menu"
          className="fixed inset-0 top-20 bg-chrome-black/98 backdrop-blur-xl border-t border-chrome-border z-50 flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
        >
          <nav className="flex flex-col space-y-6 pt-6" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="touch-target text-2xl sm:text-3xl font-mono tracking-widest text-neutral-200 hover:text-chrome-orange transition-colors flex items-center justify-between border-b border-chrome-border/60 pb-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-chrome-orange/60">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-chrome-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-neutral-500">
            <div>
              <span>OMER SALEM</span> — COMPUTER ENGINEER
            </div>
            <button
              type="button"
              onClick={() => closeMenu(true)}
              className="touch-target text-neutral-400 hover:text-white underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none"
            >
              CLOSE MENU (ESC)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
