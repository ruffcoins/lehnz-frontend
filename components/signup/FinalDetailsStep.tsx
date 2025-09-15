import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/FormField";
import { SignupFormData } from "@/lib/validators";

interface FinalDetailsStepProps {
  form: UseFormReturn<SignupFormData>;
  isSubmitting: boolean;
  onPrev: () => void;
}

export default function FinalDetailsStep({ form, isSubmitting, onPrev }: FinalDetailsStepProps) {
  const { register } = form;

  return (
    <div className="animate-in slide-in-from-right-5 space-y-4 duration-300">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">Almost Done!</h3>
        <p className="text-muted-foreground text-sm">Add any additional information (optional)</p>
      </div>

      <FormField label="Notable Projects (Optional)">
        <Textarea
          {...register("notableProjects")}
          placeholder="Tell us about any interesting projects you've worked on..."
          rows={3}
        />
        <p className="text-muted-foreground mt-1 text-xs">
          This helps other community members discover your work
        </p>
      </FormField>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </div>
  );
}
