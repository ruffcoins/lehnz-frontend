"use client";

import React from "react";
import { Card } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { Button } from "@/features/shared/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface Guide {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const mockGuides: Guide[] = [
  {
    id: "1",
    title: "Production-Ready RAG Systems: Architecture & Implementation",
    excerpt:
      "A comprehensive guide to building retrieval-augmented generation systems that scale. Covers vector databases, embedding strategies, and prompt engineering.",
    author: "Sarah Chen",
    date: "Oct 5, 2025",
    readTime: "12 min read",
    category: "Machine Learning",
  },
  {
    id: "2",
    title: "MLOps Pipeline Design: From Training to Production",
    excerpt:
      "End-to-end patterns for deploying machine learning models at scale. Includes monitoring, versioning, and continuous training strategies.",
    author: "Marcus Johnson",
    date: "Oct 3, 2025",
    readTime: "15 min read",
    category: "MLOps",
  },
  {
    id: "3",
    title: "Fine-Tuning LLMs: A Practical Engineering Guide",
    excerpt:
      "Learn the engineering fundamentals of fine-tuning large language models, from data preparation to deployment optimization.",
    author: "Alex Rivera",
    date: "Oct 1, 2025",
    readTime: "18 min read",
    category: "AI Engineering",
  },
];

export default function FeaturedGuides() {
  return (
    <section className="border-border bg-background border-b py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <h2 className="text-foreground mb-3 text-3xl font-bold md:text-4xl">Featured Guides</h2>
          <p className="text-muted-foreground text-lg">
            High-value content vetted by industry engineers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {mockGuides.map(guide => (
            <Link key={guide.id} href={`/guides/${guide.id}`} className="group block">
              <Card className="border-border bg-card h-full border p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-full flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                      {guide.category}
                    </Badge>
                    <div className="text-primary flex items-center gap-1 text-xs font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  <h3 className="text-foreground group-hover:text-primary text-xl leading-tight font-bold transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                    {guide.excerpt}
                  </p>

                  <div className="border-border space-y-2 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-foreground font-medium">{guide.author}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span>{guide.date}</span>
                      <span>·</span>
                      <span>{guide.readTime}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-primary text-sm font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/guides/list">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              View All Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
