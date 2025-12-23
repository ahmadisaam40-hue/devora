import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.round(obj.value));
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [end, duration]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;