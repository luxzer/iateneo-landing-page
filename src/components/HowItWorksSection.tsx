"use client";

import { motion } from "framer-motion";
import { Link2, Mic, Sparkles, Star } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Link2,
    title: "Join",
    description: "Share the link or use the code, no account needed.",
  },
  {
    num: "02",
    icon: Mic,
    title: "Speak",
    description: "Your voice is transcribed in real time.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "AI Captures",
    description: "Summarizes your idea in under 10 words.",
  },
  {
    num: "04",
    icon: Star,
    title: "The Constellation Grows",
    description: "Each idea becomes a connected star.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            From voice to stars in four steps.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="absolute top-14 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step circle */}
              <div className="relative z-10 mb-6 flex items-center justify-center w-28 h-28">
                <span className="absolute text-7xl font-black text-foreground/[0.04] select-none">
                  {step.num}
                </span>
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card">
                  <step.icon size={20} strokeWidth={1.8} className="text-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden flex flex-col gap-10 relative">
          <div className="absolute left-5 top-6 bottom-6 w-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex items-start gap-6 pl-2"
            >
              <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card">
                <step.icon size={18} strokeWidth={1.8} className="text-foreground" />
              </div>
              <div className="pt-1.5">
                <span className="text-xs font-mono text-muted-foreground/60 mb-1 block">
                  {step.num}
                </span>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
