import cls from './MainPage.module.css';
import { classNames } from '../../../shared/lib/classNames/classNames';

interface ISecondMainPageAsync {
  className?: string;
}

const MainPage = ({ className }: ISecondMainPageAsync) => {
  return (
    <main className={classNames(cls.content, {}, [className ?? ''])}>
      <h1>Hello World</h1>
    </main>
  )
};

export default MainPage;
