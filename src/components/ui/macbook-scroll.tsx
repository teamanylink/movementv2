"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MacbookScroll = ({
  title,
  badge,
  src,
  showGradient,
}: {
  title: string | React.ReactNode;
  badge?: React.ReactNode;
  src: string;
  showGradient?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  return (
    <div
      ref={ref}
      className="min-h-[200vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{
          scale,
          y,
          opacity,
        }}
        className="flex flex-col items-center justify-start"
      >
        <div className="max-w-5xl">{title}</div>
        <div className="relative">
          {badge && <div className="absolute top-8 -right-12">{badge}</div>}
          <div className="pt-10 pr-16 pl-16">
            <div className="w-[76rem] aspect-[16/10.3] relative">
              <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm rounded-[2rem] p-4 border border-white/40 shadow-lg">
                <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};