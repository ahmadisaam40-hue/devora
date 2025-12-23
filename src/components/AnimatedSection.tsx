import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 
    | "fade-up" 
    | "fade-left" 
    | "fade-right" 
    | "fade-down"
    | "scale" 
    | "scale-rotate"
    | "stagger"
    | "blur-in"
    | "slide-up"
    | "flip"
    | "bounce"
    | "elastic";
  delay?: number;
  duration?: number;
  scrub?: boolean;
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  scrub = false,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration,
      ease: "power3.out",
      delay,
    };

    switch (animation) {
      case "fade-up":
        fromVars = { opacity: 0, y: 60 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "fade-down":
        fromVars = { opacity: 0, y: -60 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "fade-left":
        fromVars = { opacity: 0, x: -80 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "fade-right":
        fromVars = { opacity: 0, x: 80 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "scale":
        fromVars = { opacity: 0, scale: 0.8 };
        toVars = { ...toVars, opacity: 1, scale: 1 };
        break;
      case "scale-rotate":
        fromVars = { opacity: 0, scale: 0.8, rotation: -10 };
        toVars = { ...toVars, opacity: 1, scale: 1, rotation: 0 };
        break;
      case "stagger":
        fromVars = { opacity: 0, y: 40 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "blur-in":
        fromVars = { opacity: 0, filter: "blur(20px)", y: 30 };
        toVars = { ...toVars, opacity: 1, filter: "blur(0px)", y: 0 };
        break;
      case "slide-up":
        fromVars = { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" };
        toVars = { ...toVars, opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" };
        break;
      case "flip":
        fromVars = { opacity: 0, rotationX: 90, transformPerspective: 1000 };
        toVars = { ...toVars, opacity: 1, rotationX: 0 };
        break;
      case "bounce":
        fromVars = { opacity: 0, y: 80, scale: 0.9 };
        toVars = { ...toVars, opacity: 1, y: 0, scale: 1, ease: "bounce.out" };
        break;
      case "elastic":
        fromVars = { opacity: 0, scale: 0.5 };
        toVars = { ...toVars, opacity: 1, scale: 1, ease: "elastic.out(1, 0.5)", duration: 1.2 };
        break;
    }

    gsap.set(element, fromVars);

    if (scrub) {
      gsap.to(element, {
        ...toVars,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      });
    } else {
      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => {
          gsap.to(element, toVars);
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, scrub]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedSection;