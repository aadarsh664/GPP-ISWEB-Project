import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,             // Smoothness (0.1 default hai, 0.07 thoda aur smooth hai)
      wheelMultiplier: 1,     // Mouse speed ke saath 1:1 match karega
      smoothWheel: true,
      autoRaf: true,          // Animation loop automatically handle karega
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;