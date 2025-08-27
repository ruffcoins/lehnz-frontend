import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface GuideHeaderProps {
  onBack: () => void;
  onPreview: () => void;
  onContinue: () => void;
  currentStep: number;
}

export default function GuideHeader({ onBack, onPreview, onContinue, currentStep }: GuideHeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-substack-border z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={onPreview}>
              Preview
            </Button>
            <Button
              onClick={onContinue}
              className="bg-orange-600 hover:bg-orange-600 text-white"
            >
              {currentStep === 1 ? "Continue" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
