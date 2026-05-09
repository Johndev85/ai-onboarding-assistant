"use client";

import { useState } from "react";
import { roleOptions, mainGoalOptions, currentSetupOptions } from "@/lib/persona-mapping";
import { CheckCircle2 } from "lucide-react";

interface OnboardingToolProps {
  currentStep: number;
  onAnswer: (answer: string) => void;
  isComplete?: boolean;
}

const questions = [
  {
    id: "role",
    question: "What best describes your role?",
    options: roleOptions,
  },
  {
    id: "goal", 
    question: "What are you trying to improve first?",
    options: mainGoalOptions,
  },
  {
    id: "setup",
    question: "What best describes your current setup?",
    options: currentSetupOptions,
  },
];

export function OnboardingTool({ currentStep, onAnswer, isComplete }: OnboardingToolProps) {
  if (isComplete) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Onboarding Complete!</p>
            <p className="text-sm text-green-600">Your personalized experience is ready.</p>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentStep] || questions[0];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-md">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-foreground transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-4">
        <h3 className="text-lg font-display">{question.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className="w-full text-left p-3 rounded-lg border border-foreground/20 hover:border-foreground/50 hover:bg-foreground/[0.02] transition-all group"
          >
            <span className="font-medium text-sm group-hover:translate-x-1 transition-transform inline-block">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Hint */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Click an option to continue
      </p>
    </div>
  );
}

export function OnboardingWelcome() {
  return (
    <div className="p-4 bg-foreground text-background rounded-xl max-w-md">
      <div className="text-3xl mb-3">👋</div>
      <h3 className="text-xl font-display mb-2">Welcome to Flowly!</h3>
      <p className="text-background/80 text-sm mb-4">
        To personalize your experience, I'll ask you 3 quick questions.
        Your answers will help us tailor the platform to your needs.
      </p>
      <p className="text-xs text-background/60">
        Let's get started →
      </p>
    </div>
  );
}

export function OnboardingStatus({ 
  role, 
  goal, 
  setup 
}: { 
  role?: string | null; 
  goal?: string | null; 
  setup?: string | null; 
}) {
  const items = [
    { label: "Role", value: role, done: !!role },
    { label: "Goal", value: goal, done: !!goal },
    { label: "Setup", value: setup, done: !!setup },
  ];

  return (
    <div className="p-4 border border-foreground/10 rounded-xl">
      <h4 className="text-sm font-medium mb-3">Your Profile</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${item.done ? "bg-green-500" : "bg-foreground/20"}`} />
            <span className="text-muted-foreground">{item.label}:</span>
            <span className={item.done ? "font-medium" : "text-muted-foreground/50"}>
              {item.value || "Not set"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}