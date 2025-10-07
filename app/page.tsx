import React from "react";
import {
  Hero,
  FeaturedGuides,
  ValueProposition,
  TopicsSection,
  Newsletter,
  CTASection,
  Navbar,
  Footer,
} from "@/features/home";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedGuides />
        <ValueProposition />
        <TopicsSection />
        <Newsletter />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
