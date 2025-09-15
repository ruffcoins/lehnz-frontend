interface StepProgressProps {
  currentStep: number;
}

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-6">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                1
              </div>
              <span className="text-sm font-medium text-gray-900">Problem & Solution</span>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  currentStep >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= 2 ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Code Implementation
              </span>
            </div>
          </div>
        </div>
        <div className="h-1 w-full rounded-full bg-gray-200">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${
              currentStep === 2 ? "step-2-indicator" : "step-indicator"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
