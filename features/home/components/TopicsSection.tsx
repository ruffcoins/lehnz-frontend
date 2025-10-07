"use client";

import React from "react";
import { Card } from "@/features/shared/ui/card";
import { Brain, Database, Rocket, Server, Activity, Code2 } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Model architectures, training pipelines, and optimization",
    count: "124 guides",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "ETL pipelines, data quality, and infrastructure",
    count: "89 guides",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Model serving, scaling, and production best practices",
    count: "156 guides",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description: "Cloud architecture, compute, and resource optimization",
    count: "102 guides",
  },
  {
    icon: Activity,
    title: "MLOps",
    description: "Monitoring, versioning, and continuous training",
    count: "78 guides",
  },
  {
    icon: Code2,
    title: "AI APIs",
    description: "LLM integration, prompt engineering, and API design",
    count: "134 guides",
  },
];

export default function TopicsSection() {
  return (
    <section className="border-border bg-background border-b py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-3 text-3xl font-bold md:text-4xl">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore production-ready guides across AI/ML engineering domains
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                href={`/category/${category.title.toLowerCase().replace(" ", "-")}`}
              >
                <Card className="group border-border bg-card h-full border p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-2 text-xl font-bold transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium">{category.count}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
