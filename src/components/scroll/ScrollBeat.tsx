import { ReactNode } from "react";
import { MotionValue } from "framer-motion";
import { useScrollProgress } from "./useScrollProgress";

interface ScrollBeatProps {
  scrollHeight: number;
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
  id?: string;
  offset?: [string, string];
  containerBg?: string;
}

const ScrollBeat = ({ scrollHeight, children, className, id, offset, containerBg }: ScrollBeatProps) => {
  const { containerRef, progress } = useScrollProgress(offset);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`beat ${className || ""}`}
      style={{ height: `${scrollHeight}vh`, position: "relative", backgroundColor: containerBg }}
    >
      <div
        className="beat__sticky"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {children(progress)}
      </div>
    </div>
  );
};

export default ScrollBeat;
