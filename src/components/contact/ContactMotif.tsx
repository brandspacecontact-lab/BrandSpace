/**
 * Quiet "communication network" for the contact hero: nodes, links and the
 * routes leading into the green hub. Pure SVG, static and decorative.
 */
const NODES: [number, number][] = [
  [40, 70], [150, 34], [262, 92], [214, 196], [92, 176],
  [334, 214], [388, 76], [300, 306], [158, 290], [428, 172],
];
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 6], [3, 5], [5, 7], [7, 8], [8, 4], [6, 9], [9, 5], [1, 3],
];
/** Links that lead into the hub (node 3), drawn in brand green. */
const ROUTES: [number, number][] = [
  [0, 3], [6, 3], [7, 3], [9, 3], [8, 3],
];
const HUB = 3;

export function ContactMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 470 340" className={className} aria-hidden fill="none">
      <g stroke="#f3f4ef" strokeOpacity="0.1">
        {LINKS.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={NODES[a]![0]} y1={NODES[a]![1]} x2={NODES[b]![0]} y2={NODES[b]![1]} />
        ))}
      </g>
      <g stroke="#5bd17b" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round">
        {ROUTES.map(([a, b]) => (
          <line key={`r-${a}`} x1={NODES[a]![0]} y1={NODES[a]![1]} x2={NODES[b]![0]} y2={NODES[b]![1]} />
        ))}
      </g>
      {NODES.map(([x, y], i) =>
        i === HUB ? (
          <g key={i}>
            <circle cx={x} cy={y} r="16" stroke="#5bd17b" strokeOpacity="0.45" />
            <circle cx={x} cy={y} r="7" fill="#5bd17b" />
          </g>
        ) : (
          <circle key={i} cx={x} cy={y} r="3.2" fill="#f3f4ef" fillOpacity="0.35" />
        ),
      )}
    </svg>
  );
}
