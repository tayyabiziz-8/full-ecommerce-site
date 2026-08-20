import { useRef } from "react";
import { Link } from "react-router-dom";
import { useCarousel } from "../../hooks/useCarousel.js";

export default function HeroCarousel({ slides }) {
  const { index, goTo, next, prev, setIsPaused, prefersReducedMotion } = useCarousel({
    slideCount: slides.length,
    autoplayMs: 5500,
  });

  const dragStartX = useRef(null);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX;
  };
  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
    dragStartX.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const slide = slides[index];

  return (
    <section
      className="relative h-[70vh] min-h-[420px] w-full select-none overflow-hidden bg-ink"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(23,24,28,0.55), rgba(23,24,28,0.15)), url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16">
            <span className="eyebrow text-paper/80">{s.eyebrow}</span>
            <h2 className="mt-2 max-w-xl font-display text-4xl font-semibold text-paper md:text-5xl">
              {s.title}
            </h2>
            <p className="mt-3 max-w-md text-paper/85">{s.description}</p>
            <Link
              to={s.href}
              className="mt-6 inline-flex w-fit items-center rounded bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent/90"
            >
              {s.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* live region for screen readers */}
      <p className="sr-only" aria-live="polite">
        {slide.title}
      </p>

      {/* index + progress tabs, bottom-left — a real sequence, so numbering earns its place */}
      <div className="absolute bottom-6 left-6 flex items-center gap-4">
        <span className="font-display text-xs tabular-nums text-paper/70">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === index}
              className="relative h-[3px] w-10 overflow-hidden rounded-full bg-paper/30"
            >
              {i === index && !prefersReducedMotion && (
                <span
                  key={index}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-paper"
                  style={{ animation: "carousel-progress 5.5s linear" }}
                />
              )}
              {i === index && prefersReducedMotion && (
                <span className="absolute inset-0 bg-paper" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* prev/next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-paper/40 p-2 text-paper transition-colors hover:border-paper md:block"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-paper/40 p-2 text-paper transition-colors hover:border-paper md:block"
      >
        ›
      </button>

      <style>{`
        @keyframes carousel-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}