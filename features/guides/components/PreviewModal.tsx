import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/features/shared/ui/dialog";
import { Button } from "@/features/shared/ui/button";
import { X } from "lucide-react";
import GuidePreview from "@/features/guides/components/GuidePreview";

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
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto p-0">
        <DialogHeader className="bg-background sticky top-0 border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-xl">Preview Guide</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
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
