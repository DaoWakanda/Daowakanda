import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiHome6Line } from 'react-icons/ri';
import { GiJeweledChalice } from "react-icons/gi";
import { IoIosLogOut } from 'react-icons/io';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function DashboardWrapper({
  children = <></>,
  pageTitle = '',
}:Props) {

  const { push } = useRouter();

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Link href={'/'} className={styles['link']}>
          <img
            src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
            className={styles['link-img']}
            alt="logo"
          />
        </Link>
        <div className={styles['pageTitle']}>{pageTitle}</div>
        <div className={styles['logout']} onClick={()=>push('/login')}>
          <IoIosLogOut className={styles['icon']} />
          Log out
        </div>
      </div>
      <div className={styles['sidebar']}>
        <SideBar />
      </div>
      <div className={styles['main']}>{children}</div>
    </div>
  );
}

function SideBar(){
  const [navIndex, setNavIndex] = useState(-1);
  const { push } = useRouter();
  const router = useRouter();
  const currentUrl = `${router.asPath}`;
  const MenuNames = [
    {
      name: 'Overview',
      link: '/dashboard/overview',
      icon: RiHome6Line,
    },
    {
      name: 'Challenges',
      link: '/dashboard/challenges',
      icon: GiJeweledChalice ,
    },
   
  ];

  return (
    <div className={styles['sidebar-container']}>
      <div className={styles['sidebar-title']}>Hi, <span>Tom</span></div>

      <div className={styles['sidebars']}>
        {
          MenuNames.map((item, index) => (
            <div className={styles[currentUrl === item.link ? 'navItem-active' : 'navItem']}
              onClick={()=> { 
                setNavIndex(index);
                push(item.link);
              }}
              key={index}
            >
              <item.icon className={styles['nav-icon']}/>
              {item.name}
            </div>
          ))
        } 
      
      </div>
    </div>
  );
}