import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import cls from './PageLoader.module.css';
import { classNames } from '../../../lib/classNames/classNames';
import { gsap, useGSAP } from '../../../lib/gsap';
import { useIsMobile } from '../../../lib/hooks/useIsMobile';

interface IPageLoaderProps {
  onFinish?: () => void;
  minDuration?: number;
  className?: string;
}

type Stage = 'loading' | 'wiping' | 'done';

const SCORE_STEPS = ['0', '15', '30', '40', 'GAME'] as const;

const DESKTOP_GRID = { cols: 8, rows: 5 };
const MOBILE_GRID = { cols: 4, rows: 7 };

const TILE_DURATION = 0.5;
const COLUMN_STEP = 0.05;
const ROW_STEP = 0.022;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const getScoreIndex = (progress: number) => {
  if (progress >= 100) return SCORE_STEPS.length - 1;
  return Math.min(SCORE_STEPS.length - 2, Math.floor(progress / 25));
};

export const PageLoader = ({ onFinish, minDuration = 400, className }: IPageLoaderProps) => {
  const [stage, setStage] = useState<Stage>('loading');
  const [progress, setProgress] = useState(0);
  const reduced = useRef(prefersReducedMotion());
  const isMobile = useIsMobile();

  const rootRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  const { cols, rows } = isMobile ? MOBILE_GRID : DESKTOP_GRID;
  const tiles = useMemo(() => Array.from({ length: cols * rows }, (_, index) => index), [cols, rows]);
  const scoreIndex = getScoreIndex(progress);

  useEffect(() => {
    let raf = 0;
    let current = 0;
    const start = performance.now();
    let loaded = document.readyState === 'complete';

    const handleLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', handleLoad);

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeTarget = Math.min(92, (elapsed / minDuration) * 100);
      const target = loaded && elapsed >= minDuration ? 100 : timeTarget;

      current += (target - current) * 0.14;
      if (target === 100 && 100 - current < 1) current = 100;

      setProgress(Math.round(current));

      if (current >= 100) {
        setStage('wiping');
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', handleLoad);
    };
  }, [minDuration]);

  useGSAP(
    () => {
      if (!reelRef.current) return;

      gsap.to(reelRef.current, {
        yPercent: -scoreIndex * (100 / SCORE_STEPS.length),
        duration: reduced.current ? 0 : 0.42,
        ease: 'power3.out',
        overwrite: true,
      });
    },
    { dependencies: [scoreIndex] },
  );

  useGSAP(
    () => {
      if (stage !== 'wiping' || !rootRef.current || !tilesRef.current || !contentRef.current) return;

      const finish = () => {
        setStage('done');
        onFinish?.();
      };

      if (reduced.current) {
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: finish,
        });
        return;
      }

      gsap
        .timeline({ onComplete: finish })
        .to(contentRef.current, {
          autoAlpha: 0,
          y: -14,
          duration: 0.26,
          ease: 'power2.in',
        })
        .to(
          tilesRef.current.children,
          {
            yPercent: 118,
            autoAlpha: 0,
            duration: TILE_DURATION,
            ease: 'power3.in',
            stagger: (index: number) => {
              const column = index % cols;
              const row = Math.floor(index / cols);
              return column * COLUMN_STEP + row * ROW_STEP;
            },
          },
          '-=0.1',
        );
    },
    { scope: rootRef, dependencies: [stage] },
  );

  useEffect(() => {
    if (stage === 'done') return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [stage]);

  if (stage === 'done') return null;

  return (
    <div
      ref={rootRef}
      className={classNames(cls.loader, { [cls.mobile]: isMobile }, [className ?? ''])}
      role="progressbar"
      aria-busy={stage === 'loading'}
      aria-live="polite"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Загрузка сайта"
    >
      <div
        ref={tilesRef}
        className={cls.tiles}
        style={{ '--pl-cols': cols, '--pl-rows': rows } as CSSProperties}
        aria-hidden="true"
      >
        {tiles.map((index) => (
          <span key={index} className={cls.tile} />
        ))}
      </div>

      <div ref={contentRef} className={cls.content}>
        <span className={cls.brand}>Еркеева Александра</span>

        <div className={cls.panel}>
          <div className={cls.score} aria-hidden="true">
            <div ref={reelRef} className={cls.reel}>
              {SCORE_STEPS.map((step, index) => (
                <span
                  key={step}
                  className={classNames(cls.scoreItem, { [cls.scoreItemActive]: index === scoreIndex }, [])}
                >
                  {step}
                </span>
              ))}
            </div>
          </div>

          <div className={cls.track} aria-hidden="true">
            <span className={cls.trackFill} style={{ transform: `scaleX(${progress / 100})` }} />
            <span className={cls.ball} style={{ left: `${progress}%` }} />
          </div>

          <div className={cls.meta} aria-hidden="true">
            <span className={cls.metaLabel}>Loading</span>
            <span className={cls.metaValue}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
