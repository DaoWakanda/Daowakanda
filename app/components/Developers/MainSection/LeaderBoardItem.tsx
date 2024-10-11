import { LeaderBoardItem as ILeaderBoardItem } from '@/interfaces/developer.interface';
import styles from './index.module.scss';

interface Props {
  item: ILeaderBoardItem;
  index: number;
}

export const LeaderBoardComponent: React.FC<Props> = ({ item, index }) => {
  return (
    <div className={styles['leaderboardRow']}>
      <div className={styles['left']}>
        <div className={styles['id']}>{index + 1}.</div>
        <div className={styles['block']}>
          <img
            src={`https://ui-avatars.com/api/?name=${item.name}&background=random&font-size=0.35&rounded=true`}
            alt="avatar"
          />
          <div className={styles['name']}>{item.name}</div>
        </div>
      </div>
      <div className={styles['right']}>{item.totalAlgos}</div>
    </div>
  );
};
