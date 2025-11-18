"use client";

import React from "react";
import { useUser } from "@/features/auth/context/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/features/shared/ui/button";
import { Plus, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/onboarding");
  //   } else if (!isLoading && user && user.role !== "creator") {
  //     router.push("/explore");
  //   }
  // }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // if (!user || user.role !== "creator") {
  //   return null;
  // }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Welcome back, {user?.name ?? "Anthony"}!
          </h1>
          <p className="text-muted-foreground">Ready to share your AI/ML engineering insights?</p>
        </div>

        {/* Empty State for First-Time Creators */}
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <FileText className="text-primary h-10 w-10" />
              </div>
              <h2 className="text-foreground mb-4 text-3xl font-bold">
                Welcome to your engineering lab.
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Document your process and share your first AI/ML guide.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="px-8 py-3 text-lg"
                onClick={() => router.push("/editor/new")}
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Guide
              </Button>
            </motion.div>

            <div className="text-muted-foreground mt-8 text-sm">
              <p>Share your expertise in AI/ML, MLOps, NLP, Computer Vision, or Data Engineering</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
