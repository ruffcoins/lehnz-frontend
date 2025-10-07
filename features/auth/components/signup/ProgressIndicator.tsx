import { CheckCircle } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressIndicator({ currentStep, totalSteps = 4 }: ProgressIndicatorProps) {
  return (
    <div className="mt-6 flex justify-center">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          // const isPending = step > currentStep;

          return (
            <div key={step} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                      ? "bg-primary text-primary-foreground ring-primary/20 ring-2"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < totalSteps && (
                <div
                  className={`h-0.5 w-8 transition-colors duration-300 ${
                    isCompleted ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
