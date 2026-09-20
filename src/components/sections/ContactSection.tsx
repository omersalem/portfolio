import React from 'react';
import { ContactLaptopCanvas } from '../3d/ContactLaptopCanvas';
import { ArrowDown, Github, Mail, MessageSquare } from 'lucide-react';
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
      className="relative py-20 lg:py-32 bg-chrome-black text-white border-t border-chrome-border/60 overflow-hidden"
    >
      {/* Visual Transition from Off-White into Deep Charcoal Void */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-cv-offwhite/5 to-transparent pointer-events-none" />

      <div className="layout-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Columns 1-7): Conversion Copy + Contact Options */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-chrome-orange uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-chrome-orange rounded-full" />
              <span>DIRECT INITIATION</span>
            </div>

            {/* Exact Headline */}
            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white mb-4 leading-[1.05]"
            >
              YOUR NEXT WEBSITE <br />
              STARTS HERE.
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg font-mono text-neutral-400 font-light mb-8 max-w-xl">
              Built with design clarity and an engineer&apos;s precision.
            </p>

            {/* Primary Action Button: LET'S BUILD */}
            <div className="mb-12">
              <a
                href="#contact-options"
                onClick={handleScrollToOptions}
                className="touch-target group inline-flex items-center space-x-3 px-8 py-4 bg-chrome-orange hover:bg-chrome-orange-light text-black font-mono font-bold text-sm tracking-wider uppercase rounded shadow-orange-glow transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>LET&apos;S BUILD</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>

            {/* In-page Target Region with ID: contact-options */}
            <div
              id="contact-options"
              className="pt-8 border-t border-chrome-border/60 space-y-4 max-w-md"
            >
              <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-3">
                COMMUNICATION CHANNELS
              </div>

              {/* 1. Verified GitHub Link */}
              <div className="chrome-panel p-4 rounded-lg flex items-center justify-between transition-colors hover:border-chrome-orange/70">
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-chrome-orange shrink-0" />
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">
                      Code & Infrastructure
                    </div>
                    <a
                      href="https://github.com/omersalem"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target text-sm sm:text-base font-mono font-semibold text-white hover:text-chrome-orange transition-colors underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none py-1"
                      aria-label="Visit Omer Salem GitHub profile at github.com/omersalem"
                    >
                      github.com/omersalem
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              {/* 2. Direct WhatsApp Link */}
              <div className="chrome-panel p-4 rounded-lg flex items-center justify-between transition-colors hover:border-chrome-orange/70">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-chrome-orange shrink-0" />
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">
                      Direct Messaging (WhatsApp)
                    </div>
                    <a
                      href="https://wa.me/970599228979"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target text-sm sm:text-base font-mono font-semibold text-white hover:text-chrome-orange transition-colors underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none py-1"
                      aria-label="Chat directly with Omer Salem on WhatsApp at +970 599 228 979"
                    >
                      +970 599 228 979
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>

              {/* 3. Direct Email Link */}
              <div className="chrome-panel p-4 rounded-lg flex items-center justify-between transition-colors hover:border-chrome-orange/70">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-chrome-orange shrink-0" />
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">
                      Official Correspondence (Email)
                    </div>
                    <a
                      href="mailto:omersalem@mne.gov.ps"
                      className="touch-target text-sm sm:text-base font-mono font-semibold text-white hover:text-chrome-orange transition-colors underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none py-1"
                      aria-label="Send email to Omer Salem at omersalem@mne.gov.ps"
                    >
                      omersalem@mne.gov.ps
                    </a>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Web Platforms", "Infrastructure", "Security", "Consultation"].map((service) => (
                  <a key={service} href={`https://wa.me/970599228979?text=${encodeURIComponent(`Hello Omer, I need help with ${service}`)}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded border border-chrome-border bg-chrome-charcoal text-xs font-mono text-neutral-300 hover:border-chrome-orange hover:text-white transition-colors">
                    {service}
                  </a>
                ))}
              </div>
              <div className="pt-2 flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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

