import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CoreMetric } from '../../types';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface MetricCard3DProps {
  metric: CoreMetric;
  index: number;
}

const METRIC_THEMES = [
  {
    accent: '#FF5500',
    colorClass: 'text-amber-400',
    dotColor: 'bg-amber-400',
    glowColor: 'rgba(255, 85, 0, 0.35)',
    borderHover: 'hover:border-amber-400/70',
    gradientValue: 'from-amber-200 via-orange-400 to-amber-300',
    bgSpotlight: 'rgba(255, 85, 0, 0.2)',
  },
  {
    accent: '#10B981',
    colorClass: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    borderHover: 'hover:border-emerald-400/70',
    gradientValue: 'from-emerald-200 via-teal-300 to-emerald-300',
    bgSpotlight: 'rgba(16, 185, 129, 0.2)',
  },
  {
    accent: '#8B5CF6',
    colorClass: 'text-purple-400',
    dotColor: 'bg-purple-400',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    borderHover: 'hover:border-purple-400/70',
    gradientValue: 'from-purple-200 via-pink-400 to-indigo-300',
    bgSpotlight: 'rgba(139, 92, 246, 0.2)',
  },
  {
    accent: '#00F0FF',
    colorClass: 'text-cyber-cyan',
    dotColor: 'bg-cyber-cyan',
    glowColor: 'rgba(0, 240, 255, 0.35)',
    borderHover: 'hover:border-cyber-cyan/70',
    gradientValue: 'from-cyan-200 via-sky-300 to-blue-300',
    bgSpotlight: 'rgba(0, 240, 255, 0.2)',
  },
];

export const MetricCard3D: React.FC<MetricCard3DProps> = ({ metric, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const theme = METRIC_THEMES[index % METRIC_THEMES.length];
  const disable3D = reducedMotion || reducedEffects;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePixelX = useMotionValue(100);
  const mousePixelY = useMotionValue(100);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const cardScale = useSpring(isHovered || isFocused ? 1.03 : 1.0, springConfig);
  const cardZ = useSpring(isHovered || isFocused ? 24 : 0, springConfig);

  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(280px circle at ${x}px ${y}px, ${theme.bgSpotlight}, transparent 75%)`
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

  const isHighlighted = isHovered || isFocused;

  return (
    <div className="flex flex-col h-full" style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={disable3D ? undefined : { opacity: 0, y: 20, rotateX: 6 }}
        whileInView={disable3D ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
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
            className="absolute -inset-1 rounded-2xl filter blur-md pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHighlighted ? 0.9 : 0.2,
              transform: isHighlighted ? 'translateY(12px) scale(0.96)' : 'translateY(4px) scale(0.94)',
              boxShadow: isHighlighted ? `0 16px 30px -8px ${theme.glowColor}` : 'none',
            }}
          />
        )}

        {/* Card Slab Body */}
        <div
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="region"
          aria-label={`${metric.label}: ${metric.value}`}
          className={`relative h-full p-5 rounded-xl overflow-hidden border transition-all duration-300 cursor-default focus-visible:ring-2 focus-visible:outline-none flex flex-col justify-between text-start ${
            isHighlighted
              ? 'border-white/30 bg-[#0d1127] shadow-xl'
              : 'border-white/10 bg-[#090c1e]/90 hover:border-white/20'
          }`}
          style={{
            borderColor: isHighlighted ? theme.accent : undefined,
            boxShadow: isHighlighted ? `0 0 25px ${theme.glowColor}` : undefined,
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

          {/* Corner CAD Accents */}
          <div
            className="absolute top-2 start-2 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? theme.accent : 'rgba(255,255,255,0.2)' }}
          >
            ┌
          </div>
          <div
            className="absolute top-2 end-2 text-[9px] font-mono pointer-events-none select-none transition-colors"
            style={{ color: isHighlighted ? theme.accent : 'rgba(255,255,255,0.2)' }}
          >
            ┐
          </div>

          <div>
            {/* Metric Value (translateZ: 26px) */}
            <div
              className={`text-2xl sm:text-3xl font-display font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientValue}`}
              style={disable3D ? {} : { transform: 'translateZ(26px)' }}
            >
              {metric.value}
            </div>

            {/* Metric Label (translateZ: 20px) */}
            <div
              className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${theme.colorClass}`}
              style={disable3D ? {} : { transform: 'translateZ(20px)' }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} shrink-0 animate-pulse`} />
              <span>{metric.label}</span>
            </div>
          </div>

          {/* Metric Subtext (translateZ: 14px) */}
          <div
            className="text-[11px] font-mono text-neutral-400 leading-snug pt-2.5 border-t border-white/10"
            style={disable3D ? {} : { transform: 'translateZ(14px)' }}
          >
            {metric.subtext}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
