"use client";
import { useState, useEffect } from "react";

import { useCreateGuide } from "@/features/guides/hooks/useCreateGuide";
import GuideHeader from "@/features/guides/components/GuideHeader";
import StepProgress from "@/features/shared/ui/StepProgress";
import TipTapEditor from "@/features/guides/components/editor/TipTapEditor";
import PreviewModal from "@/features/guides/components/PreviewModal";
import { Input } from "@/features/shared/ui/input";
import { Button } from "@/features/shared/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function CreateGuide() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [authorName] = useState("Anthony Chukwuejukwu");
  const [step1Content, setStep1Content] = useState("");
  const [step2Content, setStep2Content] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  // Publish mutation using our updated API
  const publishMutation = useCreateGuide({
    onSuccess: () => {
      toast.success("Guide published successfully!");
      router.push("/"); // Redirect to home page after successful creation
    },
    onError: error => {
      toast.error("Failed to publish guide");
      console.error("Publish error:", error);
    },
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Publish the guide using our new API
      const publishData = {
        title: title || "Untitled Guide",
        description: subtitle || "No description provided",
        tags: ["guide"], // You can make this dynamic based on user input
        category: "general", // You can make this dynamic based on user input
        overview: step1Content,
        implementation: step2Content,
        authorId: "user-123", // Replace with actual user ID from auth
        isPublished: true,
        isPublic: true,
      };

      publishMutation.mutate(publishData);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  // Debug effect for content changes
  useEffect(() => {
    console.log("step1Content", step1Content);
    console.log("step2Content", step2Content);
  }, [step1Content, step2Content]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <div className="animate-pulse">
  //         <div className="h-16 bg-muted border-b"></div>
  //         <div className="max-w-4xl mx-auto px-6 py-8">
  //           <div className="h-8 bg-muted rounded mb-4"></div>
  //           <div className="h-4 bg-muted rounded mb-8"></div>
  //           <div className="h-96 bg-muted rounded"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-background min-h-screen">
      <GuideHeader
        onBack={() => router.push("/")}
        onPreview={handlePreview}
        onContinue={handleNextStep}
        currentStep={currentStep}
      />

      <StepProgress currentStep={currentStep} />

      <main className="mx-auto max-w-4xl px-6 pb-12">
        {/* Title Section */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="placeholder-substack-placeholder mb-4 w-full border-none bg-transparent px-0 font-serif text-4xl font-bold text-black shadow-none outline-none focus-visible:ring-0"
          />
          <Input
            type="text"
            placeholder="Add a subtitle..."
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            className="text-substack-placeholder mb-6 w-full border-none bg-transparent px-0 font-serif text-xl shadow-none outline-none focus-visible:ring-0"
          />

          {/* Author Tag */}
          <div className="mb-8 flex items-center space-x-2">
            <div className="bg-substack-grey flex items-center space-x-2 rounded-full px-3 py-1">
              <span className="text-sm text-gray-700">{authorName}</span>
            </div>
          </div>
        </div>

        {/* Editor */}
        <TipTapEditor
          content={currentStep === 1 ? step1Content : step2Content}
          onChange={content => {
            if (currentStep === 1) {
              setStep1Content(content);
            } else {
              setStep2Content(content);
            }
          }}
          step={currentStep}
          placeholder={
            currentStep === 1
              ? "Start writing about the problem you're solving..."
              : "Now let's add the code implementation..."
          }
        />

        {/* Action Buttons */}
        <div className="border-substack-border mt-12 flex items-center justify-between border-t pt-8">
          <div className="text-sm text-gray-600">Create your guide step by step</div>

          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button variant="ghost" onClick={handlePreviousStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              className="bg-orange-600 text-white hover:bg-orange-600"
            >
              <span>{currentStep === 1 ? "Continue to Code" : "Publish Guide"}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        guide={{
          title,
          subtitle,
          authorName,
          step1Content,
          step2Content,
          currentStep,
          isDraft: true,
        }}
      />
    </div>
  );
}
