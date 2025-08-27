import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import GuidePreview from "@/components/GuidePreview";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: {
    title: string;
    subtitle?: string;
    authorName: string;
    step1Content: string;
    step2Content: string;
    currentStep: number;
    isDraft: boolean;
  };
}

export default function PreviewModal({ isOpen, onClose, guide }: PreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-background border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">Preview Guide</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="p-0">
          <GuidePreview guide={guide} />
        </div>
      </DialogContent>
    </Dialog>
  );
}