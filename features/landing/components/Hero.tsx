"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/features/shared/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Brain, Zap } from "lucide-react";

const FloatingCard = ({ text, delay }: { text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="bg-card/80 border-border/50 text-card-foreground absolute z-10 rounded-lg border p-3 text-sm font-medium shadow-lg backdrop-blur-sm"
    style={{
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 60 + 20}%`,
    }}
  >
    {text}
  </motion.div>
);

const CodeLine = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ delay, duration, ease: "easeInOut" }}
    className="absolute"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  >
    <svg width="100" height="2" viewBox="0 0 100 2">
      <path d="M0,1 L100,1" stroke="url(#gradient)" strokeWidth="1" fill="none" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

export default function Hero() {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="relative z-20 container mx-auto max-w-6xl px-6 py-20 md:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <Brain className="h-4 w-4" />
              <span>AI/ML Engineering Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            Engineering the Future of <span className="text-primary">AI</span> — One Guide at a
            Time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground mb-10 max-w-3xl text-lg leading-relaxed md:text-xl"
          >
            Pure Engineering is where AI/ML engineers publish deep, practical guides on how models,
            systems, and ideas come to life — from concept to code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/onboarding">
              <Button size="lg" className="min-w-[200px] text-base">
                Start Publishing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="lg" variant="outline" className="min-w-[200px] text-base">
                Explore AI/ML Guides
                <Code2 className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-muted-foreground mt-16 flex items-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <Zap className="text-primary h-4 w-4" />
              <span>Production-ready guides</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="text-primary h-4 w-4" />
              <span>Verified by engineers</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="text-primary h-4 w-4" />
              <span>Real-world applications</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
