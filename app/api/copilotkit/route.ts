import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime';
import { NextRequest } from 'next/server';

const serviceAdapter = new GoogleGenerativeAIAdapter({
  model: 'gemini-1.5-flash-8k',
  apiKey: process.env.GOOGLE_API_KEY,
});

const runtime = new CopilotRuntime({
  a2ui: {
    injectA2UITool: true,
  },
});

const systemPrompt = `You are Flowly's onboarding assistant. Guide users through 3 quick questions.

## Questions & IDs
1. Role: CEO/Founder (ceo_founder), CTO/Technical Lead (cto_technical_lead), CMO/Growth Lead (cmo_growth_lead), CFO/Finance Lead (cfo_finance_lead), Agency Owner/Consultant (agency_owner_consultant)
2. Goal: Faster decisions (faster_strategic_decisions), Connect/automate (connect_automate_data_stack), Improve campaigns (improve_campaign_performance), Financial metrics (understand_financial_metrics), Automate reporting (automate_client_reporting)
3. Setup: Multiple ad channels (multiple_ad_channels), Fragmented data (fragmented_data), Manual reporting (manual_reporting), Financial visibility (financial_visibility), Multiple clients (multiple_clients_accounts)

## Actions
When user answers:
- For role: call setUserRole with the role ID
- For goal: call setUserGoal with the goal ID  
- For setup: call setUserSetup with the setup ID
- After all 3: call completeOnboardingFlow

## A2UI Forms
You can render forms using A2UI. Use the renderForm tool with:
- id: "onboarding-form"
- formData with currentStep, question, options array

Be brief. Ask one question at a time.`;

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  });

  return handleRequest(req);
};

export const GET = async () => {
  return new Response('Method not allowed', { status: 405 });
};