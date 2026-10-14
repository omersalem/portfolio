import React from 'react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { ArrowDown, MessageSquare, Shield, Terminal, Zap, Sparkles } from 'lucide-react';
import { useEffectSettings } from '../../context/EffectSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { getPortfolioData } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  const { reducedMotion } = useEffectSettings();
  const { language } = useLanguage();
  const { ui } = getPortfolioData(language);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      if (reducedMotion) {
        section.scrollIntoView({ behavior: 'auto' });
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      aria-label={language === 'ar' ? 'القسم الرئيسي' : 'Hero Section'}
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center pt-24 pb-16 lg:py-24 overflow-hidden"
    >
      {/* Dynamic Animated Ambient Aurora Mesh Lights */}
      <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-cyber-cyan/10 blur-[140px] pointer-events-none animate-aurora-float" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] rounded-full bg-cyber-purple/20 blur-[150px] pointer-events-none animate-aurora-pulse" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-cyber-pink/10 blur-[140px] pointer-events-none animate-aurora-float" />
      <div className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-chrome-orange/10 blur-[130px] pointer-events-none" />

      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 monolithic-noise opacity-30 pointer-events-none" />
      
      {/* Prismatic Horizon Lines */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-chrome-black/80 pointer-events-none" />

      <div className="layout-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column: Editorial Typography & Primary CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-start order-1 lg:order-1 z-20">
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full soft-chip backdrop-blur-md mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-emerald" />
              </span>
              <span className="text-[11px] font-mono tracking-wider text-cyber-emerald font-medium uppercase">
                {ui.hero.availability}
              </span>
              <Sparkles className="w-3 h-3 text-cyber-cyan shrink-0" />
            </div>

            {/* 1. Massive Architectural Identity (OMER SALEM / عمر سالم) */}
            <div className="mb-3">
              <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-display font-extrabold tracking-tight text-white uppercase leading-[0.95] select-none">
                <span className="block drop-shadow-[0_18px_30px_rgba(5,3,18,0.55)]">{ui.hero.firstName}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-[#FFE3D6] via-cyber-pink to-cyber-purple-light pb-2">
                  {ui.hero.lastName}
                </span>
              </h1>
            </div>

            {/* 2. Professional Title in Spaced Cyber-Gradient Caps */}
            <div className="mb-4">
              <span className="text-sm sm:text-base font-mono font-medium tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple-light to-chrome-orange-light uppercase">
                {ui.hero.title}
              </span>
            </div>

            {/* Ministry & Experience Credential Badges with Vibrant Hues */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-cyan-100 soft-chip rounded-full">
                <Shield className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                <span>{ui.hero.badgeMne}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-purple-100 soft-chip rounded-full">
                <Terminal className="w-3.5 h-3.5 text-cyber-purple shrink-0" />
                <span>{ui.hero.badgeSecurity}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-orange-100 soft-chip rounded-full">
                <Zap className="w-3.5 h-3.5 text-chrome-orange shrink-0" />
                <span>{ui.hero.badgeEcom}</span>
              </span>
            </div>

            {/* 3. Refined Chromatic Divider Rule */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-chrome-orange rounded-full mb-6 shadow-[0_6px_16px_-4px_rgba(165,149,255,0.6),inset_0_1px_0_rgba(255,255,255,0.5)]" />

            {/* 4. Main Business Headline */}
            <p className="text-lg sm:text-xl font-display font-semibold text-white/95 mb-3 max-w-lg leading-relaxed">
              {ui.hero.headline}
            </p>
            <p className="text-sm sm:text-base font-sans text-[#C9C4E3] mb-9 max-w-lg leading-relaxed">
              {ui.hero.description}
            </p>

            {/* 5. Dual Action Buttons: VIEW SELECTED WORK + DIRECT WHATSAPP */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href="#work"
                onClick={(e) => handleScrollToSection(e, 'work')}
                className="touch-target group relative inline-flex items-center justify-center gap-3 px-8 py-4 btn-plush font-display font-semibold text-sm tracking-wide rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-chrome-black"
              >
                <span>{ui.hero.exploreBtn}</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1 shrink-0" />
              </a>

              <a
                href="https://wa.me/970599228979"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target group inline-flex items-center justify-center gap-2.5 px-6 py-4 btn-soft text-white font-display font-semibold text-sm tracking-wide rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-purple-light"
                aria-label={language === 'ar' ? 'محادثة مباشرة عبر واتساب مع المهندس عمر سالم' : 'Direct WhatsApp Chat with Omer Salem'}
              >
                <MessageSquare className="w-4 h-4 text-cyber-emerald group-hover:scale-110 transition-transform shrink-0" />
                <span>{ui.hero.chatBtn}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald shadow-[0_5px_13px_-5px_rgba(127,224,184,0.8)]" aria-hidden="true" />
              </a>
            </div>

            {/* Micro Credential Ribbon */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 max-w-lg rounded-3xl soft-surface">
              <div className="flex flex-col items-center text-center px-1 py-2 rounded-3xl bg-white/[0.03] shadow-soft-1">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-[#93C9FF]">
                  {ui.hero.statExpValue}
                </span>
                <span className="text-[10px] font-mono text-[#A9A3C9] uppercase tracking-wider mt-0.5">{ui.hero.statExpLabel}</span>
              </div>
              <div className="flex flex-col items-center text-center px-1 py-2 rounded-3xl bg-white/[0.03] shadow-soft-1">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple-light to-cyber-pink">
                  {ui.hero.statStoresValue}
                </span>
                <span className="text-[10px] font-mono text-[#A9A3C9] uppercase tracking-wider mt-0.5">{ui.hero.statStoresLabel}</span>
              </div>
              <div className="flex flex-col items-center text-center px-1 py-2 rounded-3xl bg-white/[0.03] shadow-soft-1">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-emerald to-cyber-cyan">
                  {ui.hero.statUptimeValue}
                </span>
                <span className="text-[10px] font-mono text-[#A9A3C9] uppercase tracking-wider mt-0.5">{ui.hero.statUptimeLabel}</span>
              </div>
            </div>
          </div>

          {/* 3D Elements + Portrait Canvas Column */}
          <div className="lg:col-span-6 flex justify-center items-end order-2 lg:order-2 z-10">
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
