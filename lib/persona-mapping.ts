import { z } from "zod";

export type UserRole = 
  | "ceo_founder"
  | "cto_technical_lead"
  | "cmo_growth_lead"
  | "cfo_finance_lead"
  | "agency_owner_consultant";

export type MainGoal = 
  | "faster_strategic_decisions"
  | "connect_automate_data_stack"
  | "improve_campaign_performance"
  | "understand_financial_metrics"
  | "automate_client_reporting";

export type CurrentSetup = 
  | "multiple_ad_channels"
  | "fragmented_data"
  | "manual_reporting"
  | "financial_visibility"
  | "multiple_clients_accounts";

export interface UserProfile {
  role: UserRole | null;
  roleLabel: string | null;
  persona: string | null;
  mainGoal: MainGoal | null;
  mainGoalLabel: string | null;
  recommendedModule: string | null;
  currentSetup: CurrentSetup | null;
  currentSetupLabel: string | null;
  signals: string[];
  recommendedModules: string[];
  isOnboarded: boolean;
}

export const userProfileSchema = z.object({
  role: z.string().nullable(),
  roleLabel: z.string().nullable(),
  persona: z.string().nullable(),
  mainGoal: z.string().nullable(),
  mainGoalLabel: z.string().nullable(),
  recommendedModule: z.string().nullable(),
  currentSetup: z.string().nullable(),
  currentSetupLabel: z.string().nullable(),
  signals: z.array(z.string()),
  recommendedModules: z.array(z.string()),
  isOnboarded: z.boolean(),
});

export const roleOptions = [
  { id: "ceo_founder", label: "CEO / Founder", persona: "CEO / Founder", primaryAngle: "Executive decision-making and growth intelligence" },
  { id: "cto_technical_lead", label: "CTO / Technical Lead", persona: "CTO / Technical Lead", primaryAngle: "Architecture, integrations, security, and scalability" },
  { id: "cmo_growth_lead", label: "CMO / Growth Lead", persona: "CMO / Growth Lead", primaryAngle: "Campaign performance, attribution, and marketing automation" },
  { id: "cfo_finance_lead", label: "CFO / Finance Lead", persona: "CFO / Finance Lead", primaryAngle: "Financial impact, marketing profitability, and operational efficiency" },
  { id: "agency_owner_consultant", label: "Agency Owner / Consultant", persona: "Agency Owner / Consultant", primaryAngle: "Agency efficiency, client retention, and reporting automation" },
];

export const mainGoalOptions = [
  { id: "faster_strategic_decisions", label: "Make faster strategic decisions", bestFitPersonas: ["ceo_founder"], recommendedModule: "executive_decision_room" },
  { id: "connect_automate_data_stack", label: "Connect and automate my marketing data stack", bestFitPersonas: ["cto_technical_lead"], recommendedModule: "architecture_map" },
  { id: "improve_campaign_performance", label: "Improve campaign performance", bestFitPersonas: ["cmo_growth_lead"], recommendedModule: "campaign_performance_simulator" },
  { id: "understand_financial_metrics", label: "Understand ROI, CAC, LTV, and payback", bestFitPersonas: ["cfo_finance_lead"], recommendedModule: "roi_calculator" },
  { id: "automate_client_reporting", label: "Automate client reporting and scale operations", bestFitPersonas: ["agency_owner_consultant"], recommendedModule: "agency_margin_calculator" },
];

export const currentSetupOptions = [
  { id: "multiple_ad_channels", label: "We manage multiple ad channels", signals: ["multi_channel_marketing", "campaign_complexity"], recommendedModules: ["cross_channel_cockpit", "campaign_performance_simulator"] },
  { id: "fragmented_data", label: "We use several tools but data is fragmented", signals: ["data_fragmentation", "integration_need"], recommendedModules: ["architecture_map", "data_pipeline_preview"] },
  { id: "manual_reporting", label: "We spend too much time on manual reporting", signals: ["manual_reporting", "operational_inefficiency"], recommendedModules: ["automated_reporting_flow", "agency_margin_calculator"] },
  { id: "financial_visibility", label: "We need better financial visibility into marketing", signals: ["financial_visibility", "profitability_focus"], recommendedModules: ["roi_calculator", "cac_ltv_simulator", "payback_analysis"] },
  { id: "multiple_clients_accounts", label: "We manage multiple clients or accounts", signals: ["agency_model", "multi_account_management"], recommendedModules: ["multi_client_command_center", "client_reporting_demo"] },
];

export const personaMapping: Record<string, {
  persona: string;
  module: string;
  cta: string;
  sections: string[];
  heroHeadline: string;
  heroSubheadline: string;
}> = {
  ceo_founder: {
    persona: "CEO / Founder",
    module: "executive_decision_room",
    cta: "Build My Executive Command Center",
    sections: ["hero", "executive_decision_room", "growth_opportunity_map", "marketing_efficiency_score", "strategic_kpi_summary", "business_impact_cta"],
    heroHeadline: "Your Executive Command Center for Growth Intelligence",
    heroSubheadline: "Make faster, data-driven decisions with centralized marketing insights and strategic KPIs.",
  },
  cto_technical_lead: {
    persona: "CTO / Technical Lead",
    module: "architecture_map",
    cta: "Generate My Integration Plan",
    sections: ["hero", "architecture_map", "api_integration_planner", "data_pipeline_preview", "security_checklist", "implementation_timeline", "technical_cta"],
    heroHeadline: "Unified Marketing Data Architecture",
    heroSubheadline: "Connect, integrate, and automate your entire marketing stack with our API-first platform.",
  },
  cmo_growth_lead: {
    persona: "CMO / Growth Lead",
    module: "campaign_performance_simulator",
    cta: "Analyze My Campaigns",
    sections: ["hero", "campaign_performance_simulator", "cross_channel_cockpit", "creative_insights_preview", "budget_allocation_flow", "marketing_automation_planner", "growth_cta"],
    heroHeadline: "Maximize Campaign Performance with AI Insights",
    heroSubheadline: "Optimize every channel, attribution, and creative decision with real-time performance intelligence.",
  },
  cfo_finance_lead: {
    persona: "CFO / Finance Lead",
    module: "roi_calculator",
    cta: "Calculate My Financial Impact",
    sections: ["hero", "roi_calculator", "cac_ltv_simulator", "payback_analysis", "margin_impact_preview", "budget_efficiency_score", "financial_cta"],
    heroHeadline: "Complete Financial Visibility into Marketing ROI",
    heroSubheadline: "Understand the true impact of marketing spend with ROI, CAC, LTV, and payback analysis.",
  },
  agency_owner_consultant: {
    persona: "Agency Owner / Consultant",
    module: "agency_margin_calculator",
    cta: "Build My Agency Command Center",
    sections: ["hero", "agency_margin_calculator", "client_reporting_demo", "multi_client_command_center", "account_health_overview", "client_retention_risk_map", "agency_cta"],
    heroHeadline: "Scale Your Agency with Automated Operations",
    heroSubheadline: "Automate client reporting, optimize margins, and deliver exceptional value to every account.",
  },
};

export const defaultProfile: UserProfile = {
  role: null,
  roleLabel: null,
  persona: null,
  mainGoal: null,
  mainGoalLabel: null,
  recommendedModule: null,
  currentSetup: null,
  currentSetupLabel: null,
  signals: [],
  recommendedModules: [],
  isOnboarded: false,
};