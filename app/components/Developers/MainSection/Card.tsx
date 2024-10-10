/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import styles from './index.module.scss';
import { GoStopwatch } from "react-icons/go";
import { RiCalendar2Fill } from 'react-icons/ri';

interface Props{
  id: any;
  stack: string;
  title: string;
  date: string;
  text: string;
  status: string;
}
export function Card({
  id, stack, title,
  date, text, status,
}: Props) {

 const titleLink = title.split(' ').join('_');
 console.log(titleLink);

  return (
    <Link className={styles['card-container']} href={`/developers/${titleLink}`}>
      <div className={styles['title']}>{stack}</div>
      <div className={styles['inner-section']}>
        <div className={styles['top']}>
          <div className={styles['content']}>
            <div className={styles['title-content']}>{title}</div>
            <div className={styles['info']}>
              <div className={styles['date']}><RiCalendar2Fill className={styles['icon']}/>{date}</div>
              <div className={styles['time']}><GoStopwatch className={styles['icon']}/>48 hrs</div>
              <div className={styles[status]}>{status}</div>
            </div>
          </div>
          <div className={styles['paragraph']}>{text}</div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['price']}>Price:<span>50 Algos</span> </div>
          <div className={styles['dotted']}></div>
          <div className={styles['max']}>Max Winners: 10</div>
        </div>
      </div>
    </Link>
  );
}
