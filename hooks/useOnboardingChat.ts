"use client";

import { useEffect, useState } from "react";
import { useUserProfile } from "./useUserProfile";
import { roleOptions, mainGoalOptions, currentSetupOptions } from "@/lib/persona-mapping";

interface OnboardingState {
  currentStep: number;
  isActive: boolean;
  isComplete: boolean;
}

export function useOnboardingChat() {
  const { profile, setRole, setMainGoal, setCurrentSetup, completeOnboarding } = useUserProfile();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: 0,
    isActive: !profile.isOnboarded,
    isComplete: profile.isOnboarded,
  });

  useEffect(() => {
    setOnboardingState({
      currentStep: profile.role ? (profile.mainGoal ? (profile.currentSetup ? 2 : 1) : 0) : 0,
      isActive: !profile.isOnboarded,
      isComplete: profile.isOnboarded,
    });
  }, [profile.role, profile.mainGoal, profile.currentSetup, profile.isOnboarded]);

  const handleAnswer = (answer: string) => {
    const currentStep = onboardingState.currentStep;
    
    if (currentStep === 0) {
      setRole(answer);
    } else if (currentStep === 1) {
      setMainGoal(answer);
    } else if (currentStep === 2) {
      setCurrentSetup(answer);
      completeOnboarding();
      setOnboardingState(prev => ({ ...prev, isComplete: true, isActive: false }));
    }

    if (currentStep < 2) {
      setOnboardingState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const startOnboarding = () => {
    setOnboardingState({
      currentStep: 0,
      isActive: true,
      isComplete: false,
    });
  };

  const resetOnboarding = () => {
    setOnboardingState({
      currentStep: 0,
      isActive: true,
      isComplete: false,
    });
  };

  const getOnboardingStatus = () => {
    return {
      currentStep: onboardingState.currentStep,
      totalSteps: 3,
      progress: ((onboardingState.currentStep + 1) / 3) * 100,
      role: profile.role,
      roleLabel: profile.roleLabel,
      goal: profile.mainGoal,
      goalLabel: profile.mainGoalLabel,
      setup: profile.currentSetup,
      setupLabel: profile.currentSetupLabel,
      isActive: onboardingState.isActive,
      isComplete: onboardingState.isComplete,
      isOnboarded: profile.isOnboarded,
    };
  };

  const getCurrentQuestion = () => {
    const questions = [
      { id: "role", question: "What best describes your role?", options: roleOptions },
      { id: "goal", question: "What are you trying to improve first?", options: mainGoalOptions },
      { id: "setup", question: "What best describes your current setup?", options: currentSetupOptions },
    ];
    return questions[onboardingState.currentStep] || questions[0];
  };

  return {
    onboardingState,
    handleAnswer,
    startOnboarding,
    resetOnboarding,
    getOnboardingStatus,
    getCurrentQuestion,
    profile,
  };
}

export function useOnboardingActions() {
  const { profile, setRole, setMainGoal, setCurrentSetup, completeOnboarding } = useUserProfile();

  const actions = {
    setUserRole: (roleId: string) => {
      const roleData = roleOptions.find(r => r.id === roleId);
      if (roleData) {
        setRole(roleId);
        return { success: true, message: `Role set to ${roleData.label}` };
      }
      return { success: false, message: "Invalid role" };
    },

    setUserGoal: (goalId: string) => {
      const goalData = mainGoalOptions.find(g => g.id === goalId);
      if (goalData) {
        setMainGoal(goalId);
        return { success: true, message: `Goal set to ${goalData.label}` };
      }
      return { success: false, message: "Invalid goal" };
    },

    setUserSetup: (setupId: string) => {
      const setupData = currentSetupOptions.find(s => s.id === setupId);
      if (setupData) {
        setCurrentSetup(setupId);
        return { success: true, message: `Setup set to ${setupData.label}` };
      }
      return { success: false, message: "Invalid setup" };
    },

    completeOnboardingFlow: () => {
      if (profile.role && profile.mainGoal && profile.currentSetup) {
        completeOnboarding();
        return { success: true, message: "Onboarding completed! Your personalized experience is ready." };
      }
      return { success: false, message: "Please complete all questions first" };
    },

    getOnboardingStatus: () => {
      return {
        hasRole: !!profile.role,
        hasGoal: !!profile.mainGoal,
        hasSetup: !!profile.currentSetup,
        isOnboarded: profile.isOnboarded,
        currentAnswers: {
          role: profile.roleLabel,
          goal: profile.mainGoalLabel,
          setup: profile.currentSetupLabel,
        },
      };
    },

    canShowOnboardingForm: () => {
      return !profile.isOnboarded;
    },

    getOnboardingProgress: () => {
      let progress = 0;
      if (profile.role) progress += 33;
      if (profile.mainGoal) progress += 33;
      if (profile.currentSetup) progress += 34;
      return progress;
    },
  };

  return actions;
}