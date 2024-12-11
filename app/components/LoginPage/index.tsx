import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ILogin } from '@/interfaces';
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';

export function LoginPage() {
  
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const { push } = useRouter();
  const [data, setData] = useState<ILogin>({
    username: '',
    password: '',
  });

  const onChange = (key: keyof ILogin, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = Object.keys(data).every((key) => !!(data as any)[key]);

  // const onSubmit = async () => {
  //   if (loading) return;

  //   setLoading(true);
  //   toast.loading('Submitting details...', { id: 'loader' });
  //   // const response = await createDeveloperAccount(data);
  //   toast.dismiss('loader');

  //   if (response) {
  //     toast.success('Details submitted successfully');

  //     setTimeout(() => {
  //       setData({
  //         firstName: '',
  //         lastName: '',
  //         country: '',
  //         stateOfResidence: '',
  //         email: '',
  //         githubLink: '',
  //         walletAddress: activeAddress || '',
  //       });
  //       push('/developers');
  //     }, 2000);
  //   }
  // };

  return (
    <div className={styles['container']}>
      <Link href={'/'} className={styles['link']}>
        <img
          src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
          className={styles['link-img']}
          alt="logo"
        />
      </Link>
      <div className={styles['main-section']}>
        <div className={styles['title']}>Admin Login</div>
        
        <div className={styles['form']}>
          <div className={styles['input']}>
            <label>Username</label>
            <input
              onChange={(evt) => {
                onChange('username', evt.target.value);
              }}
              value={data.username}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className={styles['input']}>
            <label>Password</label>
            <input
              onChange={(evt) => {
                onChange('password', evt.target.value);
              }}
              value={data.password}
              type={hidePassword ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            {!hidePassword ? 
              <IoIosEyeOff className={styles['input-icon']} onClick={()=>setHidePassword(true)}/> 
                : <IoMdEye className={styles['input-icon']} onClick={()=>setHidePassword(false)}/>
            }
          </div>
        </div>
        
        <button
          // onClick={() => onSubmit()}
          disabled={!canSubmit || loading}
          className={styles['btn-proceed']}
        >
          Proceed
        </button>
      </div>
      <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1730466442/Frame_3_iujvnt.png" alt="logo"  className={styles['img']}/>
    </div>
  );
}
