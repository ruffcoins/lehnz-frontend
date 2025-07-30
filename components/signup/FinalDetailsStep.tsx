import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/common/FormField";
import { SignupFormData } from "@/lib/validators";

interface FinalDetailsStepProps {
  form: UseFormReturn<SignupFormData>;
  isSubmitting: boolean;
  onPrev: () => void;
}

export default function FinalDetailsStep({ 
  form, 
  isSubmitting, 
  onPrev 
}: FinalDetailsStepProps) {
  const { register } = form;

  return (
    <div className="space-y-4 animate-in slide-in-from-right-5 duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Almost Done!</h3>
        <p className="text-sm text-muted-foreground">
          Add any additional information (optional)
        </p>
      </div>

      <FormField label="Notable Projects (Optional)">
        <Textarea
          {...register("notableProjects")}
          placeholder="Tell us about any interesting projects you've worked on..."
          rows={3}
        />
        <p className="text-xs text-muted-foreground mt-1">
          This helps other community members discover your work
        </p>
      </FormField>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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