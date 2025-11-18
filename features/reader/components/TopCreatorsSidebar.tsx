"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/features/shared/ui/card";
import { Button } from "@/features/shared/ui/button";
import { User, Users, FileText } from "lucide-react";
import { useTopCreators } from "../hooks/useTopCreators";
import { useFollowAuthor } from "../hooks/useGuides";

export function TopCreatorsSidebar() {
  const { data: creators, isLoading } = useTopCreators(5);
  const followMutation = useFollowAuthor();

  const handleFollow = (creatorId: string, isFollowing: boolean) => {
    followMutation.mutate({ authorId: creatorId, following: !isFollowing });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Top Creators</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex animate-pulse items-start gap-3">
              <div className="bg-muted h-10 w-10 rounded-full" />
              <div className="flex-1">
                <div className="bg-muted mb-2 h-4 w-3/4 rounded" />
                <div className="bg-muted h-3 w-1/2 rounded" />
              </div>
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
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Users className="text-primary h-5 w-5" />
          Top Creators
        </h3>
        <div className="space-y-4">
          {creators?.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-border flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                <User className="text-primary h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-foreground truncate text-sm font-medium">{creator.name}</h4>
                <p className="text-muted-foreground mb-2 line-clamp-1 text-xs">{creator.bio}</p>
                <div className="text-muted-foreground mb-2 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{creator.stats.guides} guides</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{creator.stats.followers.toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={creator.isFollowing ? "secondary" : "default"}
                  className="h-7 w-full text-xs"
                  onClick={() => handleFollow(creator.id, creator.isFollowing || false)}
                  disabled={followMutation.isPending}
                >
                  {creator.isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
