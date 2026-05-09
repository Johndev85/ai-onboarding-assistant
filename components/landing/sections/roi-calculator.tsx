"use client";

import { useEffect, useRef, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { DollarSign, Percent, Users, Clock } from "lucide-react";

export function RoiCalculator() {
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
    { label: "Marketing ROI", value: "420%", icon: Percent, color: "text-green-600" },
    { label: "CAC", value: "$127", icon: DollarSign, color: "text-blue-600" },
    { label: "LTV", value: "$1,840", icon: Users, color: "text-purple-600" },
    { label: "Payback Period", value: "4.2 mo", icon: Clock, color: "text-orange-600" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Financial Impact
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Complete Visibility into
            <br />
            <span className="text-muted-foreground">Marketing ROI & Profitability</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Understand the true impact of your marketing spend. Track CAC, LTV, payback, and margin in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`p-8 border border-foreground/10 bg-background ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>
              <div className="text-4xl font-display">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className={`grid lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="p-6 border border-foreground/10 rounded-xl">
            <h4 className="font-display text-xl mb-4">LTV:CAC Ratio</h4>
            <div className="text-5xl font-display mb-2">14.5:1</div>
            <p className="text-sm text-muted-foreground">Healthy ratio above 3:1</p>
          </div>
          <div className="p-6 border border-foreground/10 rounded-xl">
            <h4 className="font-display text-xl mb-4">Customer Payback</h4>
            <div className="text-5xl font-display mb-2">4.2 mo</div>
            <p className="text-sm text-muted-foreground">Industry average: 6-12 months</p>
          </div>
          <div className="p-6 border border-foreground/10 rounded-xl">
            <h4 className="font-display text-xl mb-4">Marketing Margin</h4>
            <div className="text-5xl font-display mb-2">67%</div>
            <p className="text-sm text-muted-foreground">Up from 52% last quarter</p>
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
            Calculate My Financial Impact
          </button>
        </div>
      </div>
    </section>
  );
}