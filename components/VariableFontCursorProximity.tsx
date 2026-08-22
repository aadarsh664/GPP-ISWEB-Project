import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const useIsStaticRenderer = () => false;

const MAX_REACH = 350;

interface Props {
  label: string;
  fromWeight?: number;
  toWeight?: number;
  strength?: number;
  fontSize?: number | string;
  color?: string;
  transition?: {
    duration?: number;
    ease?: string;
  };
  textAlign?: "left" | "center" | "right";
  className?: string;
  style?: React.CSSProperties;
}

const COMPONENT_DEFAULTS = {
  label: "",
  fontSize: "2.5rem",
  color: "#FFFFFF",
  fromWeight: 400,
  toWeight: 900,
  strength: 50,
  transition: {
    duration: 0.2,
  },
  textAlign: "left" as const,
};

function __OriginkitBase_VariableFontCursorProximity(props: Props) {
  const mergedProps = { ...COMPONENT_DEFAULTS, ...props };
  const {
    label,
    fromWeight = 400,
    toWeight = 900,
    strength = 50,
    fontSize,
    color,
    transition,
    textAlign,
    style,
    className,
  } = mergedProps;

  const reach = Math.max(
    1,
    (Math.max(1, Math.min(100, strength)) / 100) * MAX_REACH
  );

  const isStatic = useIsStaticRenderer();
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const letterFactorsRef = useRef<number[]>([]);
  const lastFrameRef = useRef(0);
  const mousePositionRef = useRef({ x: -99999, y: -99999 });

  useEffect(() => {
    if (isStatic) return;

    const updatePosition = (clientX: number, clientY: number) => {
      mousePositionRef.current = {
        x: clientX,
        y: clientY,
      };
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length === 0) return;
      updatePosition(ev.touches[0].clientX, ev.touches[0].clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isStatic]);

  const fromSettings = `'wght' ${fromWeight}`;

  useAnimationFrame((now: number) => {
    if (isStatic) return;
    const mx = mousePositionRef.current.x;
    const my = mousePositionRef.current.y;

    const prevT = lastFrameRef.current || now;
    const dtSec = Math.min(0.1, Math.max(0, (now - prevT) / 1000));
    lastFrameRef.current = now;

    const tau = Math.max(0.016, transition?.duration ?? 0.2);
    const a = 1 - Math.exp(-dtSec / tau);

    for (let i = 0; i < letterRefs.current.length; i++) {
      const letterEl = letterRefs.current[i];
      if (!letterEl) continue;
      const rect = letterEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const target = Math.min(Math.max(1 - dist / reach, 0), 1);
      const prev = letterFactorsRef.current[i] ?? 0;
      const f = prev + (target - prev) * a;
      letterFactorsRef.current[i] = f;

      const w = Math.round(fromWeight + (toWeight - fromWeight) * f);
      const settingsStr = `'wght' ${w}`;

      if (letterEl.style.fontVariationSettings !== settingsStr) {
        letterEl.style.fontVariationSettings = settingsStr;
        letterEl.style.fontWeight = `${w}`;
        if (f > 0.01) {
          letterEl.style.transform = `scale(${1 + f * 0.08})`;
        } else {
          letterEl.style.transform = "scale(1)";
        }
      }
    }
  });

  const srOnlyStyle: React.CSSProperties = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  };

  const innerSpanStyle: React.CSSProperties = {
    fontFamily: style?.fontFamily || "'Helvetica Now Display', sans-serif",
    fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
    color: color || "#FFFFFF",
    textAlign: textAlign || "left",
    display: "block",
    width: "100%",
    lineHeight: style?.lineHeight || 1.08,
    letterSpacing: style?.letterSpacing || "-0.04em",
  };

  const words = label ? label.split(" ") : [];
  letterRefs.current = [];
  let letterIndex = 0;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        position: "relative",
        display: "block",
        textAlign: textAlign || "left",
        ...style,
      }}
    >
      {words.length === 0 ? null : (
        <span style={innerSpanStyle}>
          <span style={srOnlyStyle}>{label}</span>
          {words.map((word, wi) => {
            const wordLetters = word.split("");
            return (
              <React.Fragment key={wi}>
                <span
                  aria-hidden
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                  }}
                >
                  {wordLetters.map((letter, li) => {
                    const idx = letterIndex++;
                    return (
                      <motion.span
                        key={li}
                        ref={(el: HTMLSpanElement | null) => {
                          letterRefs.current[idx] = el;
                        }}
                        style={{
                          display: "inline-block",
                          fontFamily: style?.fontFamily || "'Helvetica Now Display', sans-serif",
                          fontWeight: fromWeight,
                          fontVariationSettings: fromSettings,
                          transition: "transform 0.05s ease-out",
                          willChange: "font-variation-settings, font-weight, transform",
                          margin: 0,
                          padding: 0,
                          letterSpacing: style?.letterSpacing || "-0.04em",
                        }}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
                {wi < words.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                    }}
                  >
                    &nbsp;
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </span>
      )}
    </div>
  );
}

export default function VariableFontCursorProximity(props: Props) {
  return <__OriginkitBase_VariableFontCursorProximity {...props} />;
}
