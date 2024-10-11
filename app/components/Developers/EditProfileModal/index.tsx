import React from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function EditProfileModal({ isActive, onclick }: Props) {
  const { activeAddress } = useWallet();
  const developerProfile = useRecoilValue(DeveloperProfileAtom);

  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728521810/Frame_144_ufboki.png"
            alt="avatar"
          />
          <div className={styles['section']}>
            <div className={styles['title']}>
              {activeAddress?.slice(0, 10)}...
            </div>
            {!developerProfile ? (
              <Link className={styles['btn']} href={'/developers/signup'}>
                Create Profile
              </Link>
            ) : (
              <div
                className={styles['btn']}
                onClick={() => {
                  // Open modal for editing user profile and close this one
                }}
              >
                Edit Profile
              </div>
            )}
          </div>
        </div>
      </RightBackgroundOverlay>
    </>
  );
}
