"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import { UserProfile, defaultProfile, roleOptions, mainGoalOptions, currentSetupOptions, personaMapping } from "@/lib/persona-mapping";
import { getDynamicVariables, interpolateTemplate } from "@/lib/dynamic-variables";

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setRole: (roleId: string) => void;
  setMainGoal: (goalId: string) => void;
  setCurrentSetup: (setupId: string) => void;
  completeOnboarding: () => void;
  resetProfile: () => void;
  getDynamicVariables: () => Record<string, string>;
  interpolate: (template: string) => string;
  canShowOnboarding: () => boolean;
  getOnboardingProgress: () => number;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const setRole = useCallback((roleId: string) => {
    const roleData = roleOptions.find(r => r.id === roleId);
    if (roleData) {
      setProfile(prev => ({
        ...prev,
        role: roleId as UserProfile["role"],
        roleLabel: roleData.label,
        persona: roleData.persona,
      }));
    }
  }, []);

  const setMainGoal = useCallback((goalId: string) => {
    const goalData = mainGoalOptions.find(g => g.id === goalId);
    if (goalData) {
      setProfile(prev => ({
        ...prev,
        mainGoal: goalId as UserProfile["mainGoal"],
        mainGoalLabel: goalData.label,
        recommendedModule: goalData.recommendedModule,
      }));
    }
  }, []);

  const setCurrentSetup = useCallback((setupId: string) => {
    const setupData = currentSetupOptions.find(s => s.id === setupId);
    if (setupData) {
      setProfile(prev => ({
        ...prev,
        currentSetup: setupId as UserProfile["currentSetup"],
        currentSetupLabel: setupData.label,
        signals: setupData.signals,
        recommendedModules: setupData.recommendedModules,
      }));
    }
  }, []);

  const completeOnboarding = useCallback(() => {
    setProfile(prev => ({ ...prev, isOnboarded: true }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(defaultProfile);
  }, []);

  const getVars = useCallback(() => getDynamicVariables(profile), [profile]);
  
  const interpolate = useCallback((template: string) => 
    interpolateTemplate(template, profile), [profile]);

  const canShowOnboarding = useCallback(() => !profile.isOnboarded, [profile.isOnboarded]);

  const getProgress = useCallback(() => {
    let progress = 0;
    if (profile.role) progress += 33;
    if (profile.mainGoal) progress += 33;
    if (profile.currentSetup) progress += 34;
    return progress;
  }, [profile]);

  const value = useMemo(() => ({
    profile,
    updateProfile,
    setRole,
    setMainGoal,
    setCurrentSetup,
    completeOnboarding,
    resetProfile,
    getDynamicVariables: getVars,
    interpolate,
    canShowOnboarding,
    getOnboardingProgress: getProgress,
  }), [profile, updateProfile, setRole, setMainGoal, setCurrentSetup, completeOnboarding, resetProfile, getVars, interpolate, canShowOnboarding, getProgress]);

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}

export function usePersonaConfig() {
  const { profile } = useUserProfile();
  
  if (!profile.role) {
    return null;
  }
  
  return personaMapping[profile.role] || null;
}

export function useDynamicContent() {
  const { profile, interpolate, getDynamicVariables } = useUserProfile();

  const content = useMemo(() => {
    const vars = getDynamicVariables();
    const personaConfig = profile.role ? personaMapping[profile.role] : null;

    return {
      variables: vars,
      persona: profile.persona,
      role: profile.roleLabel,
      goal: profile.mainGoalLabel,
      setup: profile.currentSetupLabel,
      module: profile.recommendedModule,
      headline: interpolate(personaConfig?.heroHeadline || "Welcome to Flowly"),
      subheadline: interpolate(personaConfig?.heroSubheadline || "Your personalized experience awaits"),
      cta: interpolate(personaConfig?.cta || "Get Started"),
      isReady: profile.isOnboarded,
    };
  }, [profile, interpolate, getDynamicVariables]);

  return content;
}