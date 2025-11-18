"use client";

import React from "react";
import { motion } from "framer-motion";
import { PenTool, BookOpen, Users, Target, Code2, TrendingUp } from "lucide-react";

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

export default function ValueProp() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-16 lg:grid-cols-2"
        >
          {/* For Creators */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                <PenTool className="text-primary-foreground h-6 w-6" />
              </div>
              <h2 className="text-foreground text-2xl font-bold">For Creators</h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Share your engineering process. From architecture to metrics, document how you build
              AI/ML systems — and grow an audience that values substance over hype.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                  <Users className="text-primary h-3 w-3" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Build Your Audience</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect with engineers who appreciate technical depth and real-world
                    applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                  <Target className="text-primary h-3 w-3" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Document Your Process</h3>
                  <p className="text-muted-foreground text-sm">
                    Share the real engineering decisions, trade-offs, and lessons learned from
                    building AI/ML systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                  <TrendingUp className="text-primary h-3 w-3" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Grow Your Impact</h3>
                  <p className="text-muted-foreground text-sm">
                    Reach engineers who are building the future of AI infrastructure and
                    applications.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* For Readers */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full">
                <BookOpen className="text-secondary-foreground h-6 w-6" />
              </div>
              <h2 className="text-foreground text-2xl font-bold">For Readers</h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Learn the real engineering behind AI. Skip the buzzwords — read verified, reproducible
              guides written by practicing engineers.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                  <Code2 className="text-secondary h-3 w-3" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Production-Ready Content</h3>
                  <p className="text-muted-foreground text-sm">
                    Access guides that have been tested in real-world environments, not just
                    theoretical examples.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                  <Users className="text-secondary h-3 w-3" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">From Industry Experts</h3>
                  <p className="text-muted-foreground text-sm">
                    Learn from engineers who are actively building AI/ML systems at scale.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full">
                  <Target className="text-secondary h-3 w-3" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">Practical Applications</h3>
                  <p className="text-muted-foreground text-sm">
                    Get insights into real engineering challenges, solutions, and best practices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
              Ready to dive deeper into AI engineering?
            </h3>
            <p className="text-muted-foreground mb-6">
              Whether you&apos;re building or learning, Pure Engineering is your platform for
              serious AI/ML content.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors"
              >
                Start Publishing
              </a>
              <a
                href="/guides/list"
                className="border-border bg-background text-primary hover:bg-muted inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
              >
                Explore Guides
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
