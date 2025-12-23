import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
  delay?: number;
}

const StaggerContainer = ({
  children,
  className = "",
  stagger = 0.1,
  animation = "fade-up",
  delay = 0,
}: StaggerContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children;
    
    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration: 0.6,
      ease: "power3.out",
      stagger,
    };

    switch (animation) {
      case "fade-up":
        fromVars = { opacity: 0, y: 50 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "fade-in":
        fromVars = { opacity: 0 };
        toVars = { ...toVars, opacity: 1 };
        break;
      case "scale":
        fromVars = { opacity: 0, scale: 0.8 };
        toVars = { ...toVars, opacity: 1, scale: 1 };
        break;
      case "slide-left":
        fromVars = { opacity: 0, x: 60 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "slide-right":
        fromVars = { opacity: 0, x: -60 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
    }

    gsap.set(items, fromVars);

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(items, { ...toVars, delay });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [animation, stagger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default StaggerContainer;