import type { MouseEvent } from 'react';
import type Lenis from 'lenis';
import { isReducedMotion } from '../gsap/motionState';

let lenisInstance: Lenis | null = null;

const SCROLL_DURATION = 1.2;
const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const setLenis = (instance: Lenis | null): void => {
  lenisInstance = instance;
};

const getFixedHeaderOffset = (): number => {
  const header = document.querySelector('header');
  if (!header) return 0;

  const { position } = window.getComputedStyle(header);
  if (position !== 'fixed' && position !== 'sticky') return 0;

  return header.getBoundingClientRect().height;
};

export const scrollToSection = (sectionId: string): void => {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const offset = -getFixedHeaderOffset();

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset,
      duration: SCROLL_DURATION,
      easing: easeOutExpo,
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: isReducedMotion() ? 'auto' : 'smooth',
  });
};

export const handleSectionLinkClick = (
  event: MouseEvent<HTMLAnchorElement>,
  sectionId: string,
): void => {
  event.preventDefault();
  scrollToSection(sectionId);
};
