/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Card } from './Card';
import styles from './index.module.scss';
import Link from 'next/link';
import { names, tasks } from '../mock';

export function MainSection() {
  const [checked, setChecked] = useState(-1);
  const [selected, setSelected] = useState('all');

  const options = ['Novice', 'Amateur', 'Pro'];

  const stacks = ['all', 'full stack development', 'UI/UX Design','JavaScript',
    'frontend development', 'backend development', 'python'
   ]
  
  return (
    <div className={styles['main-container']}>
      <div className={styles['left-section']}>
        <div className={styles['card-detail-filter']}>
          <div className={styles['top-content']}>
            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728500099/elements_pawxnl.png" alt="filter" />
            <div className={styles['lead-text']}>filters</div>
          </div>

          <div className={styles['level']}>
            <div className={styles['title']}>Difficulty Level</div>
            <div className={styles['options']}>
              {
                options.map((option, index) =>(
                  <div className={styles['option']} key={index} onClick={()=> setChecked(index)}>
                    <div className={styles[checked === index ?'checked': 'unchecked']}></div>
                    <div className={styles['text']}>{option}</div>
                  </div>
                ))
              }
            </div>
          </div>
          
          <div className={styles['bottom']}>
            <div className={styles['title']}>Skill</div>
            <div className={styles['skills']}>
              {
                stacks.map((stack, index) =>(
                  <div className={styles[selected === stack ? 'active':'skill']} 
                    onClick={()=>setSelected(stack)}
                    key={index}
                  >
                    {stack}
                  </div>
                ))
              }      
            </div>
          </div>
       
        </div>

        <div className={styles['card-detail']}>
          <div className={styles['top-content']}>
            <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728504455/pyramid-structure-01_qa9tla.png" alt="leaderboard" />
            <div className={styles['lead-text']}>leaderboard</div>
          </div>
          <div className={styles['table']}>
            <div className={styles['header']}>
              <div className={styles['title']}>Rank</div>
              <div className={styles['title']}>Points</div>
            </div>
            <div className={styles['content']}>
              {
                names.map((name, index)=>(
                  <div className={styles['row']} key={index}>
                    <div className={styles['left']}>
                      <div className={styles['id']}>{name.id}.</div>
                      <div className={styles['block']}>
                        <img src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728521810/Frame_144_ufboki.png" alt="avatar" />
                        <div className={styles['name']}>{name.name}</div>
                      </div>
                    </div>
                    <div className={styles['right']}>{name.points}</div>
                </div>
                ))
              }
            </div>
            <div className={styles['link']}>View Full Lists</div>
          </div>
        </div>
      </div>

     <div className={styles['right-section']}>
      <div className={styles['title']}>Tasks</div>
      <div className={styles['cards']}>
        {
          tasks.map((task, index) => (
            <Card key={index} {...task}/>
          ))
        }
      </div>
     </div>
    </div>
  );
}
