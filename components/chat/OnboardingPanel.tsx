"use client";

import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { MessageCircle, Check, ChevronRight } from "lucide-react";

export function OnboardingPanel() {
  const { profile, setRole, setMainGoal, setCurrentSetup, completeOnboarding } = useUserProfile();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (profile.role) setStep(1);
    if (profile.mainGoal) setStep(2);
    if (profile.currentSetup) setStep(3);
  }, [profile.role, profile.mainGoal, profile.currentSetup]);

  if (profile.isOnboarded) return null;

  const questions = [
    { 
      id: "role", 
      question: "What best describes your role?", 
      options: [
        { id: "ceo_founder", label: "CEO / Founder" },
        { id: "cto_technical_lead", label: "CTO / Technical Lead" },
        { id: "cmo_growth_lead", label: "CMO / Growth Lead" },
        { id: "cfo_finance_lead", label: "CFO / Finance Lead" },
        { id: "agency_owner_consultant", label: "Agency Owner / Consultant" },
      ],
    },
    { 
      id: "goal", 
      question: "What are you trying to improve first?", 
      options: [
        { id: "faster_strategic_decisions", label: "Make faster strategic decisions" },
        { id: "connect_automate_data_stack", label: "Connect and automate my marketing data stack" },
        { id: "improve_campaign_performance", label: "Improve campaign performance" },
        { id: "understand_financial_metrics", label: "Understand ROI, CAC, LTV, and payback" },
        { id: "automate_client_reporting", label: "Automate client reporting and scale operations" },
      ],
    },
    { 
      id: "setup", 
      question: "What best describes your current setup?", 
      options: [
        { id: "multiple_ad_channels", label: "We manage multiple ad channels" },
        { id: "fragmented_data", label: "We use several tools but data is fragmented" },
        { id: "manual_reporting", label: "We spend too much time on manual reporting" },
        { id: "financial_visibility", label: "We need better financial visibility" },
        { id: "multiple_clients_accounts", label: "We manage multiple clients or accounts" },
      ],
    },
  ];

  const currentQuestion = questions[step] || questions[0];
  const progress = ((step + 1) / 3) * 100;

  const handleSelect = (optionId: string) => {
    if (step === 0) {
      setRole(optionId);
      setStep(1);
    } else if (step === 1) {
      setMainGoal(optionId);
      setStep(2);
    } else if (step === 2) {
      setCurrentSetup(optionId);
      completeOnboarding();
    }
  };

  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-80"
    >
      <div className="bg-background border border-foreground/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-4 py-3 bg-foreground text-background flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium text-sm">Flowly Onboarding</span>
          {profile.isOnboarded && <Check className="w-4 h-4 ml-auto" />}
        </div>

        <div className="px-4 py-2 bg-foreground/5">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Step {step + 1} of 3</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
            <div className="h-full bg-foreground transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-4">
          <p className="font-medium text-sm mb-3">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.02] transition-all flex items-center justify-between group"
              >
                <span>{option.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-2 border-t border-foreground/10 text-center">
          <p className="text-xs text-muted-foreground">
            {step === 0 && "Choose your role to get started"}
            {step === 1 && "Select your main goal"}
            {step === 2 && "Last question!"}
          </p>
        </div>
      </div>
    </div>
  );
}