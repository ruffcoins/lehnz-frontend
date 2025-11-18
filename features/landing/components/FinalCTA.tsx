"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/features/shared/ui/button";
import Link from "next/link";
import { ArrowRight, PenTool, BookOpen, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Publish Your Work",
    description:
      "Share your engineering process and insights with a community that values technical depth.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learn from Experts",
    description:
      "Access production-ready guides written by engineers who've built AI systems at scale.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Join the Community",
    description:
      "Connect with like-minded engineers who are shaping the future of AI infrastructure.",
  },
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

export default function FinalCTA() {
  return (
    <section className="bg-background relative overflow-hidden py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%234ade80%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Join the Future of AI Engineering</span>
            </div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-foreground mb-6 text-3xl font-bold md:text-5xl lg:text-6xl"
          >
            Join the engineers defining the <span className="text-primary">next generation</span> of
            AI infrastructure.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mx-auto mb-12 max-w-3xl text-lg leading-relaxed"
          >
            Whether you&apos;re building production AI systems or learning from the best practices,
            Pure Engineering is your platform for serious, technical content that moves the industry
            forward.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/create">
              <Button size="lg" className="min-w-[200px] text-base">
                Start Writing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/guides/list">
              <Button size="lg" variant="outline" className="min-w-[200px] text-base">
                Discover Guides
                <BookOpen className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="group text-center">
                <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Stats */}
          <motion.div variants={itemVariants} className="border-border mt-16 border-t pt-16">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div>
                <div className="text-foreground mb-1 text-2xl font-bold">2.5K+</div>
                <div className="text-muted-foreground text-sm">Active Engineers</div>
              </div>
              <div>
                <div className="text-foreground mb-1 text-2xl font-bold">150+</div>
                <div className="text-muted-foreground text-sm">Published Guides</div>
              </div>
              <div>
                <div className="text-foreground mb-1 text-2xl font-bold">40%</div>
                <div className="text-muted-foreground text-sm">Monthly Growth</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
