import { SignupRole } from "@/features/auth/hooks/useSignupForm";
import { ROLES } from "@/features/shared/utils/consts";
import { SignupFormData } from "./validators";

/**
 * Utility functions for signup form
 */

export function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Choose Your Role";
    case 2:
      return "Basic Information";
    case 3:
      return "Professional Details";
    case 4:
      return "Final Details";
    default:
      return "Sign Up";
  }
}

export function getStepDescription(step: number, role?: string): string {
  switch (step) {
    case 1:
      return "This helps us personalize your experience";
    case 2:
      return "Tell us a bit about yourself";
    case 3:
      return `Help us understand your background as a ${role}`;
    case 4:
      return "Add any additional information (optional)";
    default:
      return "";
  }
}

export function validateStepCompletion(
  step: number,
  data: SignupFormData,
  role: SignupRole
): boolean {
  switch (step) {
    case 1:
      return Boolean((role && role === ROLES.CREATOR) || role === ROLES.USER);
    case 2:
      return Boolean(data.name && data.email && data.password);
    case 3:
      if (role === ROLES.CREATOR) {
        return Boolean(data.currentIndustry && data.aiMlStack && data.aiMlStack?.length > 0);
      } else {
        return Boolean(
          data.currentIndustry && data.roleTitle && data.techStack && data.techStack?.length > 0
        );
      }
    case 4:
      return true; // Final step, all previous validations passed
    default:
      return false;
  }
}
