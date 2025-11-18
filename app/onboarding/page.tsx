"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/features/shared/ui/button";
import { Brain, BookOpen, ArrowRight, Check } from "lucide-react";
import OnboardingHeader from "@/features/onboarding/components/OnboardingHeader";
import { useOnboarding } from "@/features/onboarding/hooks/useOnboarding";

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

export default function RoleSelectionPage() {
  const { selectedRole, handleRoleSelect, handleRoleSubmit } = useOnboarding();

  const roles = [
    {
      id: "creator" as const,
      title: "I want to publish AI/ML guides",
      description: "Document your process, share insights, and grow your technical audience.",
      icon: Brain,
      color: "primary",
      features: [
        "Write and publish technical guides",
        "Build your engineering audience",
        "Share real-world AI/ML insights",
        "Connect with fellow practitioners",
      ],
    },
    {
      id: "reader" as const,
      title: "I want to read and explore",
      description: "Discover reproducible engineering breakdowns by practitioners.",
      icon: BookOpen,
      color: "secondary",
      features: [
        "Access production-ready guides",
        "Learn from industry experts",
        "Follow your favorite creators",
        "Stay updated with AI/ML trends",
      ],
    },
  ];

  return (
    <div className="from-background via-muted/20 to-background relative flex min-h-screen items-center justify-center bg-gradient-to-br p-6">
      <OnboardingHeader />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Choose your <span className="text-primary">journey</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            How do you want to use Pure Engineering?
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {roles.map(role => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <motion.div key={role.id} variants={itemVariants}>
                <div
                  onClick={() => handleRoleSelect(role.id)}
                  className={`group bg-card/50 cursor-pointer rounded-2xl border-2 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${
                    isSelected
                      ? `border-${role.color} bg-${role.color}/5`
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                        role.color === "primary"
                          ? "bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground"
                          : "bg-secondary/10 group-hover:bg-secondary group-hover:text-secondary-foreground"
                      } transition-colors`}
                    >
                      <Icon
                        className={`h-8 w-8 ${
                          role.color === "primary"
                            ? "text-primary group-hover:text-primary-foreground"
                            : "text-secondary group-hover:text-secondary-foreground"
                        } transition-colors`}
                      />
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    )}
                  </div>

                  <h2 className="text-foreground mb-4 text-2xl font-bold">{role.title}</h2>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{role.description}</p>

                  <div className="space-y-3">
                    {role.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            role.color === "primary" ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <Button
            onClick={handleRoleSubmit}
            disabled={!selectedRole}
            size="lg"
            className="min-w-[200px]"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-muted-foreground mt-4 text-sm">
            You can always change your role later in settings
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
