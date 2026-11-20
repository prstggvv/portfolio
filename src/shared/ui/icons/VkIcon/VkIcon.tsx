import cls from './VkIcon.module.css';
import { classNames } from '../../../lib/classNames/classNames';

interface VkIconProps {
  className?: string;
}

const VkIcon = ({ className }: VkIconProps) => {
  return (
    <svg
      className={classNames(cls.svg, {}, [className ?? ''])}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.05 18.36c-6.03 0-9.9-4.13-10.05-11h3.03c.1 5.04 2.42 7.2 4.2 7.64V7.36h2.86v4.28c1.72-.18 3.53-2.11 4.14-4.28h2.85c-.47 2.66-2.4 4.59-3.77 5.38 1.37.64 3.57 2.33 4.42 5.62h-3.14c-.66-2.05-2.3-3.64-4.5-3.85v3.85h-.99z" />
    </svg>
  )
};

export default VkIcon;
