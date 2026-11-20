const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return true;
  if (!window.matchMedia) return false;

  return window.matchMedia(REDUCED_QUERY).matches;
};

export const isMotionDisabled = (): boolean => {
  if (typeof window === 'undefined') return true;
  if (!window.matchMedia) return false;

  return window.matchMedia(MOBILE_QUERY).matches || isReducedMotion();
};
