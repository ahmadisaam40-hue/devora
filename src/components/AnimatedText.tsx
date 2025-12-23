import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "chars" | "words" | "lines";
  animation?: "wave" | "fade" | "slide" | "bounce" | "glitch";
  stagger?: number;
  delay?: number;
}

const AnimatedText = ({
  text,
  className = "",
  type = "chars",
  animation = "fade",
  stagger = 0.03,
  delay = 0,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".animated-char");
    
    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration: 0.6,
      ease: "power3.out",
      stagger,
    };

    switch (animation) {
      case "wave":
        fromVars = { opacity: 0, y: 50, rotationX: -90 };
        toVars = { ...toVars, opacity: 1, y: 0, rotationX: 0, ease: "back.out(1.7)" };
        break;
      case "fade":
        fromVars = { opacity: 0, y: 20 };
        toVars = { ...toVars, opacity: 1, y: 0 };
        break;
      case "slide":
        fromVars = { opacity: 0, x: -30 };
        toVars = { ...toVars, opacity: 1, x: 0 };
        break;
      case "bounce":
        fromVars = { opacity: 0, y: -40, scale: 0.5 };
        toVars = { ...toVars, opacity: 1, y: 0, scale: 1, ease: "bounce.out" };
        break;
      case "glitch":
        fromVars = { opacity: 0, x: () => gsap.utils.random(-20, 20), skewX: 20 };
        toVars = { ...toVars, opacity: 1, x: 0, skewX: 0, ease: "power4.out" };
        break;
    }

    gsap.set(elements, fromVars);
    
    const tl = gsap.timeline({ delay });
    tl.to(elements, toVars);

    return () => {
      tl.kill();
    };
  }, [animation, stagger, delay]);

  const splitText = () => {
    if (type === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="animated-char inline-block" style={{ marginRight: "0.25em" }}>
          {word}
        </span>
      ));
    }
    if (type === "lines") {
      return text.split("\n").map((line, i) => (
        <span key={i} className="animated-char block">
          {line}
        </span>
      ));
    }
    // chars
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="animated-char inline-block"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {splitText()}
    </span>
  );
};

export default AnimatedText;