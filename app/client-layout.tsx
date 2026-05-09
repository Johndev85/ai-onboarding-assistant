"use client";

import React, { ReactNode } from "react";
import { ThreadsProvider } from "@copilotkit/react-core"
import { CopilotKit } from "@copilotkit/react-core"
import { CopilotSidebar } from "@copilotkit/react-ui"
import { OnboardingPanel } from "@/components/chat/OnboardingPanel"
import '@copilotkit/react-ui/styles.css'
import './globals.css'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThreadsProvider>
      <CopilotKit runtimeUrl="/api/copilotkit">
        {children}
        <OnboardingPanel />
        <CopilotSidebar defaultOpen={true} />
      </CopilotKit>
    </ThreadsProvider>
  );
}