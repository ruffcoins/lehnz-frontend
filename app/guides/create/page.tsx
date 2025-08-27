"use client"
import { useState, useEffect } from "react";

import { useCreateGuide } from "@/hooks/useCreateGuide";
import GuideHeader from "@/components/GuideHeader";
import StepProgress from "@/components/StepProgress";
import TipTapEditor from "@/components/editor/TipTapEditor";
import PreviewModal from "@/components/PreviewModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    onError: (error) => {
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
    <div className="min-h-screen bg-background">
      <GuideHeader
        onBack={() => router.push("/")}
        onPreview={handlePreview}
        onContinue={handleNextStep}
        currentStep={currentStep}
      />

      <StepProgress currentStep={currentStep} />

      <main className="max-w-4xl mx-auto px-6 pb-12">
        {/* Title Section */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-serif font-bold text-black placeholder-substack-placeholder bg-transparent border-none outline-none shadow-none px-0 mb-4 focus-visible:ring-0"
          />
          <Input
            type="text"
            placeholder="Add a subtitle..."
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full text-xl font-serif text-substack-placeholder bg-transparent border-none outline-none shadow-none px-0 mb-6 focus-visible:ring-0"
          />

          {/* Author Tag */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="bg-substack-grey px-3 py-1 rounded-full flex items-center space-x-2">
              <span className="text-sm text-gray-700">{authorName}</span>
            </div>
          </div>
        </div>

        {/* Editor */}
        <TipTapEditor
          content={currentStep === 1 ? step1Content : step2Content}
          onChange={(content) => {
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
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-substack-border">
          <div className="text-sm text-gray-600">
            Create your guide step by step
          </div>

          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button variant="ghost" onClick={handlePreviousStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Step
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              className="bg-orange-600 hover:bg-orange-600 text-white"
            >
              <span>{currentStep === 1 ? "Continue to Code" : "Publish Guide"}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
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
