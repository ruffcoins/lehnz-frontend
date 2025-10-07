"use client";

import React from "react";
import { Button } from "@/features/shared/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-border bg-background relative overflow-hidden border-b py-20 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="border-primary/20 bg-primary/5 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            <span>Verified by Industry Engineers</span>
          </div>

          <h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            The Gold Standard of <span className="text-primary">AI Engineering</span>
          </h1>

          <p className="text-muted-foreground mb-10 max-w-3xl text-lg leading-relaxed md:text-xl">
            Guides, patterns, and architectures vetted by industry engineers — build the right way,
            every time.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/guides/list">
              <Button size="lg" className="min-w-[200px] text-base">
                Explore Guides
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" variant="outline" className="min-w-[200px] text-base">
                Submit a Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
