"use client";

const RenderTarget = {
    current: () => "preview",
    canvas: "canvas",
    export: "export",
    thumbnail: "thumbnail",
    preview: "preview",
}
import React, { useEffect, useRef, useState } from "react"

const EASE_PRESETS: Record<string, string> = {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
}

// Shown when the user hasn't added their own Content images.
const DEFAULT_IMAGES = [
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/34ce1842-4b7a-4d52-0302-38582c341700/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/88369c6d-00cc-4ac9-74ca-0f0965e06300/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/aeaa0756-9647-4f6c-d900-204bd25e4a00/w=800" },
    { src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/316d1761-fd79-4ca9-b8d4-f2bb20521a00/w=800" },
]

function parseTransition(t: any) {
    const dur = Math.max(0.05, (t && t.duration) || 0.5)
    let ease = "cubic-bezier(0.44, 0, 0.56, 1)"
    if (t && Array.isArray(t.ease) && t.ease.length === 4) {
        ease = `cubic-bezier(${t.ease.join(", ")})`
    } else if (t && typeof t.ease === "string" && EASE_PRESETS[t.ease]) {
        ease = EASE_PRESETS[t.ease]
    } else if (t && t.type === "spring") {
        ease = "cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
    return { dur, ease }
}

function __OriginkitBase_MagneticCarousel(props: any) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        images = DEFAULT_IMAGES,
        collapsedWidth = 100,
        hoverWidth = 200,
        collapsedHeight = 340,
        hoverHeight = 400,
        openSize = 600,
        gap = 16,
        influence = 200,
        blur = 2,
        transition = { type: "tween", duration: 0.3, ease: "easeInOut" },
        style = {},
    } = props

    const items: any[] = Array.isArray(images) && images.length > 0 ? images : DEFAULT_IMAGES
    const count = items.length

    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const [factors, setFactors] = useState<number[]>(() => items.map(() => 0))
    const [open, setOpen] = useState<number | null>(null)
    const [closing, setClosing] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const targetRef = useRef<number[]>(items.map(() => 0))
    const curRef = useRef<number[]>(items.map(() => 0))
    const loopRef = useRef(0)
    const closeTimer = useRef<any>(0)

    // Panning state
    const mouseXRef = useRef(0)
    const panTargetRef = useRef(0)
    const curPanRef = useRef(0)

    useEffect(() => {
        targetRef.current = items.map(() => 0)
        curRef.current = items.map(() => 0)
        setFactors(items.map(() => 0))
    }, [count])

    useEffect(
        () => () => {
            cancelAnimationFrame(loopRef.current)
            clearTimeout(closeTimer.current)
        },
        []
    )

    const startLoop = () => {
        if (loopRef.current) return
        const step = () => {
            const tgt = targetRef.current
            const cur = curRef.current
            let moving = false
            for (let i = 0; i < cur.length; i++) {
                const d = (tgt[i] ?? 0) - cur[i]
                if (Math.abs(d) > 0.001) {
                    cur[i] += d * 0.2
                    moving = true
                } else {
                    cur[i] = tgt[i] ?? 0
                }
            }

            // Handle Panning
            if (open === null && !isMobile) {
                const pd = panTargetRef.current - curPanRef.current
                if (Math.abs(pd) > 0.1) {
                    curPanRef.current += pd * 0.05 // Smooth panning lerp
                    moving = true
                } else {
                    curPanRef.current = panTargetRef.current
                }
                if (trackRef.current) {
                    trackRef.current.style.transform = `translateX(${curPanRef.current}px)`
                }

                // Dynamically update hover target based on current pan so it stays under mouse!
                if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect()
                    const trackXOffset = curPanRef.current
                    const cx = mouseXRef.current - rect.left - trackXOffset

                    const totalBase = count * collapsedWidth + (count - 1) * gap
                    const startX = 0

                    for (let i = 0; i < count; i++) {
                        const center = startX + i * (collapsedWidth + gap) + collapsedWidth / 2
                        const dist = Math.abs(cx - center)
                        const f = Math.max(0, 1 - dist / influence)
                        targetRef.current[i] = f * f * (3 - 2 * f)
                    }
                }
            }

            setFactors([...cur])
            loopRef.current = moving ? requestAnimationFrame(step) : 0
        }
        loopRef.current = requestAnimationFrame(step)
    }

    const onMove = (e: React.MouseEvent) => {
        if (isCanvas || open !== null || isMobile) return
        mouseXRef.current = e.clientX

        // Calculate Pan target
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const totalWidth = count * collapsedWidth + (count - 1) * gap
            const overFlowX = Math.max(0, totalWidth - rect.width + 200) // 200px padding

            if (overFlowX > 0) {
                const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                panTargetRef.current = -(percentage * overFlowX) + 100 // +100 to center it a bit
            } else {
                panTargetRef.current = 0
            }
        }

        startLoop()
    }

    const onLeave = () => {
        if (open !== null || isMobile) return
        targetRef.current = items.map(() => 0)
        panTargetRef.current = 0 // Return to center/start or keep it? Let's return to start or stay. Let's keep it where it was.
        startLoop()
    }

    const close = () => {
        targetRef.current = items.map(() => 0)
        curRef.current = items.map(() => 0)
        setFactors(items.map(() => 0))
        setClosing(true)
        clearTimeout(closeTimer.current)
        closeTimer.current = setTimeout(() => setClosing(false), dur * 1000)
        setOpen(null)
        startLoop() // Restart loop to handle panning back
    }

    const sizeFor = (i: number) => {
        const actualCollapsedWidth = isMobile ? 240 : collapsedWidth;
        const actualCollapsedHeight = isMobile ? 450 : collapsedHeight;
        const actualOpenSize = isMobile ? window.innerWidth - 40 : openSize;
        const actualHoverWidth = isMobile ? 240 : hoverWidth;
        const actualHoverHeight = isMobile ? 450 : hoverHeight;

        if (open !== null) {
            return i === open
                ? { width: actualOpenSize, height: actualOpenSize }
                : { width: actualCollapsedWidth, height: actualCollapsedHeight }
        }
        const f = factors[i] ?? 0
        return {
            width: actualCollapsedWidth + (actualHoverWidth - actualCollapsedWidth) * f,
            height: actualCollapsedHeight + (actualHoverHeight - actualCollapsedHeight) * f,
        }
    }

    const { dur, ease } = parseTransition(transition)
    const openEase = `width ${dur}s ${ease}, height ${dur}s ${ease}, opacity ${dur}s ${ease}`
    const barTransition = open !== null || closing ? openEase : "none"

    return (
        <div
            ref={containerRef}
            style={{
                ...style,
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden", // Hide overflowing carousel track
                display: "flex",
                alignItems: "center",
            }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            {/* Transparent backdrop */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    pointerEvents: open !== null ? "auto" : "none",
                }}
                onClick={close}
            />

            {/* Track that pans horizontally */}
            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap,
                    padding: isMobile ? "0 20px" : "0 50px",
                    willChange: isMobile ? "auto" : "transform",
                    overflowX: isMobile ? "auto" : "visible",
                    width: isMobile ? "100%" : "auto",
                    WebkitOverflowScrolling: "touch",
                    transform: isMobile ? "none" : undefined,
                    height: "100%",
                }}
            >
                {items.map((img, i) => {
                    const { width, height } = sizeFor(i)
                    const blurred = open !== null && i !== open
                    return (
                        <div
                            key={i}
                            onClick={(e) => {
                                if (isCanvas) return
                                e.stopPropagation()
                                if (open === i) close()
                                else {
                                    setOpen(i)
                                    // When opening, reset hover targets
                                    targetRef.current = items.map(() => 0)
                                    // Optionally center the opened item via panning
                                    if (containerRef.current) {
                                        const rect = containerRef.current.getBoundingClientRect()
                                        const itemLeft = i * (collapsedWidth + gap)
                                        panTargetRef.current = -itemLeft + rect.width / 2 - openSize / 2
                                    }
                                }
                            }}
                            style={{
                                flex: "none",
                                width,
                                height,
                                overflow: "hidden",
                                cursor: isCanvas ? "default" : "pointer",
                                transition: barTransition,
                                position: "relative",
                                zIndex: open === i ? 3 : 2,
                                opacity: blurred ? 0.4 : 1,
                                backgroundColor: img ? "transparent" : `hsl(${(i * 360) / count}, 70%, 58%)`,
                                backgroundImage: img ? `url("${img.highResSrc || img.src}")` : undefined,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                borderRadius: 16,
                                scrollSnapAlign: isMobile ? "center" : "none"
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const COMPONENT_DEFAULTS = {
    images: DEFAULT_IMAGES,
    collapsedWidth: 120,
    hoverWidth: 200,
    collapsedHeight: 340,
    hoverHeight: 400,
    openSize: 500,
    gap: 8,
    influence: 200,
    blur: 2,
    transition: {
        type: "tween",
        duration: 0.3,
        delay: 0,
        ease: "easeInOut",
    },
}

__OriginkitBase_MagneticCarousel.displayName = "Magnetic Carousel"

export default function MagneticCarousel(props: Record<string, unknown>) {
    return <__OriginkitBase_MagneticCarousel {...props} />;
}
