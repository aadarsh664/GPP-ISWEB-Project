import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type Transition } from "framer-motion";

interface Item {
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface HoverImageRevealProps {
  items: Item[];
  textColor?: string;
  dimColor?: string;
  imageWidth?: number;
  imageHeight?: number;
  rounded?: number;
  offsetX?: number;
  offsetY?: number;
  followStrength?: number;
  transition?: Transition;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 1,
};

const HoverImageReveal: React.FC<HoverImageRevealProps> = ({
  items,
  textColor = "#000000",
  dimColor = "rgba(0,0,0,0.3)",
  imageWidth = 400,
  imageHeight = 300,
  rounded = 16,
  offsetX = 20,
  offsetY = 20,
  followStrength = 0,
  transition = DEFAULT_TRANSITION,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const stiffness = 60 + followStrength * 5;
  const springCfg = { stiffness, damping: 28, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const anyActive = hovered != null;

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + offsetX);
    rawY.set(e.clientY - rect.top + offsetY);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(null)}
      className="relative w-full px-4 md:px-8 cursor-default"
    >
      {/* Follower Image Container */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: imageWidth,
          height: imageHeight,
          borderRadius: rounded,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 50,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: anyActive ? 1 : 0,
          scale: anyActive ? 1 : 0.8
        }}
        transition={transition}
      >
        {items.map((item, i) => {
          const yPos =
            hovered == null
              ? "100%"
              : i < hovered
                ? "-100%"
                : i > hovered
                  ? "100%"
                  : "0%";
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y: yPos }}
              transition={transition}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* List Items */}
      <div
        onMouseLeave={() => setHovered(null)}
        className="flex flex-col w-full"
      >
        {items.map((item, i) => {
          const isHovered = hovered === i;
          const color = anyActive ? (isHovered ? textColor : dimColor) : textColor;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onClick={(e) => {
                setHovered(i);
                onMove(e);
              }}
              className={`w-full flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 transition-colors duration-300 border-b border-black ${i === 0 ? 'border-t' : ''}`}
              style={{ color }}
            >
              <div className="flex items-start md:items-center gap-6 md:gap-12 w-full lg:w-3/5 min-w-0">
                <span className="text-xl md:text-3xl font-normal mt-1 md:mt-0 w-8 shrink-0" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
                  {i + 1}.
                </span>
                <motion.div
                  style={{ position: "relative" }}
                  animate={{ x: isHovered ? 10 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="min-w-0 flex-1"
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-[4.5rem] font-medium tracking-tighter leading-[1.1] pb-2 break-words" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
                    {item.title}
                  </h3>
                </motion.div>
              </div>
              <div className="w-full lg:w-2/5 mt-6 lg:mt-0 text-left lg:text-right pl-14 lg:pl-0 flex lg:justify-end shrink-0">
                <p className="text-base md:text-xl font-normal leading-snug max-w-lg lg:ml-auto" style={{ fontFamily: "'Helvetica Now Display', sans-serif" }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoverImageReveal;
