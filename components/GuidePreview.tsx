// import { Guide } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant={guide.isDraft ? "secondary" : "default"}>
              {guide.isDraft ? "Draft" : "Published"}
            </Badge>
            <Badge variant="outline">
              Programming Guide
            </Badge>
          </div>
          
          <h1 className="text-5xl font-serif font-bold text-foreground mb-6">
            {guide.title || "Untitled Guide"}
          </h1>
          
          {guide.subtitle && (
            <p className="text-2xl text-muted-foreground font-serif mb-8">
              {guide.subtitle}
            </p>
          )}
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{guide.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Problem & Solution</h2>
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Code Implementation</h2>
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
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Start writing your guide to see the preview here.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Created with Programming Guide Builder
          </p>
        </div>
      </div>
    </div>
  );
}