import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Network, ShieldCheck, KeyRound, Mail, Layers, Bot, Activity } from 'lucide-react';
import { InfrastructureNode } from '../../types';
import { useEffectSettings } from '../../context/EffectSettingsContext';

interface InfrastructureCard3DProps {
  node: InfrastructureNode;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

// Icon mapping per infrastructure domain
const NODE_ICONS = [
  Network,     // 01 Cisco Core Switches & Routing
  ShieldCheck, // 02 Firewalls & Perimeter Security
  KeyRound,    // 03 Active Directory & Identity
  Mail,        // 04 Microsoft Exchange Server
  Layers,      // 05 SCCM Endpoint Management
  Bot,         // 06 AI Autonomous Agents
];

const DOMAIN_CODES = [
  'FABRIC_ROUTING',
  'PERIMETER_DEFENSE',
  'IDENTITY_GOV',
  'MESSAGING_CLUSTER',
  'ENDPOINT_OPS',
  'AGENTIC_SYSTEMS',
];

export const InfrastructureCard3D: React.FC<InfrastructureCard3DProps> = ({
  node,
  index,
  isActive,
  onActivate,
  onDeactivate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { reducedMotion, reducedEffects } = useEffectSettings();

  const disable3D = reducedMotion || reducedEffects;

  // Normalized mouse coordinates: -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel mouse coordinates for dynamic spotlight
  const mousePixelX = useMotionValue(150);
  const mousePixelY = useMotionValue(150);

  // Smooth spring physics for 3D rotation and depth
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Tilt angles: up to 11 deg on X, 13 deg on Y for tactile physical sensation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [11, -11]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-13, 13]);
  const cardScale = useSpring(isHovered || isFocused || isActive ? 1.025 : 1.0, springConfig);
  const cardZ = useSpring(isHovered || isFocused || isActive ? 28 : 0, springConfig);

  // Specular sheen shift across the metallic surface
  const sheenTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-100, 100]);

  // Dynamic cursor spotlight background
  const spotlightBg = useTransform(
    [mousePixelX, mousePixelY],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x}px ${y}px, rgba(255, 85, 0, 0.22), rgba(255, 255, 255, 0.06) 30%, transparent 70%)`
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

  const handleMouseEnter = () => {
    setIsHovered(true);
    onActivate();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    onDeactivate();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onActivate();
    if (!disable3D) {
      mouseX.set(0);
      mouseY.set(-0.2); // subtle upward tilt on keyboard focus
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    mouseX.set(0);
    mouseY.set(0);
    onDeactivate();
  };

  const IconComponent = NODE_ICONS[index % NODE_ICONS.length];
  const domainCode = DOMAIN_CODES[index % DOMAIN_CODES.length];

  const isHighlighted = isHovered || isFocused || isActive;

  return (
    <div className="flex flex-col h-full" style={{ perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={disable3D ? undefined : { opacity: 0, y: 25, rotateX: 6 }}
        whileInView={disable3D ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
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
        {/* 1. Dynamic 3D Floor Shadow & Glow Layer */}
        {!disable3D && (
          <motion.div
            className="absolute -inset-1 rounded-2xl bg-black/90 filter blur-lg pointer-events-none -z-10 transition-all duration-300"
            style={{
              opacity: isHighlighted ? 0.95 : 0.35,
              transform: isHighlighted ? 'translateY(18px) scale(0.95)' : 'translateY(6px) scale(0.92)',
              boxShadow: isHighlighted ? '0 25px 45px -8px rgba(255, 85, 0, 0.32)' : 'none',
            }}
          />
        )}

        {/* 2. Main Hardware Slab Body */}
        <div
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="region"
          aria-label={`${node.number} ${node.label}`}
          className={`group relative flex flex-col justify-between h-full p-5 sm:p-6 rounded-xl overflow-hidden border transition-all duration-300 cursor-default focus-visible:ring-2 focus-visible:ring-chrome-orange focus-visible:outline-none ${
            isHighlighted
              ? 'border-chrome-orange/90 bg-gradient-to-b from-[#1e202a] via-[#14151c] to-[#0a0b0f] shadow-[0_0_20px_rgba(255,85,0,0.18)]'
              : 'border-chrome-border/80 bg-gradient-to-b from-[#181920] via-[#111217] to-[#090a0d] hover:border-chrome-border-light'
          }`}
          style={disable3D ? {} : { transformStyle: 'preserve-3d' }}
        >
          {/* Interactive Dynamic Chrome Cursor Spotlight */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: spotlightBg,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Top Specular Rim Highlight Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none z-20" />

          {/* Holographic Specular Glare Reflection on Metallic Surface */}
          {!disable3D && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background:
                  'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.08) 48%, rgba(255,85,0,0.18) 52%, transparent 65%)',
                x: sheenTranslateX,
              }}
            />
          )}

          {/* Precision CAD Corner Brackets */}
          <div className="absolute top-2 left-2 text-[9px] font-mono text-chrome-orange/40 pointer-events-none select-none">
            ┌
          </div>
          <div className="absolute top-2 right-2 text-[9px] font-mono text-chrome-orange/40 pointer-events-none select-none">
            ┐
          </div>
          <div className="absolute bottom-2 left-2 text-[9px] font-mono text-neutral-600 pointer-events-none select-none">
            └
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-600 pointer-events-none select-none">
            ┘
          </div>

          <div>
            {/* Header: Node Number + Domain Code + Status LED (translateZ: 24px) */}
            <div
              className="flex items-center justify-between mb-3.5"
              style={disable3D ? {} : { transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold text-chrome-orange bg-chrome-orange/15 border border-chrome-orange/30 shadow-[0_0_8px_rgba(255,85,0,0.2)]">
                  NODE_{node.number}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 tracking-wider hidden sm:inline-block">
                  // {domainCode}
                </span>
              </div>

              {/* Status LED & Core Sync Pulse */}
              <div className="flex items-center space-x-1.5">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-chrome-orange shadow-[0_0_10px_rgba(255,85,0,1)] scale-110'
                      : 'bg-emerald-500/70 shadow-[0_0_4px_rgba(16,185,129,0.5)]'
                  }`}
                />
                <span className="text-[9px] font-mono text-neutral-400 uppercase">
                  {isHighlighted ? 'LINKED' : 'ONLINE'}
                </span>
              </div>
            </div>

            {/* Title & Hardware Domain Icon (translateZ: 30px) */}
            <div
              className="flex items-start space-x-3 mb-2.5"
              style={disable3D ? {} : { transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            >
              <div
                className={`p-2 rounded-lg border transition-all duration-300 shrink-0 mt-0.5 ${
                  isHighlighted
                    ? 'bg-chrome-orange/20 border-chrome-orange/60 text-chrome-orange shadow-[0_0_12px_rgba(255,85,0,0.25)]'
                    : 'bg-black/50 border-chrome-border/70 text-neutral-400 group-hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </div>

              <h3 className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-chrome-orange transition-colors leading-snug">
                {node.label}
              </h3>
            </div>

            {/* Description Text (translateZ: 18px) */}
            <p
              className="text-xs font-sans text-neutral-400 leading-relaxed mb-4 pl-0.5"
              style={disable3D ? {} : { transform: 'translateZ(18px)' }}
            >
              {node.description}
            </p>
          </div>

          <div>
            {/* Verified Technology Badges as Surface-Mount Chips (translateZ: 26px) */}
            <div
              className="flex flex-wrap gap-1.5 pt-3.5 border-t border-chrome-border/50"
              style={disable3D ? {} : { transform: 'translateZ(26px)', transformStyle: 'preserve-3d' }}
            >
              {node.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-mono text-neutral-300 bg-[#0d0e13] border border-chrome-border/70 rounded shadow-sm group-hover:border-chrome-orange/30 group-hover:text-white transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom Telemetry Channel Cue (translateZ: 16px) */}
            <div
              className="mt-3 pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-chrome-border/30"
              style={disable3D ? {} : { transform: 'translateZ(16px)' }}
            >
              <span className="flex items-center space-x-1.5 text-chrome-orange font-semibold">
                <Activity className="w-3 h-3" />
                <span>3D_CONDUIT_{node.number}</span>
              </span>
              <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                HOVER TO PULSE CORE →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
