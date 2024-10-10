import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';

export function SignUpPage() {

  return (
    <div className={styles['container']}>
      <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728588927/Frame_zqjnan.png" alt="frame" className={styles['img']}/>
      <Link href={'/'} className={styles['link']}>
        <img
          src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
          className={styles['link-img']}
          alt="logo"
        />
      </Link>
      <div className={styles['main-section']}>
        <div className={styles['left-section']}>
          <div className={styles['title']}>Complete your profile</div>
          <div className={styles['form']}>
            <div className={styles['input']}>
              <label>First name:</label>
              <input type="text" placeholder='First Name'/>
            </div>
            <div className={styles['input']}>
              <label>Last name:</label>
              <input type="text" placeholder='Last Name'/>
            </div>
            <div className={styles['input']}>
              <label>Country:</label>
              <input type="text" placeholder='Select Country'/>
            </div>
            <div className={styles['input']}>
              <label>State of Residence:</label>
              <input type="text" placeholder='Select State'/>
            </div>
            <div className={styles['input-long']}>
              <label>Email Address:</label>
              <input type="text" placeholder='Select State'/>
            </div>
            <div className={styles['input-long']}>
              <label>Github Link:</label>
              <input type="text" placeholder='Github Link'/>
            </div>
            <div className={styles['input-long']}>
              <label>Wallet Address:</label>
              <input type="text" placeholder='0x384dd...3d839333'/>
            </div>
            
          </div>
          <div className={styles['btns']}>
            <div className={styles['btn-cancel']}>Cancel</div>
            <div className={styles['btn-proceed']}>Proceed</div>
          </div>
        </div>
        <div className={styles['right-section']}>
          <div className={styles['title']}>Let’s Know Who You Are.</div>
          <div className={styles['text']}>Complete KYC and tell community members about you.</div>
        </div>
      </div>
     
    </div>   
  );
}
