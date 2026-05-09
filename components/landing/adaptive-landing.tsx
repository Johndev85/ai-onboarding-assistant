"use client";

import { useUserProfile, useDynamicContent, usePersonaConfig } from "@/hooks/useUserProfile";
import { getPresetValue } from "@/lib/dynamic-variables";
import { AnimatedSphere } from "./animated-sphere";
import { ExecutiveDecisionRoom } from "./sections/executive-decision-room";
import { ArchitectureMap } from "./sections/architecture-map";
import { CampaignPerformance } from "./sections/campaign-performance";
import { RoiCalculator } from "./sections/roi-calculator";
import { AgencyMarginCalculator } from "./sections/agency-margin-calculator";

function DynamicHero() {
  const { profile, interpolate } = useUserProfile();
  const personaConfig = usePersonaConfig();

  const headline = profile.role 
    ? getPresetValue("hero_headline", profile)
    : "The platform for modern teams";
  
  const subheadline = profile.role
    ? getPresetValue("hero_subheadline", profile)
    : "Your toolkit to stop configuring and start innovating.";

  const cta = profile.role
    ? getPresetValue("cta_button", profile)
    : "Get Started";

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-30 pointer-events-none">
        <AnimatedSphere />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
        <div className="mb-8">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            {profile.persona 
              ? `Personalized for ${profile.persona}` 
              : "The platform for modern teams"}
          </span>
        </div>

        <h1 className="text-[clamp(3rem,10vw,8rem)] font-display leading-[0.9] tracking-tight mb-8">
          {interpolate(headline)}
        </h1>

        <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
          {interpolate(subheadline)}
        </p>

        {profile.isOnboarded && profile.role && (
          <div className="mt-12">
            <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
              {interpolate(cta)}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <div className="text-4xl font-display mb-4">Flowly</div>
        <p className="text-muted-foreground animate-pulse">Personalizing your experience...</p>
      </div>
    </div>
  );
}

export function AdaptiveLanding() {
  const { profile } = useUserProfile();
  const { isReady } = useDynamicContent();

  if (!isReady) {
    return <LoadingState />;
  }

  const renderSection = () => {
    switch (profile.role) {
      case "ceo_founder":
        return <ExecutiveDecisionRoom />;
      case "cto_technical_lead":
        return <ArchitectureMap />;
      case "cmo_growth_lead":
        return <CampaignPerformance />;
      case "cfo_finance_lead":
        return <RoiCalculator />;
      case "agency_owner_consultant":
        return <AgencyMarginCalculator />;
      default:
        return (
          <section className="py-24 lg:py-32 border-t border-foreground/10">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
              <h2 className="text-4xl font-display mb-6">Complete Your Onboarding</h2>
              <p className="text-muted-foreground mb-8">
                Answer a few questions in the chat to get personalized content.
              </p>
            </div>
          </section>
        );
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden animate-fade-in">
      <DynamicHero />
      {renderSection()}

      <footer className="py-12 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center text-muted-foreground">
          <p>© 2025 Flowly. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            filter: blur(20px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </main>
  );
}