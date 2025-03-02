import { ITriviaBounty } from '@/interfaces/developer.interface';
import styles from './index.module.scss';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';
import { useRecoilValue } from 'recoil';
import { useDeveloperContractActions } from '@/features/developers/actions/developer.contract';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';

interface Props {
  data: ITriviaBounty;
  refresh: () => void;
}

export function ClaimButton({ data, refresh }: Props) {
  const developerProfile = useRecoilValue(DeveloperProfileAtom);
  const { claimReward } = useDeveloperContractActions();
  const { claimReward: claimRewardAction } = useDeveloperActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleClaimReward = async () => {
    if (isLoading) return;

    console.log(data);

    try {
      setIsLoading(true);
      toast.loading('Claiming reward...', {
        id: 'claim-reward',
      });
      await claimReward(data.bounty, data.smartContractId);
      toast.success('Reward claimed successfully');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.dismiss('claim-reward');
      toast.error(`Error claiming reward: ${error}`);
      return;
    }

    const res = await claimRewardAction(data.id);

    if (res) {
      toast.success('Reward claimed successfully');
      refresh();
    }

    setIsLoading(false);
    toast.dismiss('claim-reward');
  };

  return (
    <div className={styles['card']}>
      <div className={styles['notification-messages']}>
        <h1>Congratulations, {developerProfile?.firstName || ''}</h1>
        <div className={styles['claim-message']}>
          <p>
            Congratulations {developerProfile?.firstName || ''}, you’ve been
            selected as part of the winners of the “{data.title}” task. You’re
            entitled to {data.bounty} Algos as reward as a winner.
          </p>

          <h3>Click the button below to claim your reward.</h3>
        </div>
      </div>
      <div onClick={handleClaimReward} className={styles['claim-button']}>
        {isLoading ? 'Claiming...' : 'Claim Reward'}
      </div>
    </div>
  );
}
