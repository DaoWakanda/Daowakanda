import React from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import Link from 'next/link';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function EditProfileModal({ isActive, onclick }: Props) {
  const { wallets: providers } = useWallet();

  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728521810/Frame_144_ufboki.png" alt="avatar" />
          <div className={styles['section']}>
            <div className={styles['title']}>0x384dd...3d83933398fheei</div>
            <Link className={styles['btn']} href={'/developers/signup'}>Edit Profile</Link>
          </div>
        </div>
      </RightBackgroundOverlay>
    </>
  );
}
