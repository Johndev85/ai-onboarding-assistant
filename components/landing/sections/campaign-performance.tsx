"use client";

import { useEffect, useRef, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { TrendingUp, Target, BarChart3 } from "lucide-react";

export function CampaignPerformance() {
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

  const campaigns = [
    { name: "Q2 Brand Awareness", channel: "Meta", spend: "$12,400", roas: "3.2x", status: "active" },
    { name: "Retargeting - Cart", channel: "Google", spend: "$8,200", roas: "4.8x", status: "active" },
    { name: "Lead Gen - Ebook", channel: "LinkedIn", spend: "$5,600", roas: "2.1x", status: "paused" },
    { name: "Summer Promo", channel: "TikTok", spend: "$3,400", roas: "1.9x", status: "active" },
  ];

  const channels = ["Meta", "Google", "LinkedIn", "TikTok", "Email"];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Campaign Performance
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Maximize Every Dollar
            <br />
            <span className="text-muted-foreground">with AI Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Optimize attribution, creative performance, and budget allocation across all channels.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Spend", value: "$29,600", icon: TrendingUp },
            { label: "Avg ROAS", value: "3.1x", icon: Target },
            { label: "Conversions", value: "847", icon: BarChart3 },
            { label: "CPL", value: "$34.94", icon: BarChart3 },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 border border-foreground/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
              <div className="text-3xl font-display">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className={`border border-foreground/10 overflow-hidden transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="px-6 py-4 border-b border-foreground/10 bg-foreground/[0.02]">
            <span className="font-mono text-sm">Campaign Performance</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Campaign</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Channel</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Spend</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">ROAS</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.name} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                    <td className="px-6 py-4">{campaign.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{campaign.channel}</td>
                    <td className="px-6 py-4">${campaign.spend}</td>
                    <td className="px-6 py-4">
                      <span className={`${parseFloat(campaign.roas) >= 3 ? "text-green-600" : "text-muted-foreground"}`}>
                        {campaign.roas}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        campaign.status === "active" ? "bg-green-500/10 text-green-600" : "bg-foreground/5"
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
            Analyze My Campaigns
          </button>
        </div>
      </div>
    </section>
  );
}