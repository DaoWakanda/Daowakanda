import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import { ClaimButton } from '../ClaimButton';
import Skeleton from 'react-loading-skeleton';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import { ITriviaBounty } from '@/interfaces/developer.interface';
import { useRecoilValue } from 'recoil';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function NotificationModal({ isActive, onclick }: Props) {
  const { activeAddress } = useWallet();
  const { getUnclaimedRewards } = useDeveloperActions();
  const developerProfile = useRecoilValue(DeveloperProfileAtom);
  const [unclaimedRewards, setUnclaimedRewards] = useState<ITriviaBounty[]>(); // State for ClaimButton visibility
  const [selectedReward, setSelectedReward] = useState<ITriviaBounty>();

  const fetchUnclaimedRewards = async () => {
    if (!activeAddress) return;
    const rewards = await getUnclaimedRewards(activeAddress);

    if (rewards) {
      setUnclaimedRewards(rewards);
    }
  };

  useEffect(() => {
    fetchUnclaimedRewards();
  }, []);
  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
        {/* ClaimButton Modal (Only appears when showClaimModal is true) */}
        {!!selectedReward && (
          <div className={styles['claim-button-container']}>
            <ClaimButton
              refresh={fetchUnclaimedRewards}
              data={selectedReward}
            />
          </div>
        )}

        <div className={styles['card']}>
          <div className={styles['section']}>
            <div className={styles['notification-section']}>
              <h2>Notifications</h2>

              {unclaimedRewards
                ? unclaimedRewards.map((reward, index) => (
                    <div
                      key={index}
                      className={styles['notifications']}
                      onClick={() => setSelectedReward(reward)} // Click event to open ClaimButton
                    >
                      <div className={styles['notification-messages']}>
                        <h1>Congratulations, Algo Task winners</h1>
                        <p>
                          Congratulations {developerProfile?.firstName}, you’ve
                          been selected as part of the winners of the “
                          {reward.title}” task. Click here to claim your reward.
                        </p>
                      </div>
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={styles['notifications']}>
                      <div className={styles['notification-messages']}>
                        <h1>
                          <Skeleton width={200} />
                        </h1>
                        <p>
                          <Skeleton count={2} width={'95%'} />
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
