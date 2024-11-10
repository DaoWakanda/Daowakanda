import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import { DashboardWrapper, ScrollableContainer } from '../shared';
import { FaPlus } from 'react-icons/fa';
import { LowerSection } from './Sub-components/LowerSection';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function DashboardOverviewPage() {

  return (
    <DashboardWrapper pageTitle='Overview'>
      <div className={styles['container']}>
        <div className={styles['top-section']}>
          <div className={styles['left']}>
            <div className={styles['title']}>
              Manage all challenges
            </div>
            <div className={styles['body-text']}>
              You’re now able to manage task. This includes 
              creating new task, editing and deleting previous task
            </div>
          </div>
          <div className={styles['right']}>
            <div className={styles['create']}>
              <FaPlus className={styles['icon']}/>
            </div>
            <div className={styles['cards']}>
              <ScrollableContainer>
                {
                  [1,2,3,4,5,6,7,8,9,10].map((_, index)=>(
                    <div className={styles['card']} key={index}>
                      UI/UX Design
                    </div>
                  ))
                }
              </ScrollableContainer>
            </div>
          </div>
        </div>
        <div className={styles['bottom-section']}>
          <LowerSection />
        </div>
      </div>
    </DashboardWrapper> 
  );
}
