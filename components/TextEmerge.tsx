// Text Emerge — Originkit
// Originkit — defaults rewritten to match preview.
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

type FontStyle = React.CSSProperties;

type TransitionValue = {
    type?: string;
    duration?: number;
    delay?: number;
    ease?: string | number[];
    staggerChildren?: number;
};

type StaggerFrom = "start" | "center" | "end" | "random";
type TextTag = "p" | "span" | "div" | "section";

type Props = {
    text?: string;
    font?: FontStyle;
    color?: string;

    staggerFrom?: StaggerFrom;
    tag?: TextTag;

    transition?: TransitionValue;
};

const mapEase = (ease: TransitionValue["ease"]): string => {
    if (typeof ease !== "string") return "power2.out";

    const easeMap: Record<string, string> = {
        linear: "none",
        easeIn: "power2.in",
        easeOut: "power2.out",
        easeInOut: "power2.inOut",
        circIn: "circ.in",
        circOut: "circ.out",
        circInOut: "circ.inOut",
        backIn: "back.in",
        backOut: "back.out(1.7)",
        backInOut: "back.inOut",
        anticipate: "back.out(1.7)",
    };

    return easeMap[ease] ?? ease;
};

export default function InkdropSpread({
    text = "The biggest challenge for global brands is maintaining absolute consistency when moving from screen to scale. We engineer out the guesswork, delivering uncompromising print quality and flawless tactile finishes that command authority and protect your brand's integrity across every physical touchpoint.",
    font = {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "70px",
        fontWeight: 600,
        letterSpacing: "-0.025em",
        lineHeight: "1.1em",
        textAlign: "left",
    },
    color = "#ffffff",

    staggerFrom = "start",
    tag = "section",

    transition = {
        type: "tween",
        duration: 0.5,
        delay: 0,
        ease: "easeOut",
        staggerChildren: 0.03,
    },
}: Props) {
    const containerRef = useRef<HTMLElement>(null);
    const inView = useInView(containerRef, { once: true, amount: 0.5 });
    const words = text.trim().split(/\s+/).filter(Boolean);
    const textAlign = (font.textAlign as React.CSSProperties["textAlign"]) ?? "left";

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: transition.staggerChildren ?? 0.03,
                delayChildren: transition.delay ?? 0,
            }
        }
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, scale: 0, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: transition.duration ?? 0.5,
                ease: (transition.ease as any) ?? "easeOut"
            }
        }
    };

    const MotionTag = motion[tag as keyof typeof motion] as any;

    return (
        <MotionTag
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
                margin: 0,
                display: "block",
                width: "100%",
                whiteSpace: "pre-wrap",
                color,
                ...font,
                textAlign,
            }}
        >
            {words.map((word, index) => (
                <React.Fragment key={`${word}-${index}`}>
                    <motion.span
                        variants={childVariants}
                        className="word"
                        style={{ display: "inline-block" }}
                    >
                        {word}
                    </motion.span>
                    {index < words.length - 1 ? " " : null}
                </React.Fragment>
            ))}
        </MotionTag>
    );
}
