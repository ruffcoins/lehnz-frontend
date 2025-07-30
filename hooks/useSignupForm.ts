import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupSchema } from "@/lib/validators";
import { ROLES } from "@/lib/consts";

export type SignupRole = ROLES.CREATOR | ROLES.USER | "";

export function useSignupForm() {
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SignupRole>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedAiMlStack, setSelectedAiMlStack] = useState<string[]>([]);

  // Form instance
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const { handleSubmit, setValue, trigger, reset } = form;

  // Handle form submission
  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted:", data);
      // Here you would typically make an API call to create the user account
      
      alert("Account created successfully!");
      handleReset();
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error creating account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle role change
  const handleRoleChange = (role: ROLES.CREATOR | ROLES.USER) => {
    setSelectedRole(role);
    setValue("role", role);
    setCurrentStep(2);
    
    // Set tech stack arrays in form
    if (role === ROLES.CREATOR) {
      setValue("aiMlStack" as keyof SignupFormData, selectedAiMlStack as any);
    } else {
      setValue("techStack" as keyof SignupFormData, selectedTechStack as any);
    }
  };

  // Step navigation
  const nextStep = async () => {
    const fieldsToValidate = getFieldsToBeValidatedForStep(currentStep, selectedRole);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  // Reset form
  const handleReset = () => {
    reset();
    setSelectedRole("");
    setCurrentStep(1);
    setSelectedTechStack([]);
    setSelectedAiMlStack([]);
  };

  // Update tech stacks
  const updateTechStack = (tags: string[]) => {
    setSelectedTechStack(tags);
    setValue("techStack" as keyof SignupFormData, tags as any);
  };

  const updateAiMlStack = (tags: string[]) => {
    setSelectedAiMlStack(tags);
    setValue("aiMlStack" as keyof SignupFormData, tags as any);
  };

  return {
    // Form state
    form,
    isSubmitting,
    selectedRole,
    currentStep,
    selectedTechStack,
    selectedAiMlStack,
    
    // Actions
    onSubmit: handleSubmit(onSubmit),
    handleRoleChange,
    nextStep,
    prevStep,
    updateTechStack,
    updateAiMlStack,
    setValue,
  };
}

// Helper function to get fields for validation
function getFieldsToBeValidatedForStep(step: number, role: SignupRole) {
  switch (step) {
    case 2:
      return ["name", "email", "password"] as const;
    case 3:
      return role === ROLES.CREATOR
        ? ["currentIndustry", "aiMlStack"] as const
        : ["currentIndustry", "roleTitle", "techStack"] as const;
    default:
      return [];
  }
}