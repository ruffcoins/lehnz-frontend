"use client";

import React from "react";
import { Button } from "@/features/shared/ui/button";
import Link from "next/link";
import { FileEdit } from "lucide-react";

export default function CTASection() {
  return (
    <section className="border-border bg-muted/30 border-b py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="border-border bg-background rounded-lg border px-8 py-12 text-center md:px-12 md:py-16">
          <div className="bg-primary/10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <FileEdit className="text-primary h-8 w-8" />
          </div>

          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Want to Define the Standard?
          </h2>

          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Join our network of engineers writing production-grade AI/ML guides. Share your
            expertise and help establish industry best practices.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/create">
              <Button size="lg" className="min-w-[200px]">
                Apply to Publish
              </Button>
            </Link>
            <Link href="#guidelines">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                View Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
