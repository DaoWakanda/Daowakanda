import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { useWallet } from '@txnlab/use-wallet-react';
import { ICreateDeveloperDto } from '@/interfaces/developer.interface';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useWindowDimensions } from '@/hooks';

export function SignUpPage() {
  const { activeAddress } = useWallet();
  const [loading, setLoading] = useState(false);
  const { createDeveloperAccount } = useDeveloperActions();
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;
  const { push } = useRouter();
  const [data, setData] = useState<ICreateDeveloperDto>({
    firstName: '',
    lastName: '',
    country: '',
    stateOfResidence: '',
    email: '',
    githubLink: '',
    walletAddress: activeAddress || '',
  });

  const onChange = (key: keyof ICreateDeveloperDto, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = Object.keys(data).every((key) => !!(data as any)[key]);

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);
    toast.loading('Submitting details...', { id: 'loader' });
    const response = await createDeveloperAccount(data);
    toast.dismiss('loader');

    if (response) {
      toast.success('Details submitted successfully');

      setTimeout(() => {
        setData({
          firstName: '',
          lastName: '',
          country: '',
          stateOfResidence: '',
          email: '',
          githubLink: '',
          walletAddress: activeAddress || '',
        });
        push('/developers');
      }, 2000);
    }
  };

  const baseImage = isMobile ? `https://res.cloudinary.com/dlinprg6k/image/upload/v1730053686/Frame_2_vma7g6.png` :
    `https://res.cloudinary.com/dlinprg6k/image/upload/v1728588927/Frame_zqjnan.png`;
  return (
    <div className={styles['container']}>
      <img
        src={baseImage}
        alt="frame"
        className={styles['img']}
      />
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
          <div className={styles['header-section']}>
            <Link href={'/'} className={styles['linkImg']}>
              <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1730052651/Group_5_1_nmdiwy.png" alt="logo" />
            </Link>
            <div className={styles['lead']}>Let’s Know Who You Are.</div>
            <div className={styles['text']}>
              Complete KYC and tell community members about you.
            </div>
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
              <label>Email Address:</label>
              <input
                onChange={(evt) => {
                  onChange('email', evt.target.value);
                }}
                value={data.email}
                type="email"
                placeholder="Type your email address"
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
            <button className={styles['btn-cancel']}>Cancel</button>
            <button
              onClick={() => onSubmit()}
              disabled={!canSubmit || loading}
              className={styles['btn-proceed']}
            >
              Proceed
            </button>
          </div>
        </div>
        <div className={styles['right-section']}>
          <div className={styles['title']}>Let’s Know Who You Are.</div>
          <div className={styles['text']}>
            Complete KYC and tell community members about you.
          </div>
        </div>
      </div>
    </div>
  );
}
