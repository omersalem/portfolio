import React, { Suspense, lazy } from 'react';
import { EffectSettingsProvider } from './context/EffectSettingsContext';
import { SkipLink } from './components/common/SkipLink';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
const SelectedWorkSection = lazy(() => import('./components/sections/SelectedWorkSection').then(m => ({default: m.SelectedWorkSection})));
const EngineeringSection = lazy(() => import('./components/sections/EngineeringSection').then(m => ({default: m.EngineeringSection})));
const VisualCVSection = lazy(() => import('./components/sections/VisualCVSection').then(m => ({default: m.VisualCVSection})));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({default: m.ContactSection})));
import { Footer } from './components/navigation/Footer';

export const App: React.FC = () => {
  return (
    <EffectSettingsProvider>
      <div className="relative min-h-screen bg-chrome-black text-white selection:bg-chrome-orange selection:text-black flex flex-col">
        {/* Accessible Skip Link */}
        <SkipLink />

        {/* Global Navigation */}
        <Navbar />

        {/* Semantic Main Content */}
        <main id="main-content" className="flex-grow">
          <Suspense fallback={<div className="min-h-screen bg-chrome-black" />}>
          {/* Section 1: Hero / Portrait */}
          <HeroSection />

          {/* Section 2: Selected Client Work */}
          <SelectedWorkSection />

          {/* Section 3: Engineering Core */}
          <EngineeringSection />

          {/* Section 4: Visual CV (Warm Off-White Chapter Break) */}
          <VisualCVSection />

          {/* Section 5: Contact & Conversion */}
          <ContactSection />
          </Suspense>
        </main>

        {/* Architectural Footer */}
        <Footer />
      </div>
    </EffectSettingsProvider>
  );
};

export default App;
