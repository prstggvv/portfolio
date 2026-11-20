import { gsap, SplitText } from './register';
import { isMotionDisabled } from './motionState';

export const EASE_OUT = 'power3.out';
export const EASE_SOFT = 'power2.out';
export const EASE_EXPO = 'expo.out';
export const EASE_BACK = 'back.out(1.6)';

export const START = 'top 82%';
export const START_DEEP = 'top 74%';

export interface IRevealVars {
  trigger?: Element | null;
  start?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  y?: number;
  ease?: string;
}

export const scrollOnce = (
  trigger?: Element | null,
  start: string = START,
): ScrollTrigger.Vars => (trigger ? { trigger, start, once: true } : { start, once: true });

export const revealFadeUp = (
  targets: gsap.TweenTarget,
  {
    trigger,
    start = START,
    duration = 0.7,
    delay = 0,
    stagger = 0,
    y = 40,
    ease = EASE_OUT,
  }: IRevealVars = {},
): gsap.core.Tween | null => {
  if (!targets || isMotionDisabled()) return null;

  return gsap.from(targets, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease,
    scrollTrigger: scrollOnce(trigger, start),
  });
};

export const revealScaleIn = (
  targets: gsap.TweenTarget,
  {
    trigger,
    start = START,
    duration = 0.75,
    delay = 0,
    stagger = 0,
    ease = EASE_OUT,
  }: IRevealVars = {},
): gsap.core.Tween | null => {
  if (!targets || isMotionDisabled()) return null;

  return gsap.from(targets, {
    opacity: 0,
    scale: 0.95,
    duration,
    delay,
    stagger,
    ease,
    scrollTrigger: scrollOnce(trigger, start),
  });
};

export const splitLines = (element: Element | null): SplitText | null => {
  if (!element || isMotionDisabled()) return null;

  return SplitText.create(element, { type: 'lines', mask: 'lines' });
};

export const splitWords = (element: Element | null): SplitText | null => {
  if (!element || isMotionDisabled()) return null;

  return SplitText.create(element, { type: 'words' });
};

export const LINES_FROM: gsap.TweenVars = {
  yPercent: 120,
  skewY: 7,
  opacity: 0,
  filter: 'blur(10px)',
  duration: 1.1,
  stagger: 0.09,
  ease: EASE_EXPO,
};

export const WORDS_FROM: gsap.TweenVars = {
  yPercent: 55,
  opacity: 0,
  filter: 'blur(5px)',
  duration: 0.65,
  stagger: 0.022,
  ease: EASE_SOFT,
};

export const wipeFrom = (isReversed: boolean): string =>
  isReversed ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';

export const WIPE_TO = 'inset(0% 0% 0% 0%)';

export const revertSplits = (splits: (SplitText | null)[]): void => {
  splits.forEach((split) => split?.revert());
};
