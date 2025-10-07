"use client";

import { useState } from "react";
import { Button } from "@/features/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/shared/ui/dialog";
import { Badge } from "@/features/shared/ui/badge";
import { cn } from "@/features/shared/utils/utils";
import { ONBOARDING_INTERESTS } from "@/features/shared/utils/consts";
import { useIsMobile } from "@/features/shared/hooks/useMobile";

export function DiveIntoYourInterestsDialog() {
  const isMobile = useIsMobile();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    console.log(selectedInterests);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit cursor-pointer">
          Create Account
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={isMobile}
        className="flex h-[100vh] flex-col overflow-hidden sm:max-h-[60vh] sm:max-w-[600px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Dive into your interests
          </DialogTitle>
          <DialogDescription className="text-center">
            Select your interests to personalize your experience. You can choose as many as
            you&apos;d like.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-2 px-2">
            {ONBOARDING_INTERESTS.map(interest => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className={cn(
                  "h-10 cursor-pointer px-4 transition-all duration-200 hover:scale-105",
                  selectedInterests.includes(interest)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            disabled={selectedInterests.length === 0}
            className="mt-10 w-full cursor-pointer"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
