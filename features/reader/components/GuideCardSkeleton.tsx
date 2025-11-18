"use client";

import React from "react";
import { Card } from "@/features/shared/ui/card";

export function GuideCardSkeleton() {
  return (
    <Card className="flex h-full animate-pulse flex-col p-6">
      {/* Category Badge */}
      <div className="mb-3">
        <div className="bg-muted h-5 w-20 rounded-full" />
      </div>

      {/* Title */}
      <div className="mb-2 space-y-2">
        <div className="bg-muted h-6 w-full rounded" />
        <div className="bg-muted h-6 w-3/4 rounded" />
      </div>

      {/* Excerpt */}
      <div className="mb-4 space-y-2">
        <div className="bg-muted h-4 w-full rounded" />
        <div className="bg-muted h-4 w-2/3 rounded" />
      </div>

      {/* Author & Meta */}
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-muted h-4 w-4 rounded" />
        <div className="bg-muted h-4 w-24 rounded" />
        <div className="bg-muted h-4 w-4 rounded" />
        <div className="bg-muted h-4 w-20 rounded" />
      </div>

      {/* Tags */}
      <div className="mb-4 flex gap-2">
        <div className="bg-muted h-5 w-16 rounded-full" />
        <div className="bg-muted h-5 w-20 rounded-full" />
        <div className="bg-muted h-5 w-14 rounded-full" />
      </div>

      {/* Stats */}
      <div className="border-border mt-auto flex items-center justify-between border-t pt-4">
        <div className="flex gap-4">
          <div className="bg-muted h-4 w-16 rounded" />
          <div className="bg-muted h-4 w-12 rounded" />
        </div>
        <div className="bg-muted h-8 w-8 rounded" />
      </div>
    </Card>
  );
}
