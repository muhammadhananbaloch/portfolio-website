import { useEffect, useRef, useCallback } from "react";
import { PACKET_PATHS, PACKET_CYCLE, PACKET_TRAVEL, posOnEdge } from "./graphData";

interface DataPacketProps {
  active: boolean;
  onNodeFlash?: (id: string) => void;
}

const DataPacket = ({ active, onNodeFlash }: DataPacketProps) => {
  const packetEl = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const flashedInCycle = useRef(new Set<string>());

  const flash = useCallback(
    (id: string) => {
      onNodeFlash?.(id);
    },
    [onNodeFlash]
  );

  useEffect(() => {
    if (!active) {
      if (packetEl.current) packetEl.current.style.opacity = "0";
      return;
    }
    let alive = true;
    const t0 = performance.now();

    const tick = (now: number) => {
      if (!alive) return;
      const total = now - t0;
      const cycle = Math.floor(total / PACKET_CYCLE);
      const elapsed = total - cycle * PACKET_CYCLE;
      const path = PACKET_PATHS[cycle % PACKET_PATHS.length];

      if (elapsed < PACKET_TRAVEL) {
        const segs = path.length - 1;
        const segDur = PACKET_TRAVEL / segs;
        const si = Math.min(Math.floor(elapsed / segDur), segs - 1);
        const t = (elapsed - si * segDur) / segDur;
        const pos = posOnEdge(path[si], path[si + 1], t);

        if (packetEl.current) {
          packetEl.current.style.left = `${pos.x}%`;
          packetEl.current.style.top = `${pos.y}%`;
          packetEl.current.style.opacity = "1";
        }

        if (si === 0 && t < 0.05 && !flashedInCycle.current.has(path[0])) {
          flash(path[0]);
          flashedInCycle.current.add(path[0]);
        }
        if (t > 0.88 && !flashedInCycle.current.has(path[si + 1])) {
          flash(path[si + 1]);
          flashedInCycle.current.add(path[si + 1]);
        }
      } else {
        if (packetEl.current) packetEl.current.style.opacity = "0";
        flashedInCycle.current.clear();
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [active, flash]);

  return <div ref={packetEl} className="sg-packet" />;
};

export default DataPacket;
