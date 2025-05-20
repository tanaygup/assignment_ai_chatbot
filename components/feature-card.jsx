"use client";

import { motion } from "framer-motion";
import { LucideIcon, Upload, MessageSquare, Sparkles } from "lucide-react";

export function FeatureCard({ number, title, description, icon }) {
  const icons = {
    upload: Upload,
    "message-square": MessageSquare,
    sparkles: Sparkles,
  };

  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center space-y-4 rounded-xl border bg-background p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/50"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
          <span className="text-xl font-bold">{number}</span>
        </div>
      </div>
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
