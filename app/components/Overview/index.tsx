import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import { DashboardWrapper, ScrollableContainer } from '../shared';
import { FaPlus } from 'react-icons/fa';
import { LowerSection } from './Sub-components/LowerSection';
import { CreateTaskModal } from './CreateTaskModal';
import { HiDotsVertical } from 'react-icons/hi';
import { EditTaskModal } from './EditTaskModal copy';
import { TaskCard } from './TaskCard';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function DashboardOverviewPage() {
  const[createModal, setCreateModal] = useState(false);
  const[editModal, setEditModal] = useState(false);

  if(createModal){
    return (
      <CreateTaskModal isActive={createModal} onclick={()=>setCreateModal(false)}/>
    )
  }
  if(editModal){
    return (
      <EditTaskModal isActive={editModal} onclick={()=>setEditModal(false)}/>
    )
  }

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
            <div className={styles['create']} onClick={()=>setCreateModal(true)}>
              <FaPlus className={styles['icon']}/>
            </div>
            <div className={styles['cards']}>
              <ScrollableContainer>
                {
                  [1,2,3,4,5,6,7,8,9,10].map((_, index)=>(
                    <TaskCard key={index} showEditModal={()=>setEditModal(true)} />
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
