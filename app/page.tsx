import React from "react";
import { Hero, ValueProp, FeaturedGuides, Testimonials, FinalCTA } from "@/features/landing";
import { Footer } from "@/features/home";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <main>
        <Hero />
        <ValueProp />
        <FeaturedGuides />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
