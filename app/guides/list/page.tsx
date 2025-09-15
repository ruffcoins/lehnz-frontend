"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Edit } from "lucide-react";
import { apiRequest } from "../create/page";

export interface Guide {
  id: string;
  title: string;
  subtitle?: string;
  authorName: string;
  step1Content: string;
  step2Content: string;
  currentStep: number;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function GuideList() {
  const { data: guides, isLoading } = useQuery<Guide[]>({
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/guides");
      return res.json();
    },
    queryKey: ["/api/guides"],
  });

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="animate-pulse">
            <div className="bg-muted mb-8 h-8 w-64 rounded"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-muted h-32 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold">Programming Guides</h1>
          <Link href="/guides/create">
            <Button className="bg-orange-600 text-white hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Create Guide
            </Button>
          </Link>
        </div>

        {!guides || guides.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-substack-placeholder mb-4">
                <Edit className="mx-auto mb-4 h-12 w-12" />
                <h3 className="text-foreground mb-2 text-lg font-medium">No guides yet</h3>
                <p className="text-sm">Create your first programming guide to get started.</p>
              </div>
              <Link href="/guides/create">
                <Button className="bg-orange-600 text-white hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Guide
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {guides.map(guide => (
              <Card key={guide.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant={guide.isDraft ? "secondary" : "default"}>
                          {guide.isDraft ? "Draft" : "Published"}
                        </Badge>
                        <Badge variant="outline">Step {guide.currentStep} of 2</Badge>
                      </div>
                      <h2 className="text-foreground mb-2 font-serif text-xl font-bold">
                        {guide.title || "Untitled Guide"}
                      </h2>
                      {guide.subtitle && (
                        <p className="text-muted-foreground mb-3">{guide.subtitle}</p>
                      )}
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <span>by {guide.authorName}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {guide.updatedAt
                              ? new Date(guide.updatedAt).toLocaleDateString()
                              : "Just now"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/edit/${guide.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
