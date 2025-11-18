"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/ui/card";
import { Badge } from "@/features/shared/ui/badge";
import { Clock, User, ArrowRight, Code2, Database, Cpu, Search } from "lucide-react";

const guides = [
  {
    id: 1,
    title: "Deploying RAG pipelines with LangChain + FastAPI",
    description:
      "A comprehensive guide to building production-ready retrieval-augmented generation systems with proper error handling, monitoring, and scalability considerations.",
    author: "Sarah Chen",
    readTime: "12 min read",
    tags: ["RAG", "LangChain", "FastAPI", "Production"],
    icon: <Database className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Optimizing GPU workloads for transformer inference",
    description:
      "Deep dive into memory optimization, batch processing, and quantization techniques for running large language models efficiently in production environments.",
    author: "Marcus Rodriguez",
    readTime: "18 min read",
    tags: ["GPU", "Optimization", "Transformers", "Inference"],
    icon: <Cpu className="h-5 w-5" />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Designing data pipelines for model retraining",
    description:
      "Architecture patterns and implementation strategies for building robust, scalable data pipelines that support continuous model improvement and deployment.",
    author: "Alex Kim",
    readTime: "15 min read",
    tags: ["Data Pipelines", "MLOps", "Retraining", "Architecture"],
    icon: <Code2 className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "How we built a semantic search system with FAISS",
    description:
      "Case study on implementing vector similarity search at scale, including indexing strategies, performance optimization, and real-world deployment challenges.",
    author: "Priya Patel",
    readTime: "20 min read",
    tags: ["Vector Search", "FAISS", "Semantic Search", "Case Study"],
    icon: <Search className="h-5 w-5" />,
    gradient: "from-orange-500 to-red-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function FeaturedGuides() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Featured Engineering Guides
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Real-world AI/ML engineering guides written by practitioners who&apos;ve built and
            deployed systems at scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          {guides.map(guide => (
            <motion.div key={guide.id} variants={cardVariants}>
              <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${guide.gradient} text-white`}
                    >
                      {guide.icon}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{guide.readTime}</span>
                    </div>
                  </div>

                  <CardTitle className="text-foreground group-hover:text-primary text-lg font-semibold transition-colors">
                    {guide.title}
                  </CardTitle>

                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{guide.author}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{guide.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {guide.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-muted hover:bg-muted/80 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-primary group-hover:text-primary/80 flex items-center text-sm font-medium transition-colors">
                    <span>Read guide</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="/guides/list"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          >
            View All Guides
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
