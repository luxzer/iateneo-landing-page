"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground glow-text">
            Your next big idea starts here
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg">
            Join the conversation. No barriers.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-4 inline-flex items-center gap-2.5 px-10 py-4 text-base font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-colors"
          >
            Create a session now
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
