import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  style?: CSSProperties;
}

const ParallaxSection = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  style,
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const yMovement = direction === "up" ? -100 * speed : 100 * speed;

    gsap.to(element, {
      y: yMovement,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return (
    <div ref={sectionRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default ParallaxSection;