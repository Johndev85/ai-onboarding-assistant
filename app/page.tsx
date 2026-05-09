"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { AdaptiveLanding } from "@/components/landing/adaptive-landing";
import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

function BlurredLanding() {
  return (
    <div className="fixed inset-0 blur-xl opacity-30 pointer-events-none overflow-y-auto">
      <div className="pt-20">
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InfrastructureSection />
        <MetricsSection />
        <IntegrationsSection />
        <SecuritySection />
        <DevelopersSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
        <FooterSection />
      </div>
    </div>
  );
}

function WelcomeOverlay() {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
      <div className="bg-background/70 backdrop-blur-sm rounded-2xl p-8 border border-foreground/10 max-w-md text-center shadow-xl pointer-events-auto">
        <div className="text-5xl mb-4">👋</div>
        <h2 className="text-3xl font-display mb-3">Welcome to Flowly</h2>
        <p className="text-muted-foreground mb-6">
          Complete the onboarding questionnaire to unlock your personalized experience.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Look for the panel on the right →</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { profile } = useUserProfile();

  if (profile.isOnboarded && profile.role) {
    return <AdaptiveLanding />;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BlurredLanding />
      <WelcomeOverlay />
    </main>
  );
}