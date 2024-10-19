import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
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
  const developerProfile = useRecoilValue(DeveloperProfileAtom);
  const { activeAddress } = useWallet();
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { updateDeveloperDetails, getDeveloperDetails, uploadImage } =
    useDeveloperActions();
  const [touched, setTouched] = useState(false);
  const [imageInputActive, setImageInputActive] = useState(true);
  const { push } = useRouter();

  const [data, setData] = useState<IUpdateDeveloperDto>({
    firstName: developerProfile?.firstName || '',
    lastName: developerProfile?.lastName || '',
    country: developerProfile?.country || '',
    stateOfResidence: developerProfile?.stateOfResidence || '',
    githubLink: developerProfile?.githubLink || '',
    walletAddress: activeAddress || '',
  });

  const onChange = (key: keyof IUpdateDeveloperDto, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setTouched(true);
  };

  const canSubmit =
    touched &&
    Object.keys(data)
      .filter((key) => key !== 'walletAddress')
      .every((key) => !!(data as any)[key]);

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);
    toast.loading('Submitting details...', { id: 'loader' });
    const response = await updateDeveloperDetails(data.walletAddress, data);
    toast.dismiss('loader');

    if (response) {
      toast.success('Details submitted successfully');
      getDeveloperDetails(data.walletAddress);

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
        setTouched(false);
        onclick();
      }, 2000);
    }
  };

  const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;

    if (!file) return;

    const SIZE_LIMIT = 2 * 1024 * 1024; //2mb
    const { size } = file;

    if (size > SIZE_LIMIT) {
      toast.success(
        `The size of the image you want to upload is ${(size / 1000000).toFixed(
          2,
        )}mb. Please upload an image not bigger than 2mb in size.`,
      );
      return;
    }

    const fileReader = new FileReader();
    setImageInputActive(false);

    fileReader.onloadend = (event) => {
      if (event.target?.result) {
        const base64 = (event.target.result as string).split(',')[1];
        submitImage(base64);
      }
    };

    fileReader.readAsDataURL(file);
  };

  const submitImage = async (base64: string) => {
    toast.loading('Uploading image...', { id: 'image-upload-toast' });

    const response = await uploadImage(base64, developerProfile?.id || '');

    setImageInputActive(true);
    toast.dismiss('image-upload-toast');

    if (response) {
      toast.success('Your profile photo was updated successfully');
      getDeveloperDetails(data.walletAddress);
    }
  };

  useEffect(() => {
    setData({
      firstName: developerProfile?.firstName || '',
      lastName: developerProfile?.lastName || '',
      country: developerProfile?.country || '',
      stateOfResidence: developerProfile?.stateOfResidence || '',
      githubLink: developerProfile?.githubLink || '',
      walletAddress: activeAddress || '',
    });
  }, [developerProfile]);

  return (
    <>
      <RightBackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['left-section']}>
          <div
            className={styles['avatar']}
            onClick={() => {
              if (imageInputActive) {
                imageInputRef.current?.click();
              }
            }}
          >
            <img
              src={
                developerProfile?.image ||
                `https://ui-avatars.com/api/?name=${
                  developerProfile?.firstName || 'u'
                }&background=ebebeb&size=80&rounded=true&bold=true`
              }
              alt="avatar"
              className={styles['img']}
            />
            <input
              type={'file'}
              className="hidden"
              ref={imageInputRef}
              accept="image/*"
              onChange={onImageSelect}
              value={undefined}
            />
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
                placeholder={developerProfile?.firstName || 'First Name'}
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
                placeholder={developerProfile?.lastName || 'Last Name'}
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
                placeholder={developerProfile?.country || 'Type your Country'}
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
                placeholder={
                  developerProfile?.stateOfResidence ||
                  'Type your State or province'
                }
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
                placeholder={developerProfile?.githubLink || 'Github Link'}
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
            <button className={styles['btn-cancel']} onClick={() => onclick()}>
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
