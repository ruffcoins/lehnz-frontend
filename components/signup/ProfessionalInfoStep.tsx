import { ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagInput from "@/components/ui/TagInput";
import { FormField } from "@/components/ui/FormField";
import { SignupFormData } from "@/lib/validators";
import { INDUSTRIES, AI_ML_TECHNOLOGIES, GENERAL_TECHNOLOGIES, ROLES } from "@/lib/consts";
import { SignupRole } from "@/hooks/useSignupForm";

interface ProfessionalInfoStepProps {
  form: UseFormReturn<SignupFormData>;
  selectedRole: SignupRole;
  selectedTechStack: string[];
  selectedAiMlStack: string[];
  onUpdateTechStack: (tags: string[]) => void;
  onUpdateAiMlStack: (tags: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ProfessionalInfoStep({
  form,
  selectedRole,
  selectedTechStack,
  selectedAiMlStack,
  onUpdateTechStack,
  onUpdateAiMlStack,
  onNext,
  onPrev,
}: ProfessionalInfoStepProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="animate-in slide-in-from-right-5 space-y-4 duration-300">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">Professional Details</h3>
        <p className="text-muted-foreground text-sm">
          Help us understand your background as a {selectedRole}
        </p>
      </div>

      <FormField label="Current Industry *" error={errors.currentIndustry?.message}>
        <Select onValueChange={value => setValue("currentIndustry", value)}>
          <SelectTrigger className={errors.currentIndustry ? "border-destructive" : ""}>
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map(industry => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      {selectedRole === ROLES.CREATOR ? (
        <FormField label="Preferred AI/ML Technologies *" error={errors.aiMlStack?.message}>
          <TagInput
            options={AI_ML_TECHNOLOGIES}
            value={selectedAiMlStack}
            onChange={onUpdateAiMlStack}
            placeholder="Start typing to add AI/ML technologies..."
            error={errors.aiMlStack?.message}
          />
        </FormField>
      ) : (
        <>
          <FormField label="Job Title / Role *" error={errors.roleTitle?.message}>
            <Input
              {...register("roleTitle" as keyof SignupFormData)}
              placeholder="e.g., Data Scientist, Software Engineer, Student"
              className={errors.roleTitle ? "border-destructive" : ""}
            />
          </FormField>

          <FormField label="Tech Stack *" error={errors.techStack?.message}>
            <TagInput
              options={GENERAL_TECHNOLOGIES}
              value={selectedTechStack}
              onChange={onUpdateTechStack}
              placeholder="Start typing to add technologies..."
              error={errors.techStack?.message}
            />
          </FormField>
        </>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          Continue <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
