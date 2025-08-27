interface StepProgressProps {
    currentStep: number;
  }
  
  export default function StepProgress({ currentStep }: StepProgressProps) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="text-sm font-medium text-gray-900">Problem & Solution</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 2
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-600"
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
          <div className="w-full bg-gray-200 rounded-full h-1">
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
