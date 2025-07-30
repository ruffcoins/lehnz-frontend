"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignupForm } from "@/hooks/useSignupForm";
import ProgressIndicator from "@/components/signup/ProgressIndicator";
import RoleSelectionStep from "@/components/signup/RoleSelectionStep";
import BasicInfoStep from "@/components/signup/BasicInfoStep";
import ProfessionalInfoStep from "@/components/signup/ProfessionalInfoStep";
import FinalDetailsStep from "@/components/signup/FinalDetailsStep";

export default function SignUpPage() {
  const {
    form,
    isSubmitting,
    selectedRole,
    currentStep,
    selectedTechStack,
    selectedAiMlStack,
    onSubmit,
    handleRoleChange,
    nextStep,
    prevStep,
    updateTechStack,
    updateAiMlStack,
  } = useSignupForm();

  const { formState: { errors } } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Join Lehnz</CardTitle>
          <CardDescription>
            Create your account to start sharing and discovering AI/ML engineering content
          </CardDescription>
          
          <ProgressIndicator currentStep={currentStep} />
        </CardHeader>
        
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Step 1: Role Selection */}
            {currentStep === 1 && (
              <RoleSelectionStep
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
                error={errors.role?.message}
              />
            )}

            {/* Step 2: Basic Information */}
            {currentStep === 2 && (
              <BasicInfoStep
                form={form}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Step 3: Professional Information */}
            {currentStep === 3 && (
              <ProfessionalInfoStep
                form={form}
                selectedRole={selectedRole}
                selectedTechStack={selectedTechStack}
                selectedAiMlStack={selectedAiMlStack}
                onUpdateTechStack={updateTechStack}
                onUpdateAiMlStack={updateAiMlStack}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <FinalDetailsStep
                form={form}
                isSubmitting={isSubmitting}
                onPrev={prevStep}
              />
            )}
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}