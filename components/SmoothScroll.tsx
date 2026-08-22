import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
  useEffect(() => {
    // Custom easing function for natural deceleration (outExpo)
    function easeOutExpo(x: number): number {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    const lenis = new Lenis({
      lerp: 0.05,             // lower value = more inertia/momentum
      wheelMultiplier: 1.2,   // slightly amplified scroll distance
      smoothWheel: true,
      easing: easeOutExpo,    // smooth natural deceleration
      autoRaf: true,          // animation loop
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;