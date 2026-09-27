import React from 'react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { ArrowDown, MessageSquare, Shield, Terminal, Zap, Sparkles } from 'lucide-react';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const HeroSection: React.FC = () => {
  const { reducedMotion } = useEffectSettings();

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
      aria-label="Hero Section"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center pt-24 pb-16 lg:py-24 overflow-hidden border-b border-white/[0.08]"
    >
      {/* Dynamic Animated Ambient Aurora Mesh Lights */}
      <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-cyber-cyan/15 blur-[120px] pointer-events-none animate-aurora-float" />
      <div className="absolute top-20 right-10 w-[450px] h-[450px] rounded-full bg-cyber-purple/20 blur-[130px] pointer-events-none animate-aurora-pulse" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-cyber-pink/15 blur-[110px] pointer-events-none animate-aurora-float" />
      <div className="absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-chrome-orange/15 blur-[100px] pointer-events-none" />

      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 monolithic-noise opacity-30 pointer-events-none" />
      
      {/* Prismatic Horizon Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 via-cyber-purple/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-16 left-0 w-2/5 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-80 pointer-events-none blur-[0.5px]" />
      <div className="absolute bottom-24 right-0 w-1/3 h-[2px] bg-gradient-to-l from-transparent via-chrome-orange to-transparent opacity-70 pointer-events-none blur-[0.5px]" />

      <div className="layout-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Semantic Editorial Typography & Primary CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left order-1 lg:order-1 z-20">
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 w-fit shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-emerald"></span>
              </span>
              <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-semibold uppercase">
                Available for Engineering & Web Projects
              </span>
              <Sparkles className="w-3 h-3 text-cyber-cyan" />
            </div>

            {/* 1. Massive Architectural Identity (OMER SALEM) */}
            <div className="mb-3">
              <h1 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-display font-black tracking-tight text-white uppercase leading-[0.88] select-none">
                <span className="block drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">OMER</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyber-cyan drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
                  SALEM
                </span>
              </h1>
            </div>

            {/* 2. Professional Title in Spaced Cyber-Gradient Caps */}
            <div className="mb-4">
              <span className="text-sm sm:text-base font-mono font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-purple to-chrome-orange uppercase drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                COMPUTER ENGINEER • SYSTEMS & WEB
              </span>
            </div>

            {/* Ministry & Experience Credential Badges with Vibrant Hues */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-mono text-cyan-200 bg-cyan-950/40 border border-cyan-500/40 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.12)]">
                <Shield className="w-3 h-3 text-cyber-cyan" />
                <span>Ministry of National Economy (7 Yrs)</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-mono text-purple-200 bg-purple-950/40 border border-purple-500/40 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <Terminal className="w-3 h-3 text-cyber-purple" />
                <span>Firewalls • Active Directory • AI Agents</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-mono text-orange-200 bg-orange-950/40 border border-orange-500/40 rounded-lg shadow-[0_0_15px_rgba(255,85,0,0.15)]">
                <Zap className="w-3 h-3 text-chrome-orange" />
                <span>High-Converting Storefronts</span>
              </span>
            </div>

            {/* 3. Refined Chromatic Divider Rule */}
            <div className="w-24 h-[3px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-chrome-orange rounded-full mb-6 shadow-[0_0_10px_rgba(0,240,255,0.5)]" />

            {/* 4. Main Business Headline */}
            <p className="text-base sm:text-lg font-mono font-medium tracking-wide text-neutral-200 uppercase mb-4 max-w-lg leading-relaxed">
              WEBSITES ENGINEERED TO SELL. SYSTEMS ARCHITECTED TO LAST.
            </p>
            <p className="text-xs sm:text-sm font-sans text-neutral-400 mb-8 max-w-lg leading-relaxed">
              Fusing government-scale infrastructure security (FortiGate, Cisco Core, Active Directory) with cutting-edge 3D WebGL interfaces and high-conversion commercial storefronts.
            </p>

            {/* 5. Dual Action Buttons: VIEW SELECTED WORK + DIRECT WHATSAPP */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href="#work"
                onClick={(e) => handleScrollToSection(e, 'work')}
                className="touch-target group relative inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-chrome-orange via-cyber-pink to-cyber-purple hover:scale-105 text-white font-mono font-bold text-sm tracking-wider uppercase rounded-xl shadow-orange-glow hover:shadow-[0_0_35px_rgba(244,63,94,0.5)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              <a
                href="https://wa.me/970599228979"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target group inline-flex items-center justify-center space-x-2.5 px-6 py-4 bg-white/[0.04] hover:bg-white/[0.09] text-cyber-cyan hover:text-white border border-cyber-cyan/40 hover:border-cyber-cyan font-mono font-bold text-sm tracking-wider uppercase rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
                aria-label="Direct WhatsApp Chat with Omer Salem"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>DIRECT CHAT</span>
                <span className="text-xs text-emerald-400 font-bold">●</span>
              </a>
            </div>

            {/* Micro Credential Ribbon */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.08] max-w-lg">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-400">
                  8+ Yrs
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-pink-400">
                  5 Live
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Client Stores</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  100%
                </span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Uptime & Defense</span>
              </div>
            </div>
          </div>

          {/* Right Column: Genuine 3D Elements + Real Portrait Layer */}
          <div className="lg:col-span-6 flex justify-center items-end order-2 lg:order-2 z-10">
            <HeroCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
