/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from 'react-icons/fa';
import styles from './index.module.scss';

export function SearchSection() {


  return (
    <div className={styles['container']}>
      <div className={styles['inner-container']}>
        <input type="text" className={styles['input']} placeholder='Search by name, author or category...' />
        <FaSearch className={styles['icon']}/>
      </div> 
    </div>
  );
}
