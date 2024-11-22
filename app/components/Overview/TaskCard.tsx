import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import { HiDotsVertical } from 'react-icons/hi';

interface Props {
  showEditModal?: any;
}

interface TaskModalProps {
  onclose?: any;
  showEditModal?: any;
}

export function TaskCard({showEditModal}:Props){
  const[isActive, setIsActive]= useState(false);

  const handleCloseTaskModal =()=>{
    setIsActive(false);
  }

  return(
    <>
    
      <div className={styles['card']}>
        <HiDotsVertical className={styles['toolbar-icon']} onClick={()=>setIsActive(true)}/>
        <div className={styles['skill']}>UI/UX Design</div>
        <div className={styles['title']}>Build a Wallet</div>

        {
          isActive && (
            <TaskModal onclose={handleCloseTaskModal} showEditModal={showEditModal}/>
          )
          
        }
      </div>
    </>
  )
}

function TaskModal({onclose, showEditModal}:TaskModalProps){

  return (
    <div className={styles['edit-card-modal']}>
      <div className={styles['overlay']} onClick={onclose}></div>
      <div className={styles['wrapper']}>
        <div className={styles['skill']} onClick={showEditModal}>Edit Task</div>
        <div className={styles['title']}>Delete Task</div>
      </div>
    </div>
  )
}