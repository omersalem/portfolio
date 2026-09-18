import React from 'react';
import { EffectSettingsProvider } from './context/EffectSettingsContext';
import { SkipLink } from './components/common/SkipLink';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { EngineeringSection } from './components/sections/EngineeringSection';
import { VisualCVSection } from './components/sections/VisualCVSection';
import { ContactSection } from './components/sections/ContactSection';
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
        </main>

        {/* Architectural Footer */}
        <Footer />
      </div>
    </EffectSettingsProvider>
  );
};

export default App;
