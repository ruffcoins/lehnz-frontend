import { ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupFormData } from "@/lib/validators";
import { FormField } from "@/components/ui/FormField";

interface BasicInfoStepProps {
  form: UseFormReturn<SignupFormData>;
  onNext: () => void;
  onPrev: () => void;
}

export default function BasicInfoStep({ form, onNext, onPrev }: BasicInfoStepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
        <p className="text-sm text-muted-foreground">
          Tell us a bit about yourself
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Full Name *"
          error={errors.name?.message}
        >
          <Input
            {...register("name")}
            placeholder="Enter your full name"
            className={errors.name ? "border-destructive" : ""}
          />
        </FormField>

        <FormField
          label="Email Address *"
          error={errors.email?.message}
        >
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={errors.email ? "border-destructive" : ""}
          />
        </FormField>
      </div>

      <FormField
        label="Password *"
        error={errors.password?.message}
      >
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
          Continue <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}