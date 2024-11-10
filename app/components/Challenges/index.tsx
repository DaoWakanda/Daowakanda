import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import { DashboardWrapper } from '../shared';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function DashboardChallengesPage() {

  return (
    <DashboardWrapper pageTitle='Challenges'>
       <div className={styles['container']}>
          this is the challenges page
      </div>
    </DashboardWrapper> 
  );
}
