import { useEffect, useRef } from 'react';

const screenshots = [
  ['01-play', 'law_typing typing practice screen'],
  ['02-settings', 'law_typing game settings'],
  ['03-results', 'law_typing results and speed graph'],
  ['04-history', 'law_typing practice history'],
];

function loopWidth(el: HTMLDivElement) {
  const first = el.children[0]?.getBoundingClientRect();
  const second = el.children[1]?.getBoundingClientRect();
  return (
    (first && second ? second.left - first.left : el.clientWidth / 2) *
    screenshots.length
  );
}

export default function ProjectGallery({
  withinLink = false,
}: {
  withinLink?: boolean;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const resumeAt = useRef(0);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    let position = loopWidth(el);
    el.scrollLeft = position;

    const tick = (now: number) => {
      const period = loopWidth(el);
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (
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
      position = loopWidth(el);
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
    const period = loopWidth(el);
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
        tabIndex={withinLink ? undefined : 0}
        onClick={(event) => {
          if (dragged.current && event.detail !== 0) event.preventDefault();
          dragged.current = false;
        }}
        onScroll={normalize}
        onPointerEnter={delayResume}
        onPointerLeave={() => {
          if (!drag.current) {
            interacting.current = false;
            delayResume();
          }
        }}
        onFocus={delayResume}
        onBlur={() => {
          interacting.current = false;
          delayResume();
        }}
        onWheel={delayResume}
        onPointerDown={(event) => {
          pointerStart.current = { x: event.clientX, y: event.clientY };
          dragged.current = false;
          interacting.current = true;
          if (event.pointerType !== 'mouse') return;
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = {
            x: event.clientX,
            scroll: event.currentTarget.scrollLeft,
          };
        }}
        onPointerMove={(event) => {
          if (
            pointerStart.current &&
            Math.hypot(
              event.clientX - pointerStart.current.x,
              event.clientY - pointerStart.current.y,
            ) > 6
          )
            dragged.current = true;
          if (drag.current)
            event.currentTarget.scrollLeft =
              drag.current.scroll + drag.current.x - event.clientX;
        }}
        onPointerUp={() => {
          pointerStart.current = null;
          drag.current = null;
          interacting.current = false;
          delayResume();
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
          dragged.current = true;
          drag.current = null;
          interacting.current = false;
          delayResume();
        }}
        onLostPointerCapture={() => {
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
    </div>
  );
}
