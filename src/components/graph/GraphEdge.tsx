import { BY_ID, edgePath } from "./graphData";

interface GraphEdgeProps {
  from: string;
  to: string;
  visible: boolean;
  flowing: boolean;
  drawMs?: number;
  index?: number;
}

const GraphEdge = ({ from, to, visible, flowing, drawMs = 500, index = 0 }: GraphEdgeProps) => {
  const a = BY_ID[from];
  const b = BY_ID[to];
  if (!a || !b) return null;
  const d = edgePath(a, b);

  return (
    <g>
      <path
        d={d}
        className="sg-edge"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={visible ? 0 : 1}
        style={{
          transition: `stroke-dashoffset ${drawMs}ms cubic-bezier(0.22,1,0.36,1)`,
        }}
        vectorEffect="non-scaling-stroke"
      />
      {flowing && (
        <path
          d={d}
          className="sg-edge-flow"
          vectorEffect="non-scaling-stroke"
          style={{ animationDelay: `${index * -0.5}s` }}
        />
      )}
    </g>
  );
};

export default GraphEdge;
