/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import styles from './index.module.scss';
import { GoStopwatch } from 'react-icons/go';
import { RiCalendar2Fill } from 'react-icons/ri';
import { ITrivia } from '@/interfaces/developer.interface';
import Skeleton from 'react-loading-skeleton';

interface Props {
  data: ITrivia;
}
export function Card({ data }: Props) {
  return (
    <Link className={styles['card-container']} href={`/developers/${data.id}`}>
      <div className={styles['title']}>{data.skill}</div>
      <div className={styles['inner-section']}>
        <div className={styles['top']}>
          <div className={styles['content']}>
            <div className={styles['title-content']}>{data.title}</div>
            <div className={styles['info']}>
              <div className={styles['date']}>
                <RiCalendar2Fill className={styles['icon']} />
                {new Date(data.createdAt).toDateString()}
              </div>
              <div className={styles['time']}>
                <GoStopwatch className={styles['icon']} />
                {data.duration}
              </div>
              <div className={styles[data.difficulty]}>{data.difficulty}</div>
            </div>
          </div>
          <div className={styles['paragraph']}>{data.description}</div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['price']}>
            Prize: <span>{data.prize} Algos</span>{' '}
          </div>
          <div className={styles['dotted']}></div>
          <div className={styles['max']}>Max Winners: {data.maxWinners}</div>
        </div>
      </div>
    </Link>
  );
}

export function CardLoader() {
  return (
    <div className={styles['card-container']}>
      <div className={styles['title']}>
        <Skeleton width={100} />
      </div>
      <div className={styles['inner-section']}>
        <div className={styles['top']}>
          <div className={styles['content']}>
            <div className={styles['title-content']}>
              <Skeleton width={100} />
            </div>
            <div className={styles['info']}>
              <div className={styles['date']}>
                <RiCalendar2Fill className={styles['icon']} />
                <Skeleton width={50} />
              </div>
              <div className={styles['time']}>
                <GoStopwatch className={styles['icon']} />
                <Skeleton width={50} />
              </div>
              <div className={styles['pro']}>{<Skeleton width={50} />}</div>
            </div>
          </div>
          <div className={styles['paragraph']}>
            {<Skeleton count={3} width={200} />}
          </div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles['price']}>
            Prize:{' '}
            <span>
              <Skeleton width={20} />
            </span>{' '}
          </div>
          <div className={styles['dotted']}></div>
          <div className={styles['max']}>
            Max Winners: <Skeleton width={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
