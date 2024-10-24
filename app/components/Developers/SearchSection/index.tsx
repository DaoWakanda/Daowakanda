/* eslint-disable react/no-unescaped-entities */
import { FaSearch } from 'react-icons/fa';
import styles from './index.module.scss';
import { useRecoilState } from 'recoil';
import { TriviaSearchTerm } from '@/features/developers/state/developer.atom';

interface Props{
  toggleModal : any;
}
export function SearchSection({toggleModal}:Props) {
  const [searchTerm, setSearchTerm] = useRecoilState(TriviaSearchTerm);
  
  return (
    <div className={styles['container']}>
      <div className={styles['inner-container']}>
        <input
          type="text"
          className={styles['input']}
          placeholder="Search by name, author or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className={styles['icon']} />

        <img
          src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728500099/elements_pawxnl.png"
          alt="filter"
          className={styles['filter']}
          onClick={()=> toggleModal()}
        />
      </div>
    </div>
  );
}
