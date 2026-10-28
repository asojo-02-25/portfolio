import { useEffect, useRef, useState } from 'react';

const screenshots = [
  ['01-play', 'law_typing typing practice screen'],
  ['02-settings', 'law_typing game settings'],
  ['03-results', 'law_typing results and speed graph'],
  ['04-history', 'law_typing practice history'],
];

export default function ProjectGallery() {
  const viewport = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const resumeAt = useRef(0);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    let position = el.clientWidth * screenshots.length;
    el.scrollLeft = position;

    const tick = (now: number) => {
      const period = el.clientWidth * screenshots.length;
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (
        !pausedRef.current &&
        !reducedMotion.matches &&
        !interacting.current &&
        now > resumeAt.current &&
        !document.hidden
      ) {
        position += elapsed * 0.05;
        if (position >= period * 2) position -= period;
        el.scrollLeft = position;
      } else {
        position = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      position = el.clientWidth * screenshots.length;
      el.scrollLeft = position;
    });
    resize.observe(el);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  }, []);

  const delayResume = () => {
    resumeAt.current = performance.now() + 2500;
  };
  const normalize = () => {
    const el = viewport.current;
    if (!el) return;
    const period = el.clientWidth * screenshots.length;
    if (!period) return;
    let shift = 0;
    if (el.scrollLeft < period / 2) shift = period;
    if (el.scrollLeft > period * 2.5) shift = -period;
    if (shift) {
      el.scrollLeft += shift;
      if (drag.current) drag.current.scroll += shift;
    }
  };

  return (
    <div className="project-gallery">
      <div
        ref={viewport}
        className="gallery-viewport"
        role="region"
        aria-label="law_typing screenshots. Scroll left or right to browse."
        tabIndex={0}
        onScroll={normalize}
        onPointerEnter={() => {
          interacting.current = true;
        }}
        onPointerLeave={() => {
          if (!drag.current) {
            interacting.current = false;
            delayResume();
          }
        }}
        onFocus={() => {
          interacting.current = true;
        }}
        onBlur={() => {
          interacting.current = false;
          delayResume();
        }}
        onWheel={delayResume}
        onPointerDown={(event) => {
          interacting.current = true;
          if (event.pointerType !== 'mouse') return;
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = {
            x: event.clientX,
            scroll: event.currentTarget.scrollLeft,
          };
        }}
        onPointerMove={(event) => {
          if (drag.current)
            event.currentTarget.scrollLeft =
              drag.current.scroll + drag.current.x - event.clientX;
        }}
        onPointerUp={() => {
          drag.current = null;
          interacting.current = false;
          delayResume();
        }}
        onPointerCancel={() => {
          drag.current = null;
          interacting.current = false;
          delayResume();
        }}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          event.currentTarget.scrollLeft +=
            (event.key === 'ArrowRight' ? 1 : -1) *
            event.currentTarget.clientWidth *
            0.6;
          delayResume();
        }}
      >
        {[0, 1, 2].flatMap((copy) =>
          screenshots.map(([file, description]) => (
            <div
              className="gallery-slide"
              key={`${copy}-${file}`}
              aria-hidden={copy !== 1 ? true : undefined}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/law-typing/${file}.png`}
                alt={copy === 1 ? description : ''}
                width="1280"
                height="864"
                draggable={false}
              />
            </div>
          )),
        )}
      </div>
      <button
        className="gallery-toggle"
        type="button"
        aria-label={
          paused ? 'Play automatic scrolling' : 'Pause automatic scrolling'
        }
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      </button>
    </div>
  );
}
