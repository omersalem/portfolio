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

const DISCIPLINE_THEMES = [
  {
    accent: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.35)',
    spotlight: 'rgba(0, 240, 255, 0.18)',
    badgeBg: 'bg-cyan-500/15',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15',
    iconBorder: 'border-cyan-500/40',
    iconText: 'text-cyan-400',
    ledColor: 'bg-cyan-400',
    checkColor: 'text-cyan-400',
  },
  {
    accent: '#FF5500',
    glowColor: 'rgba(255, 85, 0, 0.35)',
    spotlight: 'rgba(255, 85, 0, 0.18)',
    badgeBg: 'bg-orange-500/15',
    badgeBorder: 'border-orange-500/40',
    badgeText: 'text-orange-400',
    iconBg: 'bg-orange-500/15',
    iconBorder: 'border-orange-500/40',
    iconText: 'text-orange-400',
    ledColor: 'bg-orange-400',
    checkColor: 'text-orange-400',
  },
  {
    accent: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    spotlight: 'rgba(139, 92, 246, 0.18)',
    badgeBg: 'bg-purple-500/15',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    iconBorder: 'border-purple-500/40',
    iconText: 'text-purple-400',
    ledColor: 'bg-purple-400',
    checkColor: 'text-purple-400',
  },
  {
    accent: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    spotlight: 'rgba(16, 185, 129, 0.18)',
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    iconBorder: 'border-emerald-500/40',
    iconText: 'text-emerald-400',
    ledColor: 'bg-emerald-400',
    checkColor: 'text-emerald-400',
  },
];

export const DisciplineCard3D: React.FC<DisciplineCard3DProps> = ({ group, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const theme = DISCIPLINE_THEMES[index % DISCIPLINE_THEMES.length];
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
      `radial-gradient(340px circle at ${x}px ${y}px, ${theme.spotlight}, transparent 75%)`
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
            className="absolute -inset-1 rounded-2xl filter blur-lg pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHighlighted ? 0.95 : 0.2,
              transform: isHighlighted ? 'translateY(16px) scale(0.96)' : 'translateY(4px) scale(0.94)',
              boxShadow: isHighlighted ? `0 20px 40px -10px ${theme.glowColor}` : 'none',
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
          className={`relative h-full p-6 sm:p-7 rounded-xl overflow-hidden border transition-all duration-300 cursor-default focus-visible:ring-2 focus-visible:outline-none flex flex-col justify-between ${
            isHighlighted
              ? 'border-white/30 bg-[#0d1028] shadow-2xl'
              : 'border-white/10 bg-[#080b1e]/90 hover:border-white/20'
          }`}
          style={{
            borderColor: isHighlighted ? theme.accent : undefined,
            boxShadow: isHighlighted ? `0 0 30px ${theme.glowColor}` : undefined,
            ...(disable3D ? {} : { transformStyle: 'preserve-3d' }),
          }}
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
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

          {/* Holographic Specular Glare Reflection on Surface */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 48%, rgba(255,255,255,0.05) 52%, transparent 65%)',
                x: sheenTranslateX,
              }}
            />
          )}

          {/* Corner CAD Accents */}
          <div
            className="absolute top-2.5 left-2.5 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? theme.accent : 'rgba(255,255,255,0.2)' }}
          >
            ┌
          </div>
          <div
            className="absolute top-2.5 right-2.5 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? theme.accent : 'rgba(255,255,255,0.2)' }}
          >
            ┐
          </div>
          <div
            className="absolute bottom-2.5 left-2.5 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? theme.accent : 'rgba(255,255,255,0.15)' }}
          >
            └
          </div>
          <div
            className="absolute bottom-2.5 right-2.5 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? theme.accent : 'rgba(255,255,255,0.15)' }}
          >
            ┘
          </div>

          <div>
            {/* Header: Number Badge + Domain Label + LED (translateZ: 22px) */}
            <div
              className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/10"
              style={disable3D ? {} : { transform: 'translateZ(22px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${theme.badgeBg} border ${theme.badgeBorder} ${theme.badgeText}`}
                  style={{ boxShadow: `0 0 10px ${theme.glowColor}` }}
                >
                  {group.number}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                  CAPABILITY DOMAIN
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isHighlighted ? `${theme.ledColor} scale-110 animate-pulse` : 'bg-neutral-600'
                  }`}
                  style={{ boxShadow: isHighlighted ? `0 0 10px ${theme.accent}` : undefined }}
                />
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-semibold">
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
                className={`p-2.5 rounded-lg border transition-all duration-300 shrink-0 mt-0.5 ${
                  isHighlighted
                    ? `${theme.iconBg} ${theme.iconBorder} ${theme.iconText}`
                    : 'bg-white/5 border-white/10 text-neutral-300'
                }`}
                style={{ boxShadow: isHighlighted ? `0 0 15px ${theme.glowColor}` : undefined }}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              <h4 className="text-base sm:text-lg font-mono font-bold text-white leading-snug">
                {group.title}
              </h4>
            </div>

            {/* Description (translateZ: 16px) */}
            <p
              className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed mb-5 pl-0.5"
              style={disable3D ? {} : { transform: 'translateZ(16px)' }}
            >
              {group.description}
            </p>
          </div>

          <div>
            {/* Highlights List with Glowing Checkmarks (translateZ: 24px) */}
            <ul
              className="space-y-2 pt-3.5 border-t border-white/10"
              style={disable3D ? {} : { transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
            >
              {group.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs font-sans text-neutral-200 font-medium">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${theme.checkColor} shrink-0 mt-0.5`} />
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

