import { useRef } from 'react';
import cls from './TitleFirstPage.module.css';
import { classNames } from '../../lib/classNames/classNames';
import { gsap, useGSAP, isMotionDisabled, EASE_EXPO, START } from '../../lib/gsap';

interface ITitleFirstPageProps {
  className?: string;
  title: string;
  subtitle: string;
}

const TitleFirstPage = ({
  className,
  title,
  subtitle,
}: ITitleFirstPageProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLHeadingElement>(null);
  const rangeRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (isMotionDisabled()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: START,
          once: true,
        },
        defaults: { ease: EASE_EXPO },
      });

      tl.from([kickerRef.current, rangeRef.current], {
        opacity: 0,
        y: 14,
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: 0.85,
        stagger: 0.18,
      }).from(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center', duration: 0.95 },
        0.15,
      );
    },
    { scope: rootRef, dependencies: [title, subtitle] },
  );

  return (
    <div ref={rootRef} className={classNames(cls.head, {}, [className ?? ''])}>
      <h2 ref={kickerRef} className={classNames(cls.kicker, {}, [])}>
        {title}
      </h2>
      <span ref={rangeRef} className={classNames(cls.range, {}, [])}>
        ({subtitle})
      </span>
      <span ref={lineRef} className={classNames(cls.line, {}, [])} aria-hidden="true" />
    </div>
  )
};

export default TitleFirstPage;
