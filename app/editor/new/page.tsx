"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/features/shared/ui/button";
import { Card } from "@/features/shared/ui/card";
import { Input } from "@/features/shared/ui/input";
import { Label } from "@/features/shared/ui/label";
import { Textarea } from "@/features/shared/ui/textarea";
import { Badge } from "@/features/shared/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/shared/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Eye,
  Globe,
  Lock,
  FileText,
  X,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import TipTapEditor from "@/features/guides/components/editor/TipTapEditor";
import StepProgress from "@/features/guides/components/StepProgress";
import { toast } from "sonner";

// Available tags for AI/ML engineering
const AVAILABLE_TAGS = [
  "LLMs",
  "MLOps",
  "NLP",
  "Computer Vision",
  "Data Engineering",
  "Deep Learning",
  "Machine Learning",
  "AI Engineering",
  "Neural Networks",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "CI/CD",
  "Model Deployment",
  "Data Pipeline",
  "Feature Engineering",
  "Model Evaluation",
  "Hyperparameter Tuning",
  "Production",
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public", icon: Globe, description: "Anyone can view" },
  { value: "draft", label: "Draft", icon: FileText, description: "Only you can view" },
  { value: "private", label: "Private", icon: Lock, description: "Private to you" },
];

interface GuideData {
  title: string;
  description: string;
  problemOverview: string;
  technicalSolution: string;
  tags: string[];
  visibility: "public" | "draft" | "private";
}

export default function GuideEditorPage() {
  const router = useRouter();
  const [guideData, setGuideData] = useState<GuideData>({
    title: "",
    description: "",
    problemOverview: "",
    technicalSolution: "",
    tags: [],
    visibility: "draft",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("guide-draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setGuideData(draft);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (guideData.title || guideData.problemOverview || guideData.technicalSolution) {
      localStorage.setItem("guide-draft", JSON.stringify(guideData));
      setHasUnsavedChanges(true);
    }
  }, [guideData]);

  const handleInputChange = (field: keyof GuideData, value: string | string[]) => {
    setGuideData((prev: GuideData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !guideData.tags.includes(tag)) {
      handleInputChange("tags", [...guideData.tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      guideData.tags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(guideData.title?.trim() && guideData.description?.trim());
      case 2:
        return !!(guideData.problemOverview?.trim() && guideData.technicalSolution?.trim());
      default:
        return false;
    }
  };

  const canProceedToNextStep = (): boolean => {
    return validateStep(currentStep);
  };

  const handleNextStep = () => {
    if (canProceedToNextStep() && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Allow navigation to previous steps if they're completed
    if (step <= currentStep || validateStep(step - 1)) {
      setCurrentStep(step);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.removeItem("guide-draft");
      setHasUnsavedChanges(false);
      toast.success("Guide saved successfully!");
    } catch (error: unknown) {
      toast.error(
        "Failed to save guide: " + (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (
      !guideData.title.trim() ||
      !guideData.problemOverview.trim() ||
      !guideData.technicalSolution.trim()
    ) {
      toast.error("Please complete all steps before publishing");
      return;
    }

    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.removeItem("guide-draft");
      setHasUnsavedChanges(false);

      // Generate a slug from the title
      const slug = guideData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      toast.success("Guide published successfully!");
      router.push(`/guide/${slug}`);
    } catch (error: unknown) {
      toast.error(
        "Failed to publish guide: " + (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsSaving(false);
      setShowPublishModal(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Guide Editor</h1>
                {hasUnsavedChanges && (
                  <p className="text-muted-foreground flex items-center gap-1 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    Unsaved changes
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>

              {currentStep === 2 && (
                <Button
                  size="sm"
                  onClick={() => setShowPublishModal(true)}
                  disabled={isSaving || !canProceedToNextStep()}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress */}
      <div className="border-border bg-muted/30 border-b">
        <div className="container mx-auto max-w-4xl px-6 py-6">
          <StepProgress currentStep={currentStep} onStepClick={handleStepClick} />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step 1: Problem & Overview */}
            {currentStep === 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>

                    <div className="space-y-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Building Production-Ready RAG Systems"
                          value={guideData.title}
                          onChange={e => handleInputChange("title", e.target.value)}
                          className="text-lg"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of what readers will learn..."
                          value={guideData.description}
                          onChange={e => handleInputChange("description", e.target.value)}
                          rows={3}
                        />
                      </div>

                      {/* Tags */}
                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {guideData.tags.map((tag: string) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => handleRemoveTag(tag)}
                              >
                                {tag}
                                <X className="ml-1 h-3 w-3" />
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Select onValueChange={handleAddTag}>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Add tag..." />
                              </SelectTrigger>
                              <SelectContent>
                                {AVAILABLE_TAGS.filter(
                                  (tag: string) => !guideData.tags.includes(tag)
                                ).map((tag: string) => (
                                  <SelectItem key={tag} value={tag}>
                                    {tag}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Input
                              placeholder="Custom tag..."
                              value={newTag}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setNewTag(e.target.value)
                              }
                              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                  handleAddTag(newTag);
                                  setNewTag("");
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Visibility */}
                      <div className="space-y-2">
                        <Label>Visibility</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {VISIBILITY_OPTIONS.map(
                            (option: {
                              value: string;
                              label: string;
                              icon: React.ElementType;
                              description: string;
                            }) => {
                              const Icon = option.icon;
                              return (
                                <div
                                  key={option.value}
                                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                                    guideData.visibility === option.value
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                  onClick={() => handleInputChange("visibility", option.value)}
                                >
                                  <div className="mb-1 flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm font-medium">{option.label}</span>
                                  </div>
                                  <p className="text-muted-foreground text-xs">
                                    {option.description}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Problem & Overview</h2>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Explain the problem you&apos;re solving and provide context. What challenges
                      does this guide address?
                    </p>
                    <TipTapEditor
                      content={guideData.problemOverview}
                      onChange={(content: string) => handleInputChange("problemOverview", content)}
                      step={1}
                      placeholder="Describe the problem, provide context, and explain why this solution matters. Use headings, lists, and formatting to make it clear and engaging..."
                    />
                  </Card>
                </motion.div>
              </>
            )}

            {/* Step 2: Technical Solution */}
            {currentStep === 2 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">Technical Solution</h2>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Detail the implementation, provide code examples, and walk through the
                      solution step by step.
                    </p>
                    <TipTapEditor
                      content={guideData.technicalSolution}
                      onChange={(content: string) =>
                        handleInputChange("technicalSolution", content)
                      }
                      step={2}
                      placeholder="Provide detailed technical implementation, code examples, and step-by-step instructions. Use code blocks for syntax highlighting..."
                    />
                  </Card>
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-between pt-8"
        >
          <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStep === 1 && (
              <Button onClick={handleNextStep} disabled={!canProceedToNextStep()}>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Publish Confirmation Modal */}
      <AnimatePresence>
        {showPublishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowPublishModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background border-border w-full max-w-md rounded-lg border p-6"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <h3 className="mb-4 text-lg font-semibold">Publish Guide</h3>
              <p className="text-muted-foreground mb-6">
                Are you ready to publish &quot;{guideData.title || "Untitled Guide"}&quot;? This
                will make it visible to other users.
              </p>
              <div className="bg-muted/50 mb-6 rounded-lg p-4">
                <h4 className="mb-2 text-sm font-medium">Guide Structure:</h4>
                <div className="text-muted-foreground space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Problem & Overview ({guideData.problemOverview ? "✓" : "✗"})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Technical Solution ({guideData.technicalSolution ? "✓" : "✗"})</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPublishModal(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handlePublish} disabled={isSaving}>
                  {isSaving ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
