import React, { useLayoutEffect, useRef } from 'react';
import BrandLogo from './BrandLogo';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check if the user has already visited in this session
    const hasVisited = sessionStorage.getItem("visited");

    if (hasVisited) {
      if (containerRef.current) containerRef.current.style.display = "none";
      // Use setTimeout to ensure this runs AFTER the parent (Hero) has finished its 
      // useLayoutEffect initialization (which sets opacity: 0).
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 0);
      return;
    }

    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline();

      // 1. Animate Progress Bar (Simulate Loading)
      tl.to(".loader-progress", {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
      })
      // 2. Slide Up & Fade Out Logo (Lift Off Effect)
      .to(".loader-content", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in"
      })
      // 3. Curtain Reveal (Strips slide up)
      .to(".curtain-strip", {
        yPercent: -100,
        duration: 1.0,
        stagger: 0.1,
        ease: "power4.inOut",
      })
      // 4. Hide Container
      .set(containerRef.current, { display: "none" })
      .call(() => {
        sessionStorage.setItem("visited", "true");
        if (onComplete) onComplete();
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex h-screen w-screen pointer-events-none">
      {/* Background Strips Layer */}
      <div className="absolute inset-0 flex w-full h-full z-0">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="curtain-strip flex-1 bg-white h-full relative"></div>
      ))}
      </div>

      {/* Content Layer (Logo & Progress) */}
      <div className="loader-content absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="w-48 md:w-64 mb-8">
           <BrandLogo className="w-full h-auto" />
        </div>
        {/* Progress Bar Container */}
        <div className="w-48 h-[2px] bg-slate-100 rounded-[30px] overflow-hidden">
           <div className="loader-progress h-full bg-black w-0" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
