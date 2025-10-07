// import { Guide } from "@shared/schema";
import { Badge } from "@/features/shared/ui/badge";
import { Calendar, User } from "lucide-react";

interface GuidePreviewProps {
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

export default function GuidePreview({ guide }: GuidePreviewProps) {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Badge variant={guide.isDraft ? "secondary" : "default"}>
              {guide.isDraft ? "Draft" : "Published"}
            </Badge>
            <Badge variant="outline">Programming Guide</Badge>
          </div>

          <h1 className="text-foreground mb-6 font-serif text-5xl font-bold">
            {guide.title || "Untitled Guide"}
          </h1>

          {guide.subtitle && (
            <p className="text-muted-foreground mb-8 font-serif text-2xl">{guide.subtitle}</p>
          )}

          <div className="text-muted-foreground flex items-center gap-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{guide.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-16">
          {/* Step 1: Problem & Solution */}
          {guide.step1Content && (
            <section>
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                    1
                  </div>
                  <h2 className="font-serif text-2xl font-bold">Problem & Solution</h2>
                </div>
              </div>

              <div
                className="prose prose-content max-w-none font-serif text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: guide.step1Content }}
              />
            </section>
          )}

          {/* Step 2: Code Implementation */}
          {guide.step2Content && guide.currentStep >= 2 && (
            <section>
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                    2
                  </div>
                  <h2 className="font-serif text-2xl font-bold">Code Implementation</h2>
                </div>
              </div>

              <div
                className="prose prose-content max-w-none font-serif text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: guide.step2Content }}
              />
            </section>
          )}

          {/* No content message */}
          {!guide.step1Content && !guide.step2Content && (
            <div className="py-16 text-center">
              <p className="text-muted-foreground text-lg">
                Start writing your guide to see the preview here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-border mt-16 border-t pt-8">
          <p className="text-muted-foreground text-sm">Created with Programming Guide Builder</p>
        </div>
      </div>
    </div>
  );
}
