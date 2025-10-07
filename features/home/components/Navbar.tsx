"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/features/shared/ui/button";

export default function Navbar() {
  return (
    <nav className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-foreground text-xl font-bold">
              Pure Engineering
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/guides/list"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Guides
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Writers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
