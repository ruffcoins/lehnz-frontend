"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/features/shared/ui/button";
import { Bookmark, Share2, UserPlus, Heart } from "lucide-react";
import { toast } from "sonner";

interface FloatingActionsProps {
  guideId: string;
  authorId: string;
  isBookmarked?: boolean;
  isFollowing?: boolean;
  isLiked?: boolean;
  onBookmark?: (bookmarked: boolean) => void;
  onFollow?: (following: boolean) => void;
  onLike?: (liked: boolean) => void;
}

export function FloatingActions({
  guideId,
  authorId,
  isBookmarked: initialBookmarked = false,
  isFollowing: initialFollowing = false,
  isLiked: initialLiked = false,
  onBookmark,
  onFollow,
  onLike,
}: FloatingActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onBookmark?.(newState);
    toast.success(newState ? "Added to reading list" : "Removed from reading list");
  };

  const handleFollow = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    onFollow?.(newState);
    toast.success(newState ? "Following author" : "Unfollowed author");
  };

  const handleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    onLike?.(newState);
    toast.success(newState ? "Liked!" : "Like removed");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this guide",
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 hidden flex-col gap-2 lg:flex"
    >
      <Button
        variant={isLiked ? "default" : "outline"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={handleLike}
        title="Like this guide"
      >
        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
      </Button>

      <Button
        variant={isBookmarked ? "default" : "outline"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={handleBookmark}
        title="Save to reading list"
      >
        <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
      </Button>

      <Button
        variant={isFollowing ? "default" : "outline"}
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={handleFollow}
        title="Follow author"
      >
        <UserPlus className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12 rounded-full"
        onClick={handleShare}
        title="Share guide"
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}
