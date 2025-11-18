"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { User, Clock, Sparkles } from "lucide-react";
import { useGuides } from "../hooks/useGuides";
import Link from "next/link";
import { Guide } from "../types";

interface SuggestedGuidesProps {
  currentGuideId: string;
  tags: string[];
}

export function SuggestedGuides({ currentGuideId, tags }: SuggestedGuidesProps) {
  const { data, isLoading } = useGuides({ limit: 3 });

  // Filter out current guide and get guides with similar tags
  const suggestedGuides =
    data?.guides.filter(guide => guide.id !== currentGuideId).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
          <Sparkles className="text-primary h-6 w-6" />
          More Like This
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse p-6">
              <div className="bg-muted mb-3 h-5 w-20 rounded" />
              <div className="bg-muted mb-2 h-6 rounded" />
              <div className="bg-muted mb-4 h-6 w-3/4 rounded" />
              <div className="bg-muted h-4 w-1/2 rounded" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (suggestedGuides.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
        <Sparkles className="text-primary h-6 w-6" />
        More Like This
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {suggestedGuides.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/guide/${guide.slug}`}>
              <Card className="group h-full cursor-pointer p-6 transition-all hover:shadow-lg">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 mb-3"
                >
                  {guide.category}
                </Badge>
                <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{guide.excerpt}</p>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{guide.author.name}</span>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>{guide.readTime}</span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
