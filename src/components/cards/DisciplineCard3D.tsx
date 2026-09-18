import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layout, ShoppingCart, Bot, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CapabilityGroup } from '../../types';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface DisciplineCard3DProps {
  group: CapabilityGroup;
  index: number;
}

const DISCIPLINE_ICONS = [
  Layout,       // 01 Website & Application Design
  ShoppingCart, // 02 E-Commerce & Commercial Platforms
  Bot,          // 03 AI Systems, Looping & Agent Skills
  ShieldCheck,  // 04 Enterprise Firewalls, Networks, Active Directory
];

export const DisciplineCard3D: React.FC<DisciplineCard3DProps> = ({ group, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const disable3D = reducedMotion || reducedEffects;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePixelX = useMotionValue(150);
  const mousePixelY = useMotionValue(150);

  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [11, -11]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-13, 13]);
  const cardScale = useSpring(isHovered || isFocused ? 1.025 : 1.0, springConfig);
  const cardZ = useSpring(isHovered || isFocused ? 28 : 0, springConfig);

  const sheenTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-90, 90]);

  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(340px circle at ${x}px ${y}px, rgba(255, 85, 0, 0.16), rgba(255, 255, 255, 0.8) 35%, transparent 75%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disable3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    mousePixelX.set(e.clientX - rect.left);
    mousePixelY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!disable3D) {
      mouseX.set(0);
      mouseY.set(-0.2);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const IconComponent = DISCIPLINE_ICONS[index % DISCIPLINE_ICONS.length];
  const isHighlighted = isHovered || isFocused;

  return (
    <div className="flex flex-col h-full" style={{ perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={disable3D ? undefined : { opacity: 0, y: 25, rotateX: 6 }}
        whileInView={disable3D ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={
          disable3D
            ? {}
            : {
                rotateX,
                rotateY,
                scale: cardScale,
                z: cardZ,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative w-full h-full rounded-xl transition-shadow duration-300"
      >
        {/* Dynamic Floor Shadow */}
        {!disable3D && (
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-neutral-900/20 filter blur-lg pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHighlighted ? 0.95 : 0.25,
              transform: isHighlighted ? 'translateY(16px) scale(0.96)' : 'translateY(4px) scale(0.94)',
              boxShadow: isHighlighted ? '0 20px 40px -10px rgba(255, 85, 0, 0.25)' : 'none',
            }}
          />
        )}

        {/* Card Slab Body */}
        <div
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="region"
          aria-label={`${group.number} ${group.title}`}
          className={`relative h-full p-6 sm:p-7 rounded-xl overflow-hidden border transition-all duration-300 cursor-default focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none flex flex-col justify-between ${
            isHighlighted
              ? 'border-chrome-orange/80 bg-gradient-to-b from-white via-[#faf9f6] to-[#efeae0] shadow-xl'
              : 'border-cv-border bg-gradient-to-b from-white/95 via-[#fcfbf9]/90 to-[#f5f2ea]/90 hover:border-neutral-400'
          }`}
          style={disable3D ? {} : { transformStyle: 'preserve-3d' }}
        >
          {/* Spotlight overlay */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: spotlightBg,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Top highlight rail */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />

          {/* Holographic Specular Glare Reflection on Surface */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.7) 48%, rgba(255,85,0,0.15) 52%, transparent 65%)',
                x: sheenTranslateX,
              }}
            />
          )}

          {/* Corner CAD Accents */}
          <div className="absolute top-2.5 left-2.5 text-[9px] font-mono text-chrome-orange/40 pointer-events-none select-none">
            ┌
          </div>
          <div className="absolute top-2.5 right-2.5 text-[9px] font-mono text-chrome-orange/40 pointer-events-none select-none">
            ┐
          </div>
          <div className="absolute bottom-2.5 left-2.5 text-[9px] font-mono text-neutral-400 pointer-events-none select-none">
            └
          </div>
          <div className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-neutral-400 pointer-events-none select-none">
            ┘
          </div>

          <div>
            {/* Header: Number Badge + Domain Label + LED (translateZ: 22px) */}
            <div
              className="flex items-center justify-between mb-4 pb-2.5 border-b border-cv-border/70"
              style={disable3D ? {} : { transform: 'translateZ(22px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold text-chrome-orange bg-chrome-orange/15 border border-chrome-orange/30 shadow-[0_0_8px_rgba(255,85,0,0.2)]">
                  {group.number}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-semibold">
                  CAPABILITY DOMAIN
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-chrome-orange shadow-[0_0_8px_rgba(255,85,0,0.9)] scale-110'
                      : 'bg-emerald-600/70'
                  }`}
                />
                <span className="text-[9px] font-mono text-neutral-500 uppercase font-semibold">
                  {isHighlighted ? 'ACTIVE' : 'READY'}
                </span>
              </div>
            </div>

            {/* Title & Domain Icon (translateZ: 28px) */}
            <div
              className="flex items-start space-x-3 mb-3"
              style={disable3D ? {} : { transform: 'translateZ(28px)', transformStyle: 'preserve-3d' }}
            >
              <div
                className={`p-2 rounded-lg border transition-all duration-300 shrink-0 mt-0.5 ${
                  isHighlighted
                    ? 'bg-chrome-orange/15 border-chrome-orange/50 text-chrome-orange shadow-[0_0_12px_rgba(255,85,0,0.2)]'
                    : 'bg-stone-100 border-stone-200 text-neutral-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              <h4 className="text-base sm:text-lg font-mono font-bold text-cv-dark leading-snug">
                {group.title}
              </h4>
            </div>

            {/* Description (translateZ: 16px) */}
            <p
              className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed mb-5 pl-0.5"
              style={disable3D ? {} : { transform: 'translateZ(16px)' }}
            >
              {group.description}
            </p>
          </div>

          <div>
            {/* Highlights List with Glowing Checkmarks (translateZ: 24px) */}
            <ul
              className="space-y-2 pt-3.5 border-t border-cv-border/60"
              style={disable3D ? {} : { transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
            >
              {group.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs font-sans text-neutral-800 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chrome-orange shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
