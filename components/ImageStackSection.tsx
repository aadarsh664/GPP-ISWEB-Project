import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import RadialRevealButton from './RadialRevealButton';
import craftData from '../src/data/craftItems.json';

/* ─── Data ─── */
const craftItems = craftData.crafts;
const SLIDE_COUNT = craftItems.length;

/* ─── Liquid Glass Arrow Button ─── */
const LiquidBtn: React.FC<{
  onClick: () => void;
  dir: 'left' | 'right';
  disabled?: boolean;
}> = ({ onClick, dir, disabled }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={dir === 'left' ? 'Previous slide' : 'Next slide'}
      style={{
        width:  '54px',
        height: '54px',
        borderRadius: '50%',
        background: hovered
          ? 'rgba(255,255,255,0.24)'
          : 'rgba(255,255,255,0.13)',
        backdropFilter:       'blur(24px) saturate(200%) brightness(1.08)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(1.08)',
        border: '1px solid rgba(255,255,255,0.30)',
        boxShadow: hovered
          ? '0 12px 44px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.08)'
          : '0 8px 32px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.06)',
        cursor:  disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        display: 'flex',
        alignItems:     'center',
        justifyContent: 'center',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        outline: 'none',
        padding: 0,
        flexShrink: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {dir === 'left'
          ? <path d="M11 14L6 9L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M7 4L12 9L7 14"  stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </button>
  );
};

/* ─── Main Component ─── */
const ImageStackSection: React.FC = () => {
  const slidesRef    = useRef<HTMLDivElement>(null);
  const currentSlide = useRef(0);
  const pingDir      = useRef<1 | -1>(1);   // ping-pong direction
  const isAnimating  = useRef(false);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /* ─── Core slide function ─── */
  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
    currentSlide.current = clamped;
    setActiveIndex(clamped);
    
    // Minimal delay to prevent instant spamming, framer-motion handles animation automatically
    isAnimating.current = true;
    setTimeout(() => {
      isAnimating.current = false;
    }, 900);
  }, []);

  /* ─── Ping-pong auto-advance ─── */
  const advance = useCallback(() => {
    if (isAnimating.current) return;

    const next = currentSlide.current + pingDir.current;

    if (next >= SLIDE_COUNT) {
      // hit the end → reverse
      pingDir.current = -1;
      goToSlide(currentSlide.current - 1);
    } else if (next < 0) {
      // hit the start → reverse
      pingDir.current = 1;
      goToSlide(currentSlide.current + 1);
    } else {
      goToSlide(next);
    }
  }, [goToSlide]);

  /* ─── Timer helpers ─── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 10000); // 10 seconds
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  /* ─── Manual buttons ─── */
  const handlePrev = useCallback(() => {
    if (isAnimating.current || currentSlide.current === 0) return;
    goToSlide(currentSlide.current - 1);
    startTimer(); // reset auto-timer on manual action
  }, [goToSlide, startTimer]);

  const handleNext = useCallback(() => {
    if (isAnimating.current || currentSlide.current === SLIDE_COUNT - 1) return;
    goToSlide(currentSlide.current + 1);
    startTimer();
  }, [goToSlide, startTimer]);

  /* ─── Mobile Touch Swipe ─── */
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAnimating.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const dx = touchStartX.current - touchEndX;
    const dy = touchStartY.current - touchEndY;

    // Check if horizontal swipe is dominant and large enough
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx > 0) {
        // Swiped left -> next slide
        if (currentSlide.current < SLIDE_COUNT - 1) {
           goToSlide(currentSlide.current + 1);
           startTimer();
        }
      } else {
        // Swiped right -> prev slide
        if (currentSlide.current > 0) {
           goToSlide(currentSlide.current - 1);
           startTimer();
        }
      }
    }
  };

  /* ─── Render ─── */
  return (
    <div
      id="our-craft"
      style={{
        position: 'relative',
        /* Extend slightly beyond the viewport so no gap is visible */
        height: 'calc(100vh + 12px)',
        marginTop: '-6px',
        marginBottom: '-6px',
        width: '100%',
        overflow: 'hidden',
      }}
    >

      {/* ── Horizontal slides strip ── */}
      <motion.div
        ref={slidesRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        animate={{ x: `-${activeIndex * 100}vw` }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          display: 'flex',
          flexDirection: 'row',
          width: `${SLIDE_COUNT * 100}vw`,
          height: '100%',
          willChange: 'transform',
        }}
      >
        {craftItems.map((item, i) => (
          <div
            key={item.id}
            style={{
              position: 'relative',
              width:  '100vw',
              height: '100%',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/*
              Image is fully visible, no bleeding/cropping
            */}
            <div style={{
              position: 'absolute',
              top: '0', left: '0',
              right: '0', bottom: '0',
            }}>
              <picture style={{ display: 'block', width: '100%', height: '100%' }}>
                <source media="(max-width: 767px)" srcSet={item.mobileImage} />
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    display: 'block',
                  }}
                />
              </picture>
            </div>

            {/* Dark base overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.26)',
              zIndex: 1, pointerEvents: 'none',
            }} />
            {/* Top-to-centre gradient for text legibility */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.08) 32%, transparent 55%)',
              zIndex: 2, pointerEvents: 'none',
            }} />

            {/* Title + CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: activeIndex === i ? 1 : 0, y: activeIndex === i ? 0 : 30 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: activeIndex === i ? 0.4 : 0 }}
              style={{
              position: 'relative', zIndex: 10,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
              paddingTop: '10vh',
              paddingLeft: '1.5rem', paddingRight: '1.5rem',
            }}>
              <h2 style={{
                color: '#ffffff',
                fontFamily: "'Helvetica Now Display','Helvetica Neue',sans-serif",
                fontSize: 'clamp(20px, 3.2vw, 42px)',
                fontWeight: 500,
                letterSpacing: '-0.022em',
                lineHeight: 1.1,
                margin: '0 0 1.15rem',
              }}>
                {item.title}
              </h2>

              <RadialRevealButton
                label="Shop"
                onClick={() => window.open('https://shop.guruprintingpress.com', '_blank')}
                padding="10px 30px"
                rounded={100}
                colors={{
                  fill: '#FFFFFF', textColor: '#000000',
                  hoverFill: '#000000', hoverTextColor: '#FFFFFF',
                }}
                border={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#FFFFFF' }}
                font={{ fontFamily: "'Helvetica Now Display',sans-serif", fontWeight: 500, fontSize: 13 }}
              />
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* ── Liquid glass Left button ── */}
      <div className="hidden md:block" style={{
        position: 'absolute', top: '50%', left: '1.6rem',
        transform: 'translateY(-50%)', zIndex: 30,
      }}>
        <LiquidBtn dir="left"  onClick={handlePrev} disabled={activeIndex === 0} />
      </div>

      {/* ── Liquid glass Right button ── */}
      <div className="hidden md:block" style={{
        position: 'absolute', top: '50%', right: '1.6rem',
        transform: 'translateY(-50%)', zIndex: 30,
      }}>
        <LiquidBtn dir="right" onClick={handleNext} disabled={activeIndex === SLIDE_COUNT - 1} />
      </div>

      {/* ── Horizontal progress dots ── */}
      <div style={{
        position: 'absolute', bottom: '1.8rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20, display: 'flex', flexDirection: 'row',
        gap: '9px', alignItems: 'center',
      }}>
        {craftItems.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { goToSlide(i); startTimer(); }}
            style={{
              width:  activeIndex === i ? '24px' : '6px',
              height: '6px',
              borderRadius: '999px',
              background: activeIndex === i ? '#ffffff' : 'rgba(255,255,255,0.40)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.36s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageStackSection;
