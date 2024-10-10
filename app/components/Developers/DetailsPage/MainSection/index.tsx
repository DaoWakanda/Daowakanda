/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

interface Props{
  title: string;
}
export function MainSection({title}: Props) {

  const [userAccess, setUserAccess] = useState(true);

  return (
    <div className={styles['main-container']}>
      <Link className={styles['header']} href={'/developers'}>
        <div className={styles['task']}>Tasks</div>
        <IoIosArrowForward className={styles['arr']}/>
        <div className={styles['title']}>{title}</div>
      </Link>
      <div className={styles['inner-container']}>
        {
          !userAccess? (
            <div className={styles['denied']}>
              <div className={styles['lead']}>Access denied</div>
              <div className={styles['text']}>Access to this task has been denied, update your profile to gain access.</div>
              <div className={styles['link']}>Proceed to update KYC</div>
            </div>
          ): (
            <div className={styles['normal']}>
            
            </div>
          )
        }
     </div>
    </div>
  );
}
