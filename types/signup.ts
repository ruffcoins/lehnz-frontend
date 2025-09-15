// Additional types for signup components
export interface StepProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export interface FormStepProps extends StepProps {
  error?: string;
}

export const SIGNUP_STEPS = {
  ROLE_SELECTION: 1,
  BASIC_INFO: 2,
  PROFESSIONAL_INFO: 3,
  FINAL_DETAILS: 4,
} as const;

export type SignupStep = (typeof SIGNUP_STEPS)[keyof typeof SIGNUP_STEPS];
