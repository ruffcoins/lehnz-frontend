"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/features/shared/ui/card";
import { Quote, Star, Users, TrendingUp, Code2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Finally, a place to share real AI engineering work without fighting algorithms. The quality of technical content here is unmatched.",
    author: "@ai_builder",
    role: "Senior ML Engineer",
    avatar: "AB",
    company: "TechCorp",
  },
  {
    id: 2,
    quote:
      "Pure Engineering has become my go-to resource for production-ready AI guides. Every article is packed with real-world insights.",
    author: "@data_scientist",
    role: "AI Research Lead",
    avatar: "DS",
    company: "InnovateAI",
  },
  {
    id: 3,
    quote:
      "The depth and authenticity of the engineering guides here is refreshing. No fluff, just solid technical content from practitioners.",
    author: "@ml_architect",
    role: "ML Platform Engineer",
    avatar: "MA",
    company: "ScaleUp",
  },
];

const stats = [
  { label: "Active Engineers", value: "2.5K+", icon: <Users className="h-5 w-5" /> },
  { label: "Published Guides", value: "150+", icon: <Code2 className="h-5 w-5" /> },
  { label: "Community Growth", value: "40%", icon: <TrendingUp className="h-5 w-5" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Trusted by AI Engineers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join a community of engineers who are building the future of AI infrastructure.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                {stat.icon}
              </div>
              <div className="text-foreground mb-2 text-3xl font-bold">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map(testimonial => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                        <Quote className="text-primary mr-1 inline h-4 w-4" />
                        {testimonial.quote}
                      </blockquote>
                      <div>
                        <div className="text-foreground font-semibold">{testimonial.author}</div>
                        <div className="text-muted-foreground text-sm">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-muted/50 border-border rounded-2xl border p-8">
            <h3 className="text-foreground mb-2 text-xl font-bold">
              Ready to share your engineering expertise?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our community of AI engineers who are documenting the real work behind building
              intelligent systems.
            </p>
            <a
              href="/create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              Start Writing Today
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
