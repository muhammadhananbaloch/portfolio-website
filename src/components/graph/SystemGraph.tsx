import { useRef, useCallback } from "react";
import { NODES, EDGES } from "./graphData";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import DataPacket from "./DataPacket";

interface SystemGraphProps {
  visibleTier: number;
  highlightedNodes?: string[];
  dimmed?: boolean;
  packetsActive?: boolean;
  genesisNode?: string;
  style?: React.CSSProperties;
  className?: string;
}

const SystemGraph = ({
  visibleTier,
  highlightedNodes = [],
  dimmed = false,
  packetsActive = false,
  genesisNode,
  style,
  className = "",
}: SystemGraphProps) => {
  const nodeEls = useRef<Record<string, HTMLDivElement | null>>({});

  const handleNodeFlash = useCallback((id: string) => {
    const el = nodeEls.current[id];
    if (!el || el.classList.contains("sg-node--lit")) return;
    el.classList.add("sg-node--lit");
    setTimeout(() => el?.classList.remove("sg-node--lit"), 300);
  }, []);

  const hasHighlights = highlightedNodes.length > 0;

  return (
    <div className={`sg-container ${className}`} style={style}>
      <svg
        className="sg-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {EDGES.map((e, i) => (
          <GraphEdge
            key={`${e.from}-${e.to}`}
            from={e.from}
            to={e.to}
            visible={visibleTier >= e.tier}
            flowing={packetsActive}
            index={i}
          />
        ))}
      </svg>

      {NODES.map((n) => (
        <GraphNode
          key={n.id}
          id={n.id}
          label={n.label}
          x={n.x}
          y={n.y}
          visible={visibleTier >= n.tier}
          highlighted={hasHighlights && highlightedNodes.includes(n.id)}
          dimmed={dimmed || (hasHighlights && !highlightedNodes.includes(n.id))}
          genesis={genesisNode === n.id}
          nodeRef={(el) => {
            nodeEls.current[n.id] = el;
          }}
        />
      ))}

      <DataPacket active={packetsActive} onNodeFlash={handleNodeFlash} />
    </div>
  );
};

export default SystemGraph;
