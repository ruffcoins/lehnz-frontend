"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { Clock, User } from "lucide-react";
import { useGuides } from "../hooks/useGuides";
import Link from "next/link";

export function RecentlyPublishedSidebar() {
  const { data, isLoading } = useGuides({ sort: "newest", limit: 4 });

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Recently Published</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="border-border animate-pulse border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="bg-muted mb-2 h-4 w-3/4 rounded" />
              <div className="bg-muted h-3 w-1/2 rounded" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Clock className="text-primary h-5 w-5" />
          Recently Published
        </h3>
        <div className="space-y-4">
          {data?.guides.slice(0, 4).map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/guide/${guide.slug}`}
                className="border-border block border-b pb-4 transition-opacity last:border-0 last:pb-0 hover:opacity-70"
              >
                <Badge variant="outline" className="mb-2 text-xs">
                  {guide.category}
                </Badge>
                <h4 className="text-foreground mb-2 line-clamp-2 text-sm font-medium">
                  {guide.title}
                </h4>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <User className="h-3 w-3" />
                  <span>{guide.author.name}</span>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
