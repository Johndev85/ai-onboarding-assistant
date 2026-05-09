"use client";

import { useEffect, useRef, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Database, Lock, Zap, Layers } from "lucide-react";

export function ArchitectureMap() {
  const { profile } = useUserProfile();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const integrations = [
    { name: "Google Analytics", status: "connected", icon: "📊" },
    { name: "Meta Ads", status: "connected", icon: "📱" },
    { name: "HubSpot", status: "pending", icon: "🔄" },
    { name: "Salesforce", status: "available", icon: "☁️" },
    { name: "Shopify", status: "available", icon: "🛒" },
    { name: "Stripe", status: "available", icon: "💳" },
  ];

  const features = [
    { icon: Database, title: "Data Warehouse", description: "Centralized data lake with real-time sync" },
    { icon: Zap, title: "Real-time API", description: "Sub-100ms latency for live data access" },
    { icon: Lock, title: "Enterprise Security", description: "SOC 2 Type II, encryption at rest & transit" },
    { icon: Layers, title: "Custom Integrations", description: "Build with our open API and SDKs" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Architecture Map
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Unified Marketing Data
            <br />
            <span className="text-muted-foreground">Architecture</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Connect your entire stack. Our API-first platform integrates with 200+ tools out of the box.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <h3 className="text-xl font-display">Integration Status</h3>
            <div className="space-y-3">
              {integrations.map((int) => (
                <div key={int.name} className="flex items-center justify-between p-4 border border-foreground/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{int.icon}</span>
                    <span>{int.name}</span>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${
                    int.status === "connected" ? "bg-green-500/10 text-green-600" :
                    int.status === "pending" ? "bg-yellow-500/10 text-yellow-600" :
                    "bg-foreground/5 text-muted-foreground"
                  }`}>
                    {int.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`grid gap-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {features.map((feature, i) => (
              <div key={feature.title} className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-foreground/10 rounded-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
            Generate My Integration Plan
          </button>
        </div>
      </div>
    </section>
  );
}