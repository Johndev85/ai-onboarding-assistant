"use client";

import { useEffect, useRef, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

export function ExecutiveDecisionRoom() {
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

  const metrics = [
    { label: "Revenue Growth", value: "+34%", change: "+12%" },
    { label: "Marketing ROI", value: "4.2x", change: "+0.8x" },
    { label: "Customer Acquisition", value: "$127", change: "-$23" },
    { label: "Pipeline Value", value: "$2.4M", change: "+$800K" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Executive Decision Room
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Your Command Center
            <br />
            <span className="text-muted-foreground">for Growth Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Real-time visibility into marketing performance, revenue impact, and strategic opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`p-6 border border-foreground/10 hover:border-foreground/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
              <div className="text-4xl font-display mb-2">{metric.value}</div>
              <div className={`text-sm ${metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {metric.change} vs last month
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 p-8 bg-foreground text-background rounded-2xl transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display mb-2">Ready to build your command center?</h3>
              <p className="text-background/70">Get personalized insights based on your role and goals.</p>
            </div>
            <button className="px-8 py-4 bg-background text-foreground rounded-full font-medium hover:bg-background/90 transition-colors">
              Build My Executive Command Center
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}