'use client';

import HeroSection from '@/components/publicPageComponents/HeroSection';
import WhyDocspathSection from '@/components/publicPageComponents/WhyDocspathSection';
import CoreFeaturesSection from '@/components/publicPageComponents/CoreFeaturesSection';
import TargetAudienceSection from '@/components/publicPageComponents/TargetAudienceSection';
import HowItWorksSection from '@/components/publicPageComponents/HowItWorksSection';
import TestimonialsSection from '@/components/publicPageComponents/TestimonialsSection';
import AwardsSection from '@/components/publicPageComponents/AwardsSection';
import FAQSection from '@/components/publicPageComponents/FAQSection';
import { useTheme } from '@/components/publicPageComponents/Layout';


export default function Page() {
  const {darkMode} = useTheme()
  return (
    <main className="min-h-screen">
      <HeroSection darkMode={darkMode} />
      <WhyDocspathSection darkMode={darkMode} />
      <CoreFeaturesSection darkMode={darkMode} />
      <TargetAudienceSection darkMode={darkMode} />
      <HowItWorksSection darkMode={darkMode} />
      <TestimonialsSection darkMode={darkMode} />
      <AwardsSection darkMode={darkMode} />
      <FAQSection darkMode={darkMode} />
    </main>
  );
}