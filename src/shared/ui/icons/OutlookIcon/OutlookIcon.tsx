import cls from './OutlookIcon.module.css';
import { classNames } from '../../../lib/classNames/classNames';

interface IOutlookIconProps {
  className?: string;
}

const OutlookIcon = ({ className }: IOutlookIconProps) => {
  return (
    <svg
      className={classNames(cls.svg, {}, [className ?? ''])}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 5.5L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
};

export default OutlookIcon;
