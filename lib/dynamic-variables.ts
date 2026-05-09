import { UserProfile } from "./persona-mapping";

export interface DynamicVariable {
  key: string;
  value: string;
  lowercase?: string;
}

export function getDynamicVariables(profile: UserProfile): Record<string, string> {
  return {
    role: profile.roleLabel || "{{role}}",
    role_lower: profile.role?.replace(/_/g, " ") || "{{role_lower}}",
    goal: profile.mainGoalLabel || "{{goal}}",
    goal_lower: profile.mainGoal?.replace(/_/g, " ") || "{{goal_lower}}",
    setup: profile.currentSetupLabel || "{{setup}}",
    setup_lower: profile.currentSetup?.replace(/_/g, " ") || "{{setup_lower}}",
    persona: profile.persona || "{{persona}}",
    module: profile.recommendedModule || "{{module}}",
    signals: profile.signals.join(", ") || "{{signals}}",
    onboarding_status: profile.isOnboarded ? "complete" : "pending",
  };
}

export function interpolateTemplate(template: string, profile: UserProfile): string {
  const variables = getDynamicVariables(profile);
  
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }
  
  return result;
}

export function interpolateMultiple(
  templates: Record<string, string>,
  profile: UserProfile
): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const [key, template] of Object.entries(templates)) {
    result[key] = interpolateTemplate(template, profile);
  }
  
  return result;
}

export const templatePresets = {
  hero_headline: {
    ceo_founder: "Your {{persona}} Command Center for Growth Intelligence",
    cto_technical_lead: "Unified Marketing Data Architecture for {{role_lower}}",
    cmo_growth_lead: "Maximize Campaign Performance with AI Insights",
    cfo_finance_lead: "Complete Financial Visibility into Marketing ROI",
    agency_owner_consultant: "Scale Your Agency with Automated Operations",
  },
  hero_subheadline: {
    ceo_founder: "Make faster, data-driven decisions with centralized marketing insights and strategic KPIs.",
    cto_technical_lead: "Connect, integrate, and automate your entire marketing stack with our API-first platform.",
    cmo_growth_lead: "Optimize every channel, attribution, and creative decision with real-time performance intelligence.",
    cfo_finance_lead: "Understand the true impact of marketing spend with ROI, CAC, LTV, and payback analysis.",
    agency_owner_consultant: "Automate client reporting, optimize margins, and deliver exceptional value to every account.",
  },
  cta_button: {
    ceo_founder: "Build My Executive Command Center",
    cto_technical_lead: "Generate My Integration Plan",
    cmo_growth_lead: "Analyze My Campaigns",
    cfo_finance_lead: "Calculate My Financial Impact",
    agency_owner_consultant: "Build My Agency Command Center",
  },
};

export function getPresetValue(
  preset: keyof typeof templatePresets,
  profile: UserProfile
): string {
  const presetMap = templatePresets[preset];
  const roleKey = profile.role as keyof typeof presetMap;
  
  if (roleKey && presetMap[roleKey]) {
    return interpolateTemplate(presetMap[roleKey], profile);
  }
  
  return interpolateTemplate("{{role}} Intelligence Platform", profile);
}