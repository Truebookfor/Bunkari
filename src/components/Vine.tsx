// Decorative climbing vine (bel) with leaves & small flowers — feminine accent.
// Place inside a `relative` parent and position via className.

export default function Vine({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 220"
      aria-hidden="true"
      className={`pointer-events-none select-none ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      {/* main stem climbing upward */}
      <path
        className="vine-stem"
        d="M30 220 C 14 190 46 170 28 140 C 12 112 48 96 30 66 C 16 40 42 26 30 2"
      />
      {/* leaves */}
      <g className="vine-leaf" style={{ animationDelay: "0s" }}>
        <path d="M30 188 C 12 184 4 168 6 156 C 22 158 32 172 30 188 Z" />
      </g>
      <g className="vine-leaf" style={{ animationDelay: "0.8s" }}>
        <path d="M30 150 C 48 146 56 130 54 118 C 38 120 28 134 30 150 Z" />
      </g>
      <g className="vine-leaf" style={{ animationDelay: "1.4s" }}>
        <path d="M30 110 C 12 106 4 90 6 78 C 22 80 32 94 30 110 Z" />
      </g>
      <g className="vine-leaf" style={{ animationDelay: "2s" }}>
        <path d="M30 70 C 48 66 56 50 54 38 C 38 40 28 54 30 70 Z" />
      </g>
      {/* small flowers */}
      <g className="vine-flower" style={{ transformOrigin: "30px 130px" }}>
        <circle cx="30" cy="126" r="3.4" />
        <circle cx="34" cy="130" r="3.4" />
        <circle cx="30" cy="134" r="3.4" />
        <circle cx="26" cy="130" r="3.4" />
        <circle cx="30" cy="130" r="2.2" className="fill-mustard" />
      </g>
      <g className="vine-flower">
        <circle cx="30" cy="24" r="3.4" />
        <circle cx="34" cy="28" r="3.4" />
        <circle cx="30" cy="32" r="3.4" />
        <circle cx="26" cy="28" r="3.4" />
        <circle cx="30" cy="28" r="2.2" className="fill-mustard" />
      </g>
    </svg>
  );
}
