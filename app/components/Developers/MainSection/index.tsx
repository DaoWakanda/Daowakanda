/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Card, CardLoader } from './Card';
import styles from './index.module.scss';
import { names, tasks } from '../mock';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import { useRecoilValue } from 'recoil';
import {
  TriviaSearchTerm,
  TriviasAtom,
} from '@/features/developers/state/developer.atom';
import {
  FetchTriviaDto,
  LeaderBoardItem,
  TriviaDifficulty,
} from '@/interfaces/developer.interface';
import { LeaderBoardComponent } from './LeaderBoardItem';
import { useDebounce } from '@/hooks/useDebounce';
import { useWindowDimensions } from '@/hooks';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { useWallet } from '@txnlab/use-wallet-react';

export function MainSection() {
  const [active, setActive] = useState(false);
  const [fullLeaderBoard, setFullLeaderBoard] = useState(false);
  const { activeAddress } = useWallet();
  const { getAllTrivia, fetchLeaderboard } = useDeveloperActions();
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderBoardItem[]>();
  const trivias = useRecoilValue(TriviasAtom);
  const [filter, setFilter] = useState<FetchTriviaDto>({
    numOfItemsPerPage: 40,
  });
  const searchTerm = useRecoilValue(TriviaSearchTerm);
  const { debounce } = useDebounce();
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  const options: TriviaDifficulty[] = ['novice', 'amateur', 'pro'];
  const triviaSize = trivias?.data?.length || 0;

  const debounceSearch = debounce((term: string) => {
    setFilter((old) => ({
      ...old,
      searchTerm: term,
    }));
  });

  const getLeaderboard = async () => {
    const res = await fetchLeaderboard();

    if (res) {
      setLeaderboardItems(res);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  useEffect(() => {
    getAllTrivia(filter);
  }, [filter]);

  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className={styles['main-container']}>
      <div className={styles['left-section']}>
        <div className={styles['card-detail-filter']}>
          <div className={styles['top-content']}>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728500099/elements_pawxnl.png"
              alt="filter"
            />
            <div className={styles['lead-text']}>filters</div>
          </div>

          <div className={styles['level']}>
            <div className={styles['title']}>Difficulty Level</div>
            <div className={styles['options']}>
              {options.map((option, index) => (
                <div
                  className={styles['option'] + ' ' + 'capitalize'}
                  key={index}
                  onClick={() => {
                    setFilter({
                      ...filter,
                      filterBy: filter.filterBy === option ? undefined : option,
                    });
                  }}
                >
                  <div
                    className={
                      styles[
                        option === filter.filterBy ? 'checked' : 'unchecked'
                      ]
                    }
                  ></div>
                  <div className={styles['text']}>{option}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles['card-detail']}>
          <div className={styles['top-content']}>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728504455/pyramid-structure-01_qa9tla.png"
              alt="leaderboard"
            />
            <div className={styles['lead-text']}>leaderboard</div>
          </div>
          <div className={styles['table']}>
            <div className={styles['header']}>
              <div className={styles['title']}>Rank</div>
              <div className={styles['title']}>Points</div>
            </div>
            <div className={styles['content']}>
              {leaderboardItems
                ?.sort((a, b) => b.totalAlgos - a.totalAlgos)
                ?.map((item, index) => (
                  <LeaderBoardComponent
                    key={item.name}
                    item={item}
                    index={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles['right-section']}>
        <div className={styles['title']}>Tasks</div>
        {
          isMobile && (
            <div className={styles['header']}>
              <div className={styles['titles']}>Tasks</div>
              <div className={styles['earnings']} onClick={()=>setActive(!active)}>My Earning: <span>0</span>
              {
                !active ? <IoIosArrowDown className={styles['icon']} />  : <IoIosArrowUp className={styles['icon']} /> 
              }
              </div>
            </div>
          )
        }
        <div className={styles['cards']}>

          {
            triviaSize  > 0 ? (
              trivias?.data.map((trivia, index) => (
                <Card key={index} data={trivia} />
              ))
            ): 'No data to display here'
          }

          {!trivias &&
            Array.from({ length: 5 }).map((_, idx) => <CardLoader key={idx} />)
          }
        </div>
      </div>

      {
        active && (
          <div className={styles['modal-container']}>
            <div className={styles['table']}>
              <div className={styles['content']}>
                {leaderboardItems?.slice(0, 5)
                  ?.sort((a, b) => b.totalAlgos - a.totalAlgos)
                  ?.map((item, index) => (
                    <LeaderBoardComponent
                      key={item.name}
                      item={item}
                      index={index}
                    />
                  ))}
              </div>
              <div className={styles['link']} 
                onClick={()=>{
                  setFullLeaderBoard(true);
                  setActive(false);
                }}
                >
                View full list
              </div>
            </div> 
          </div>
        )
      }
      {
        fullLeaderBoard && (
          <div className={styles['leaderboard-modal']}>
            <div className={styles['card-detail']}>
              <div className={styles['top-content']}>
                <div className={styles['left']}>
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728504455/pyramid-structure-01_qa9tla.png"
                    alt="leaderboard"
                  />
                  <div className={styles['lead-text']}>Leaderboard</div>
                </div>
                <div className={styles['right']} onClick={()=>setFullLeaderBoard(false)}>
                  <IoMdClose className={styles['icon']} />
                </div>
              </div>
              <div className={styles['table']}>
                <div className={styles['content']}>
                  {leaderboardItems
                    ?.sort((a, b) => b.totalAlgos - a.totalAlgos)
                    ?.map((item, index) => (
                      <LeaderBoardComponent
                        key={item.name}
                        item={item}
                        index={index}
                      />
                    ))}
                </div>
              </div> 
            </div>
          </div>
        )
      }
    </div>
  );
}
