import { ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/features/shared/ui/button";
import { Input } from "@/features/shared/ui/input";
import { SignupFormData } from "@/features/auth/utils/validators";
import { FormField } from "@/features/shared/ui/FormField";

interface BasicInfoStepProps {
  form: UseFormReturn<SignupFormData>;
  onNext: () => void;
  onPrev: () => void;
}

export default function BasicInfoStep({ form, onNext, onPrev }: BasicInfoStepProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="animate-in slide-in-from-right-5 space-y-4 duration-300">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">Basic Information</h3>
        <p className="text-muted-foreground text-sm">Tell us a bit about yourself</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Full Name *" error={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder="Enter your full name"
            className={errors.name ? "border-destructive" : ""}
          />
        </FormField>

        <FormField label="Email Address *" error={errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={errors.email ? "border-destructive" : ""}
          />
        </FormField>
      </div>

      <FormField label="Password *" error={errors.password?.message}>
        <Input
          type="password"
          {...register("password")}
          placeholder="Create a secure password (min. 6 characters)"
          className={errors.password ? "border-destructive" : ""}
        />
      </FormField>

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
