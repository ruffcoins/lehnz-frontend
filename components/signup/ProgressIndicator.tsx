import { CheckCircle } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressIndicator({ 
  currentStep, 
  totalSteps = 4 
}: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          // const isPending = step > currentStep;

          return (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                isCompleted
                  ? "bg-primary text-primary-foreground" 
                  : isCurrent
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/20" 
                    : "bg-muted text-muted-foreground"
              }`}>
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              {step < totalSteps && (
                <div className={`w-8 h-0.5 transition-colors duration-300 ${
                  isCompleted ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}