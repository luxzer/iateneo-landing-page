"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Link2,
  Sparkles,
  Eye,
  Mic,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Collective Thinking",
    description:
      "Capture everyone's ideas in real time, without losing a single one.",
  },
  {
    icon: Link2,
    title: "Zero Friction",
    description:
      "Join with a link. No sign-up required. No setup needed.",
  },
  {
    icon: Sparkles,
    title: "AI Summaries",
    description:
      "Our AI condenses each idea into less than 10 words so nothing gets lost.",
  },
  {
    icon: Eye,
    title: "Visual Map",
    description:
      "See how ideas connect and evolve throughout the conversation.",
  },
  {
    icon: Mic,
    title: "Voice-first",
    description:
      "Speak naturally. The technology adapts to you, not the other way around.",
  },
  {
    icon: Users,
    title: "Real Collaboration",
    description:
      "Sub-stars for each participant — track who said what.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function WhyUsSection() {
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Why iAteneo?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Tools designed to let ideas flow without obstacles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border bg-card p-7 transition-colors hover:bg-accent/50"
            >
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-foreground">
                <feature.icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
