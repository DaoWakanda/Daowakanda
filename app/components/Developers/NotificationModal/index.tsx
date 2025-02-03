import React, { useState } from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import { ClaimButton } from '../ClaimButton';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function NotificationModal({ isActive, onclick }: Props) {
  const { activeAddress } = useWallet();

  const [showClaimModal, setShowClaimModal] = useState(false); // State for ClaimButton visibility

  const handleNotificationClick = () => {
    setShowClaimModal(true); // Open ClaimButton when a notification is clicked
  };

  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
        {/* ClaimButton Modal (Only appears when showClaimModal is true) */}
        {showClaimModal && (
          <div className={styles['claim-button-container']}>
            <ClaimButton />
          </div>
        )}

        <div className={styles['card']}>
          <div className={styles['section']}>
            <div className={styles['notification-section']}>
              <h2>Notifications</h2>

              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={styles['notifications']}
                  onClick={handleNotificationClick} // Click event to open ClaimButton
                >
                  <div className={styles['notification-messages']}>
                    <h1>Congratulations, Algo Task winners</h1>
                    <p>
                      Congratulations Micah, you’ve been selected as part of the
                      winners who participated in the “Transfer of ownership”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RightBackgroundOverlay>
    </>
  );
}
