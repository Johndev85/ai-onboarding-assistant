"use client";

import { useEffect, useState } from "react";
import { useOnboardingChat } from "@/hooks/useOnboardingChat";
import { MessageCircle } from "lucide-react";

export function OnboardingChatWrapper() {
  return null;
}

export function OnboardingInlineForm({ step = 0 }: { step?: number }) {
  const { handleAnswer } = useOnboardingChat();
  
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
        { id: "financial_visibility", label: "We need better financial visibility into marketing" },
        { id: "multiple_clients_accounts", label: "We manage multiple clients or accounts" },
      ],
    },
  ];

  const currentQuestion = questions[step] || questions[0];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-sm p-4 bg-background border border-foreground/20 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-foreground" />
        <span className="text-xs font-medium text-foreground">Flowly Onboarding</span>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Step {step + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-foreground transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-sm font-medium mb-3">{currentQuestion.question}</p>

      <div className="space-y-2">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className="w-full text-left px-3 py-2 text-sm rounded-lg border border-foreground/20 hover:border-foreground/50 hover:bg-foreground/[0.02] transition-all"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}