// Subtle ambient background: drifting crochet petals + soft bokeh + grain.
// Server-rendered with deterministic values (no hydration mismatch).
// Sits behind all content, never blocks clicks, hides under reduced-motion.

function rand(seed: number) {
  const x = Math.sin(seed * 753.91) * 10000;
  return x - Math.floor(x);
}

const PETAL_COUNT = 12;
const BOKEH_COUNT = 6;

const petalColors = [
  "var(--c-terracotta-light)",
  "var(--c-mustard)",
  "var(--c-sage)",
];

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const left = rand(i + 2) * 100;
  const size = 10 + rand(i + 5) * 14;
  const dur = 22 + rand(i + 8) * 20;
  const delay = rand(i + 11) * 24;
  const drift = (rand(i + 14) - 0.5) * 160;
  const spin = 5 + rand(i + 17) * 6;
  const color = petalColors[i % petalColors.length];
  const maxOp = 0.28 + rand(i + 19) * 0.22;
  return { left, size, dur, delay, drift, spin, color, maxOp };
});

const bokeh = Array.from({ length: BOKEH_COUNT }, (_, i) => {
  const top = rand(i + 31) * 100;
  const left = rand(i + 37) * 100;
  const size = 90 + rand(i + 41) * 140;
  const dur = 22 + rand(i + 43) * 16;
  const delay = rand(i + 47) * 12;
  const bx = (rand(i + 53) - 0.5) * 90;
  const by = (rand(i + 59) - 0.5) * 90;
  return { top, left, size, dur, delay, bx, by };
});

// A small soft 5-petal crochet flower shape.
function PetalShape({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <g fill={`rgb(${color})`}>
        <circle cx="12" cy="6" r="4" />
        <circle cx="18" cy="12" r="4" />
        <circle cx="12" cy="18" r="4" />
        <circle cx="6" cy="12" r="4" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="rgb(var(--c-mustard))" />
    </svg>
  );
}

export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      {bokeh.map((b, i) => (
        <span
          key={`b-${i}`}
          className="bokeh"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            height: `${b.size}px`,
            width: `${b.size}px`,
            ["--dur" as string]: `${b.dur}s`,
            ["--delay" as string]: `${b.delay}s`,
            ["--bx" as string]: `${b.bx}px`,
            ["--by" as string]: `${b.by}px`,
          }}
        />
      ))}

      {petals.map((p, i) => (
        <span
          key={`p-${i}`}
          className="petal"
          style={{
            left: `${p.left}%`,
            ["--dur" as string]: `${p.dur}s`,
            ["--delay" as string]: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.spin}s`,
            ["--max-op" as string]: p.maxOp,
          }}
        >
          <PetalShape size={p.size} color={p.color} />
        </span>
      ))}

      <span className="grain" />
    </div>
  );
}
