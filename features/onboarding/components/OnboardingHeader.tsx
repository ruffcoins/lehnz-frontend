"use client";

import React from "react";
import Link from "next/link";

export default function OnboardingHeader() {
  return (
    <header className="absolute top-0 right-0 left-0 z-50">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <Link href="/" className="inline-block">
          <h1 className="text-foreground text-2xl font-bold">Pure Engineering</h1>
        </Link>
      </div>
    </header>
  );
}
