import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface GuideHeaderProps {
  onBack: () => void;
  onPreview: () => void;
  onContinue: () => void;
  currentStep: number;
}

export default function GuideHeader({
  onBack,
  onPreview,
  onContinue,
  currentStep,
}: GuideHeaderProps) {
  return (
    <header className="border-substack-border sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={onPreview}>
              Preview
            </Button>
            <Button onClick={onContinue} className="bg-orange-600 text-white hover:bg-orange-600">
              {currentStep === 1 ? "Continue" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
