import cls from './TelegramIcon.module.css';
import { classNames } from '../../../lib/classNames/classNames';

interface ITelegramIconProps {
  className?: string;
}

const TelegramIcon = ({ className }: ITelegramIconProps) => {
  return (
    <svg
      className={classNames(cls.svg, {}, [className ?? ''])}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true">
      <path d="M21.9 4.6 18.6 19.8c-.25 1.07-.9 1.34-1.82.83l-5.03-3.71-2.43 2.34c-.27.27-.49.49-1.01.49l.36-5.12 9.32-8.42c.4-.36-.09-.56-.63-.2L5.84 13.2.9 11.66c-1.07-.34-1.09-1.07.22-1.59L20.5 2.7c.9-.33 1.68.2 1.4 1.9z" />
    </svg>
  )
};

export default TelegramIcon;
