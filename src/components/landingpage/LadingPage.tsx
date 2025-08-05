"use client";
import Header from '@/components/landingpage/ui/HeaderComponent';
import HeroSection from '@/components/landingpage/ui/HeroSectionComponent';
import FeaturesSection from '@/components/landingpage/ui/FeaturesSectionComponent';
import StatsSection from '@/components/landingpage/ui/StatsSectionComponent';
import HowItWorksSection from '@/components/landingpage/ui/HowItWorksSectionComponent';
import TestimonialsSection from '@/components/landingpage/ui/TestimonialsSectionComponent';
import CTASection from '@/components/landingpage/ui/CTASectionComponent';
import Footer from '@/components/landingpage/ui/FooterComponent';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}