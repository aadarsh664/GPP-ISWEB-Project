import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Control the smoothness (higher = smoother/slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-style easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Mobile falls back to native scroll for better UX
      touchMultiplier: 2,
    });

    // Animation Frame Loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
