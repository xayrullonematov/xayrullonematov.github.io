"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CanvasScrollScrubberProps = {
  images: string[];
  title?: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
};

export function CanvasScrollScrubber({
  images,
  title,
  badge = "Interactive Scroll Showcase",
  badgeColor = "var(--accent)",
  className,
}: CanvasScrollScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll 0 -> 1 to frame index 0 -> images.length - 1
  const frameIndex = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [0, Math.max(0, images.length - 1)]
  );

  // Preload images into HTMLImageElement instances
  useEffect(() => {
    let isMounted = true;
    const preloaded: HTMLImageElement[] = [];

    let loadedCount = 0;
    images.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount === images.length) {
          setLoadedImages(preloaded);
        }
      };
      preloaded[idx] = img;
    });

    return () => {
      isMounted = false;
    };
  }, [images]);

  // Render current frame to canvas or image state
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      const idx = Math.min(
        images.length - 1,
        Math.max(0, Math.round(latest))
      );
      setActiveFrameIndex(idx);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const currentImg = loadedImages[idx];

      if (ctx && currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        // Set canvas internal size match image aspect ratio
        if (canvas.width !== currentImg.naturalWidth) {
          canvas.width = currentImg.naturalWidth;
          canvas.height = currentImg.naturalHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentImg, 0, 0);
      }
    });

    return () => unsubscribe();
  }, [frameIndex, images.length, loadedImages]);

  const activeSrc = images[activeFrameIndex] || images[0];

  return (
    <div
      ref={containerRef}
      className={cn("group relative w-full overflow-hidden rounded-2xl border border-white/10 glass-panel shadow-2xl transition-all duration-500 hover:border-accent/40", className)}
      data-cursor="hover"
    >
      {/* Background ambient light */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-64 w-3/4 -translate-x-1/2 rounded-full opacity-25 blur-[80px] transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: badgeColor }}
      />

      {/* Grid mask overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(246,244,239,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(246,244,239,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      <div className="relative p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#080b11] shadow-xl">
          
          {/* Canvas frame scrubber with HTML img fallback */}
          {!prefersReducedMotion && loadedImages.length > 0 ? (
            <canvas
              ref={canvasRef}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <img
              src={activeSrc}
              alt={title || "Project frame showcase"}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
          )}

          {/* Floating badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3.5 py-1.5 backdrop-blur-md shadow-lg"
            >
              <span
                className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: badgeColor, color: badgeColor }}
              />
              <span className="mono text-[10px] tracking-wide text-text/90">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Frame Progress Scrubbing Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1 backdrop-blur-md">
              <span className="mono text-[10px] text-accent">
                Frame {activeFrameIndex + 1}/{images.length}
              </span>
            </div>
          )}

          {/* Vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />
        </div>
      </div>
    </div>
  );
}
