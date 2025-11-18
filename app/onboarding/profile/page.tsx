"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { Label } from "@/features/shared/ui/label";
import { Textarea } from "@/features/shared/ui/textarea";
import { Badge } from "@/features/shared/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import OnboardingHeader from "@/features/onboarding/components/OnboardingHeader";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";
import { useUser } from "@/features/auth/context/UserContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const focusAreas = [
  "LLMs",
  "MLOps",
  "Computer Vision",
  "NLP",
  "Data Engineering",
  "Deep Learning",
  "AI Infrastructure",
  "Model Deployment",
  "Vector Databases",
  "Prompt Engineering",
];

const creators = [
  { id: 1, name: "Sarah Chen", role: "ML Engineer @ Meta", avatar: "SC" },
  { id: 2, name: "Marcus Johnson", role: "AI Research Lead @ OpenAI", avatar: "MJ" },
  { id: 3, name: "Alex Rivera", role: "Senior Engineer @ Anthropic", avatar: "AR" },
  { id: 4, name: "Priya Patel", role: "MLOps Engineer @ Databricks", avatar: "PP" },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const { selectedRole, handleProfileSubmit, isLoading } = useOnboarding();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
    focusAreas: [] as string[],
    following: [] as number[],
  });

  useEffect(() => {
    if (user?.name) {
      setFormData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  useEffect(() => {
    if (!selectedRole) {
      router.push("/onboarding");
    }
  }, [selectedRole, router]);

  const handleFocusAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const handleCreatorToggle = (creatorId: number) => {
    setFormData(prev => ({
      ...prev,
      following: prev.following.includes(creatorId)
        ? prev.following.filter(id => id !== creatorId)
        : [...prev.following, creatorId],
    }));
  };

  const handleSubmit = () => {
    handleProfileSubmit(formData);
  };

  if (!selectedRole) {
    return <div>Loading...</div>;
  }

  return (
    <div className="from-background via-muted/20 to-background relative flex min-h-screen items-center justify-center bg-gradient-to-br p-6">
      <OnboardingHeader />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Let&apos;s set up your <span className="text-primary">profile</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {selectedRole === "creator"
              ? "Tell us about your expertise and interests"
              : "Help us personalize your experience"}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-card/50 border-border rounded-2xl border p-8 backdrop-blur-sm"
        >
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <Label htmlFor="name" className="text-base font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="text-base"
              />
            </div>

            {selectedRole === "creator" && (
              <div className="space-y-4">
                <Label htmlFor="bio" className="text-base font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your background and expertise..."
                  value={formData.bio}
                  onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="resize-none text-base"
                />
              </div>
            )}

            {/* Focus Areas */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                {selectedRole === "creator" ? "Areas of Focus" : "What do you want to learn about?"}
              </Label>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map(area => {
                  const isSelected = formData.focusAreas.includes(area);
                  return (
                    <motion.div key={area} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant={isSelected ? "default" : "outline"}
                        className={`cursor-pointer transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-primary/10 hover:text-primary"
                        }`}
                        onClick={() => handleFocusAreaToggle(area)}
                      >
                        {isSelected && <Check className="mr-1 h-3 w-3" />}
                        {area}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {selectedRole === "creator" && (
              <>
                {/* GitHub */}
                <div className="space-y-4">
                  <Label htmlFor="github" className="text-base font-medium">
                    GitHub (optional)
                  </Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={e => setFormData(prev => ({ ...prev, github: e.target.value }))}
                    className="text-base"
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-4">
                  <Label htmlFor="linkedin" className="text-base font-medium">
                    LinkedIn (optional)
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="text-base"
                  />
                </div>
              </>
            )}

            {selectedRole === "reader" && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Follow 3 creators (optional)</Label>
                <div className="grid gap-3">
                  {creators.map(creator => {
                    const isFollowing = formData.following.includes(creator.id);
                    return (
                      <motion.div
                        key={creator.id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                          isFollowing
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleCreatorToggle(creator.id)}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                            isFollowing
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {creator.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-foreground font-medium">{creator.name}</div>
                          <div className="text-muted-foreground text-sm">{creator.role}</div>
                        </div>
                        {isFollowing && <Check className="text-primary h-5 w-5" />}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button variant="outline" size="lg" onClick={() => router.back()} className="flex-1">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="flex-1"
              disabled={!formData.name.trim() || isLoading}
            >
              {isLoading
                ? "Saving..."
                : selectedRole === "creator"
                  ? "Go to Dashboard"
                  : "Start Exploring"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
