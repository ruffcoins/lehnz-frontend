"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, FileText, Code } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const steps = [
  {
    id: 1,
    title: "Problem & Overview",
    description: "Explain the problem and provide context",
    icon: FileText,
  },
  {
    id: 2,
    title: "Technical Solution",
    description: "Detail the implementation and code",
    icon: Code,
  },
];

export default function StepProgress({ currentStep, onStepClick }: StepProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isClickable = onStepClick && (isCompleted || isCurrent);

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step Circle */}
              <motion.div
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                onClick={isClickable ? () => onStepClick(step.id) : undefined}
                style={{ cursor: isClickable ? "pointer" : "default" }}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </motion.div>

              {/* Step Info */}
              <div className="ml-3 flex-1">
                <h3
                  className={`text-sm font-medium ${
                    isCurrent
                      ? "text-foreground"
                      : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="mx-4 flex-1">
                  <div className="bg-border relative h-px">
                    <motion.div
                      className="bg-primary absolute top-0 left-0 h-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? "100%" : currentStep > step.id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
