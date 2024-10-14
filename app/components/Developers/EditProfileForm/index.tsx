import React, { useState } from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';
import { IUpdateDeveloperDto } from '@/interfaces/developer.interface';
import toast from 'react-hot-toast';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import { useRouter } from 'next/router';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function EditProfileForm({ isActive, onclick }: Props) {
  const { activeAddress } = useWallet();
  const [loading, setLoading] = useState(false);
  const { updateDeveloperDetails} = useDeveloperActions();
  const { push } = useRouter();
  const [data, setData] = useState<IUpdateDeveloperDto>({
    firstName: '',
    lastName: '',
    country: '',
    stateOfResidence: '',
    githubLink: '',
    walletAddress: activeAddress || '',
  });

  const onChange = (key: keyof IUpdateDeveloperDto, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = Object.keys(data).every((key) => !!(data as any)[key]);

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);
    toast.loading('Submitting details...', { id: 'loader' });
    const response = await updateDeveloperDetails(data.walletAddress, data);
    toast.dismiss('loader');

    if (response) {
      toast.success('Details submitted successfully');

      setTimeout(() => {
        setData({
          firstName: '',
          lastName: '',
          country: '',
          stateOfResidence: '',
          githubLink: '',
          walletAddress: activeAddress || '',
        });
        push('/developers');
      }, 2000);
    }
  };


  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
       
          <div className={styles['left-section']}>
            <div className={styles['avatar']}>
              <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728892838/Rectangle_1_t6a9fx.png" alt="avatar" className={styles['img']}/>
            </div>
            <div className={styles['form']}>
              <div className={styles['input']}>
                <label>First name:</label>
                <input
                  onChange={(evt) => {
                    onChange('firstName', evt.target.value);
                  }}
                  value={data.firstName}
                  type="text"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className={styles['input']}>
                <label>Last name:</label>
                <input
                  onChange={(evt) => {
                    onChange('lastName', evt.target.value);
                  }}
                  value={data.lastName}
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className={styles['input']}>
                <label>Country:</label>
                <input
                  onChange={(evt) => {
                    onChange('country', evt.target.value);
                  }}
                  value={data.country}
                  type="text"
                  placeholder="Type your Country"
                  required
                />
              </div>
              <div className={styles['input']}>
                <label>State of Residence:</label>
                <input
                  onChange={(evt) => {
                    onChange('stateOfResidence', evt.target.value);
                  }}
                  value={data.stateOfResidence}
                  type="text"
                  placeholder="Select State"
                  required
                />
              </div>
              <div className={styles['input-long']}>
                <label>Github Link:</label>
                <input
                  onChange={(evt) => {
                    onChange('githubLink', evt.target.value);
                  }}
                  value={data.githubLink}
                  type="text"
                  placeholder="Github Link"
                  required
                />
              </div>
              <div className={styles['input-long']}>
                <label>Wallet Address:</label>
                <input
                  type="text"
                  placeholder="Wallet address"
                  value={data.walletAddress}
                  required
                />
              </div>
            </div>
            <div className={styles['btns']}>
              <button className={styles['btn-cancel']} 
                onClick={()=> onclick()}
              >
                Cancel
              </button>
              <button
                onClick={() => onSubmit()}
                disabled={!canSubmit || loading}
                className={styles['btn-proceed']}
              >
                Save Changes
              </button>
            </div>
          </div>
      </RightBackgroundOverlay>
    </>
  );
}
