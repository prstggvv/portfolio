import { useRef } from 'react';
import cls from './TitleSecondPage.module.css'
import { classNames } from '../../lib/classNames/classNames';
import {
  gsap,
  useGSAP,
  isMotionDisabled,
  splitLines,
  splitWords,
  revertSplits,
  LINES_FROM,
  WORDS_FROM,
  START,
} from '../../lib/gsap';
import { useFontsReady } from '../../lib/hooks/useFontsReady';

interface ITitleSecondPage {
  className?: string;
  title: string;
  subtitle?: string;
  isWhite: boolean;
}

const TitleSecondPage = ({
  className,
  title,
  subtitle,
  isWhite,
}: ITitleSecondPage) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const isFontsReady = useFontsReady();

  useGSAP(
    () => {
      if (!isFontsReady || isMotionDisabled()) return;

      const splits = [splitLines(titleRef.current), splitWords(introRef.current)];
      const [titleSplit, introSplit] = splits;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: START,
          once: true,
        },
        onComplete: () => revertSplits(splits),
      });

      if (titleSplit) {
        tl.from(titleSplit.lines, LINES_FROM, 0);
      }

      if (introSplit) {
        tl.from(introSplit.words, WORDS_FROM, 0.3);
      }

      return () => revertSplits(splits);
    },
    { scope: rootRef, dependencies: [title, subtitle, isFontsReady] },
  );

  return (
    <div ref={rootRef} className={classNames(cls.block, {}, [className ?? ''])}>
      <h2 ref={titleRef} className={classNames(cls.title, { [cls.white]: isWhite }, [])}>
        {title}
      </h2>

      <p ref={introRef} className={classNames(cls.intro, { [cls.white]: isWhite }, [])}>
        {subtitle}
      </p>
    </div>
  )
};

export default TitleSecondPage;
