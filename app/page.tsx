import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <section className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Tackling AI/ML Engineering Problems — One Solution at a Time
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Lehnz is a platform for AI/ML engineers to create, share, and review problem-solving content.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/signup">
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-w-[140px] text-base font-semibold"
            >
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto min-w-[140px] text-base font-semibold"
            >
              Log In
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
