// Decorative night sky shown only in dark mode (controlled via CSS `html.dark`).
// Server-rendered with deterministic star positions to avoid hydration mismatch.

const STAR_COUNT = 60;

// Deterministic pseudo-random so server & client render the same markup.
function rand(seed: number) {
  const x = Math.sin(seed * 999.13) * 10000;
  return x - Math.floor(x);
}

const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
  const top = rand(i + 1) * 100;
  const left = rand(i + 7) * 100;
  const size = 1 + rand(i + 3) * 2.4;
  const delay = rand(i + 5) * 4;
  const dur = 2.4 + rand(i + 9) * 3.2;
  // Keep most stars in the upper/roof area
  const weightedTop = top * 0.7;
  return { top: weightedTop, left, size, delay, dur };
});

export default function StarryNight() {
  return (
    <div className="night-sky" aria-hidden="true">
      <span className="moon" />
      <span className="shooting" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            height: `${s.size}px`,
            width: `${s.size}px`,
            // CSS custom props for per-star animation timing
            ["--delay" as string]: `${s.delay}s`,
            ["--dur" as string]: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
