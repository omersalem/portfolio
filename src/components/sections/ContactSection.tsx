import React from 'react';
import { ContactLaptopCanvas } from '../3d/ContactLaptopCanvas';
import { ArrowDown, Github, Mail, MessageSquare, Sparkles, Send } from 'lucide-react';
import { useEffectSettings } from '../../context/EffectSettingsContext';

export const ContactSection: React.FC = () => {
  const { reducedMotion } = useEffectSettings();

  const handleScrollToOptions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const optionsElement = document.getElementById('contact-options');
    if (optionsElement) {
      if (reducedMotion) {
        optionsElement.scrollIntoView({ behavior: 'auto' });
      } else {
        optionsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-24 lg:py-36 bg-[#050611] text-white border-t border-cyber-cyan/15 overflow-hidden"
    >
      {/* Background Chromatic Aurora Glows */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-cyber-purple/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="layout-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Columns 1-7): Conversion Copy + Contact Options */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-chrome-orange/10 border border-chrome-orange/30 text-xs font-mono tracking-widest text-chrome-orange uppercase mb-4 shadow-[0_0_15px_rgba(255,85,0,0.2)] w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chrome-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-chrome-orange" />
              </span>
              <span>DIRECT INITIATION</span>
            </div>

            {/* Exact Headline */}
            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-white mb-4 leading-[1.05]"
            >
              YOUR NEXT WEBSITE <br />
              <span className="text-gradient-aurora">STARTS HERE.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg font-mono text-neutral-300 font-light mb-8 max-w-xl leading-relaxed">
              Built with design clarity and an engineer&apos;s precision. From national-scale network security to multi-currency commerce storefronts.
            </p>

            {/* Primary Action Button: LET'S BUILD */}
            <div className="mb-12">
              <a
                href="#contact-options"
                onClick={handleScrollToOptions}
                className="touch-target group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-chrome-orange via-orange-500 to-amber-500 hover:from-amber-500 hover:to-chrome-orange text-black font-mono font-bold text-sm tracking-wider uppercase rounded-xl shadow-[0_0_30px_rgba(255,85,0,0.4)] hover:shadow-[0_0_40px_rgba(255,85,0,0.6)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>LET&apos;S BUILD</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>

            {/* In-page Target Region with ID: contact-options */}
            <div
              id="contact-options"
              className="pt-8 border-t border-white/10 space-y-4 max-w-lg"
            >
              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>VERIFIED DIRECT COMMUNICATION CHANNELS</span>
              </div>

              {/* 1. Verified GitHub Link */}
              <div className="relative group p-4 rounded-xl border border-purple-500/25 bg-[#0e1026]/80 hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Code &amp; Infrastructure
                    </div>
                    <a
                      href="https://github.com/omersalem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target text-sm sm:text-base font-mono font-bold text-white hover:text-purple-300 transition-colors underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none py-1"
                      aria-label="Visit Omer Salem GitHub profile at github.com/omersalem"
                    >
                      github.com/omersalem
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-300 border border-purple-500/40 bg-purple-500/15 px-2.5 py-0.5 rounded-full font-bold">
                  VERIFIED
                </span>
              </div>

              {/* 2. Direct WhatsApp Link */}
              <div className="relative group p-4 rounded-xl border border-emerald-500/25 bg-[#0a1820]/80 hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.18)] transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Direct Messaging (WhatsApp)
                    </div>
                    <a
                      href="https://wa.me/970599228979"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target text-sm sm:text-base font-mono font-bold text-white hover:text-emerald-300 transition-colors underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none py-1"
                      aria-label="Chat directly with Omer Salem on WhatsApp at +970 599 228 979"
                    >
                      +970 599 228 979
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-300 border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 rounded-full font-bold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>

              {/* 3. Direct Email Link */}
              <div className="relative group p-4 rounded-xl border border-cyan-500/25 bg-[#091526]/80 hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] transition-all duration-300 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      Official Correspondence (Email)
                    </div>
                    <a
                      href="mailto:omersalem@mne.gov.ps"
                      className="touch-target text-sm sm:text-base font-mono font-bold text-white hover:text-cyan-300 transition-colors underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none py-1"
                      aria-label="Send email to Omer Salem at omersalem@mne.gov.ps"
                    >
                      omersalem@mne.gov.ps
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-300 border border-cyan-500/40 bg-cyan-500/15 px-2.5 py-0.5 rounded-full font-bold">
                  OFFICIAL
                </span>
              </div>

              {/* Quick Inquiry Options */}
              <div className="mt-6 pt-2">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5">
                  Direct WhatsApp Project Brief:
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { service: "Web Platforms", color: "hover:border-cyan-400 hover:text-cyan-300 border-cyan-500/20" },
                    { service: "E-Commerce", color: "hover:border-orange-400 hover:text-orange-300 border-orange-500/20" },
                    { service: "Infrastructure & Security", color: "hover:border-emerald-400 hover:text-emerald-300 border-emerald-500/20" },
                    { service: "AI Agent Automation", color: "hover:border-purple-400 hover:text-purple-300 border-purple-500/20" },
                  ].map(({ service, color }) => (
                    <a
                      key={service}
                      href={`https://wa.me/970599228979?text=${encodeURIComponent(`Hello Omer, I would like to consult on ${service}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg border bg-white/5 text-xs font-mono text-neutral-200 transition-all duration-200 flex items-center justify-between group ${color}`}
                    >
                      <span>{service}</span>
                      <Send className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for high-performance web engineering and infrastructure consulting.</span>
              </div>
            </div>
          </div>

          {/* Right Column (Columns 8-12): 3D Monolithic Engineering Laptop */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <ContactLaptopCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};

