"use client";

import React, { useState } from "react";
import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
  };

  return (
    <section className="border-border bg-background border-b py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Get the latest production-ready guides and AI/ML engineering insights delivered weekly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 text-base"
              required
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Subscribe
            </Button>
          </form>

          <p className="text-muted-foreground mt-4 text-sm">
            Join 10,000+ engineers. No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
