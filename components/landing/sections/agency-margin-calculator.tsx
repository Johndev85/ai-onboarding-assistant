"use client";

import { useEffect, useRef, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Users, TrendingUp, AlertTriangle, FileText } from "lucide-react";

export function AgencyMarginCalculator() {
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

  const clients = [
    { name: "TechCorp Inc", mrr: "$8,500", health: "good", retention: "94%" },
    { name: "RetailMax", mrr: "$5,200", health: "warning", retention: "78%" },
    { name: "HealthFirst", mrr: "$4,100", health: "good", retention: "96%" },
    { name: "EduSmart", mrr: "$3,800", health: "risk", retention: "62%" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Agency Operations
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Scale Your Agency
            <br />
            <span className="text-muted-foreground">with Automated Operations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Automate client reporting, optimize margins, and deliver exceptional value to every account.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total MRR", value: "$21,600", icon: TrendingUp },
            { label: "Active Clients", value: "12", icon: Users },
            { label: "Avg Retention", value: "92%", icon: TrendingUp },
            { label: "At Risk", value: "1", icon: AlertTriangle },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`p-6 border border-foreground/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
              <div className="text-3xl font-display flex items-center gap-2">
                <stat.icon className="w-5 h-5" />
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className={`border border-foreground/10 overflow-hidden transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="px-6 py-4 border-b border-foreground/10 bg-foreground/[0.02] flex items-center justify-between">
            <span className="font-mono text-sm">Client Health Overview</span>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Export Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">MRR</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Health</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Retention</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.name} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                    <td className="px-6 py-4 font-medium">{client.name}</td>
                    <td className="px-6 py-4">${client.mrr}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        client.health === "good" ? "bg-green-500/10 text-green-600" :
                        client.health === "warning" ? "bg-yellow-500/10 text-yellow-600" :
                        "bg-red-500/10 text-red-600"
                      }`}>
                        {client.health}
                      </span>
                    </td>
                    <td className="px-6 py-4">{client.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <button className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
            Build My Agency Command Center
          </button>
        </div>
      </div>
    </section>
  );
}