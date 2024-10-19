import React, { useState } from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';

interface Props {
  isActive: boolean;
  onclick: () => any;
  showEditForm: () => any;
}

export function EditProfileModal({ isActive, onclick, showEditForm }: Props) {
  const { activeAddress } = useWallet();
  const developerProfile = useRecoilValue(DeveloperProfileAtom);

  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <img
            src={
              developerProfile?.image ||
              `https://ui-avatars.com/api/?name=${
                developerProfile?.firstName || 'u'
              }&background=121212&size=80&rounded=true&bold=true&color=f5f5f5`
            }
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
                  showEditForm();
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
