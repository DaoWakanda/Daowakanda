import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export function Tables() {
  const DataOne = [
    {
      tracks: 'Financial Inclusion',
      prizes: [
        '1st Prize: $3,000 USDCa',
        '2nd Prize: $1,750 USDCa',
        '3rd Prize: $750 USDCa',
      ],
    },
    {
      tracks: 'Supply Chain',
      prizes: [
        '1st Prize: $3,000 USDCa',
        '2nd Prize: $1,750 USDCa',
        '3rd Prize: $750 USDCa',
      ],
    },
    {
      tracks: 'Decentralized Identity',
      prizes: [
        '1st Prize: $3,000 USDCa',
        '2nd Prize: $1,750 USDCa',
        '3rd Prize: $750 USDCa',
      ],
    },
    {
      tracks: 'Technical Challenges',
      prizes: ['$3,500 USDCa'],
    },
  ];

  const Dates = [
    {
      firstSection: [
        'Registration Opens:',
        'September 25th - October 31st,2024',
      ],
      secondSection: ['Hacking Window:', 'October 8th - November 8th,2024'],
    },
    {
      firstSection: ['Submission Window:', 'November 1 - November 8th,2024'],
      secondSection: ['Shortlisting Phase:', 'November 1 - November 8th,2024'],
    },
    {
      firstSection: ['Shortlist Result Announcement:', 'November 8th'],
      secondSection: ['Final Demo Date:', 'November 8th and 9th (IRL)'],
    },
  ];

  return (
    <div className={styles['table-containers']}>
      <div className={styles['table-container-one']}>
        <div className={styles['header']}>
          <div className={styles['title']}>Tracks</div>
          <div className={styles['title']}>Prizes</div>
        </div>
        <div className={styles['table-body']}>
          {DataOne.map((item, index) => (
            <div className={styles['row']} key={index}>
              <div className={styles['column']}>{item.tracks}</div>
              <div className={styles['column']}>
                {item.prizes.map((item, index) => (
                  <div className={styles['items']} key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles['table-container-two']}>
        <div className={styles['header']}>
          <div className={styles['title']}>Important Dates</div>
        </div>
        <div className={styles['table-body']}>
          {Dates.map((item, index) => (
            <div className={styles['row']} key={index}>
              <div className={styles['column']}>
                {item.firstSection.map((item, index) => (
                  <div className={styles['items']} key={index}>
                    {item}
                  </div>
                ))}
              </div>
              <div className={styles['column']}>
                {item.secondSection.map((item, index) => (
                  <div className={styles['items']} key={index}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
