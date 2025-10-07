"use client";

import React from "react";
import { Shield, Cog, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Engineering Standards",
    description:
      "Every guide follows strict architecture and review standards to ensure production-ready quality.",
  },
  {
    icon: Cog,
    title: "Production-Ready Patterns",
    description:
      "All content is vetted for scalability, maintainability, and real-world application at scale.",
  },
  {
    icon: Users,
    title: "Community of Experts",
    description:
      "Peer-reviewed by engineers solving real-world AI/ML problems in production environments.",
  },
];

export default function ValueProposition() {
  return (
    <section className="border-border bg-muted/30 border-b py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-3 text-3xl font-bold md:text-4xl">
            What Makes Pure Engineering Different
          </h2>
          <p className="text-muted-foreground text-lg">
            The quality and rigor you expect from production systems
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map(feature => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
                  <Icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
