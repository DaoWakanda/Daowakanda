/* eslint-disable react/no-unescaped-entities */
import styles from './index.module.scss';
import Link from 'next/link';

export function TopSection() {
  return (
    <div className={styles['top-container']}>
      <div className={styles['left-section']}>
        <div className={styles['title']}>
          Test your technical skills as a developer or a designer
        </div>
        <div className={styles['text']}>
          Let’s get into it today and earn more incentives...
        </div>
        <img
          className={styles['girl-image']}
          src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728435555/image_6_sqbmer.png"
          alt="girl"
        />
        <img
          className={styles['boy-image']}
          src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728435555/image_5_hpth15.png"
          alt="boy"
        />
      </div>
      {/* <div className={styles['right-section']}></div> */}
    </div>
  );
}
