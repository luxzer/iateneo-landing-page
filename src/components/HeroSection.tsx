"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StarGraph } from "./StarGraph";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05]">
              Welcome to{" "}
              <span className="glow-text">iAteneo</span>
            </h1>

            <p className="text-xl sm:text-2xl font-light tracking-tight text-muted-foreground">
              Network of Thoughts
            </p>

            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              Enter a room, speak your ideas, and watch them become connected
              stars. An AI summarizes each thought while the universe of your
              conversation grows in real time.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <button className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-all">
                Get started
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                See how it works
              </a>
            </motion.div>
          </motion.div>

          {/* Star graph column — bigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative h-[420px] sm:h-[480px] lg:h-[600px]"
          >
            <StarGraph />
          </motion.div>
        </div>
      </div>

      {/* Subtle noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </section>
  );
}
