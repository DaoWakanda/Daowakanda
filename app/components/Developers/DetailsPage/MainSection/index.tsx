/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { RiCalendar2Fill } from 'react-icons/ri';
import { GoStopwatch } from 'react-icons/go';

interface Props {
  title: string;
}
export function MainSection({ title }: Props) {
  const [userAccess, setUserAccess] = useState(true);

  const paragraph = `
  Figma ipsum component variant main layer. Ipsum arrange hand flatten style. Variant figjam stroke fill underline overflow. Ellipse subtract layer duplicate boolean effect prototype line flatten. Stroke auto vector clip vector bold auto inspect. Layer distribute rotate connection plugin move pixel. Rectangle connection background vertical opacity editor ipsum scrolling create. Library union pen flatten rectangle layout. Text scale scale pixel font main pencil hand. Editor select shadow pencil underline. Variant reesizing link arrange prototype layout.
  Plugin selection bullet distribute slice scale text. List edit main ellipse rotate layer arrow list variant bullet.
  
  Strikethrough select reesizing community share pixel horizontal layer. Plugin figjam group pen rectangle prototype outline prototype rectangle. Bullet connection device undo connection style flatten. Effect team shadow slice thumbnail community reesizing. Plugin italic subtract group inspect. 
  Auto polygon layer comment vector. Scrolling clip vertical blur inspect project vector select. Thumbnail overflow italic underline underline ipsum. Pencil selection vertical italic scale text. Flatten pixel outline invite subtract ipsum.
  Duplicate auto rectangle plugin thumbnail follower. Content plugin vector list bullet background asset italic. Selection thumbnail shadow main thumbnail create community bold invite background. Layout device rectangle team editor team. Reesizing content device main edit component. Create ellipse object shadow flows inspect pixel draft scale. Distribute reesizing community font figma. Flows overflow arrange overflow rotate vertical move fill.
  `;

  return (
    <div className={styles['main-container']}>
      <Link className={styles['header']} href={'/developers'}>
        <div className={styles['task']}>Tasks</div>
        <IoIosArrowForward className={styles['arr']} />
        <div className={styles['title']}>{title}</div>
      </Link>
      <div className={styles['inner-container']}>
        {!userAccess ? (
          <div className={styles['denied']}>
            <div className={styles['lead']}>Access denied</div>
            <div className={styles['text']}>
              Access to this task has been denied, update your profile to gain
              access.
            </div>
            <Link className={styles['link']} href={'/developers/signup'}>
              Proceed to update KYC
            </Link>
          </div>
        ) : (
          <div className={styles['normal']}>
            <div className={styles['top-section']}>
              <div className={styles['lead']}>{title}</div>
              <div className={styles['content']}>
                <div className={styles['info']}>
                  <div className={styles['date']}>
                    <RiCalendar2Fill className={styles['icon']} />
                    01 Oct, 2024
                  </div>
                  <div className={styles['time']}>
                    <GoStopwatch className={styles['icon']} />
                    48 hrs
                  </div>
                  <div className={styles['amateur']}>amateur</div>
                </div>
                <div className={styles['bottom']}>
                  <div className={styles['price']}>
                    Price:<span>50 Algos</span>{' '}
                  </div>
                  <div className={styles['dotted']}></div>
                  <div className={styles['max']}>Max Winners: 10</div>
                </div>
              </div>
            </div>

            <div className={styles['bottom-section']}>
              <div className={styles['text']}>{paragraph}</div>
              <div className={styles['form']}>
                <input
                  type="text"
                  className={styles['input']}
                  placeholder="Submit Github Repository link"
                />
                <div className={styles['btn']}>Submit</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
