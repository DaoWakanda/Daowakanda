import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet-react';
import { RightBackgroundOverlay } from '@/components/shared/BackgroundOverlay/RightBackgroundOverlay';
import Link from 'next/link';
import { LowerBackgroundOverlay } from '@/components/shared/BackgroundOverlay/LowerBackgroundOverlay';
import { FetchTriviaDto, LeaderBoardItem, TriviaDifficulty } from '@/interfaces/developer.interface';
import { useDebounce } from '@/hooks/useDebounce';
import { useRecoilValue } from 'recoil';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import { TriviaSearchTerm, TriviasAtom } from '@/features/developers/state/developer.atom';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function FiltersModal({ isActive, onclick }: Props) {
  const { getAllTrivia, fetchLeaderboard } = useDeveloperActions();
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderBoardItem[]>();
  const trivias = useRecoilValue(TriviasAtom);
  const [filter, setFilter] = useState<FetchTriviaDto>({
    numOfItemsPerPage: 40,
  });
  const searchTerm = useRecoilValue(TriviaSearchTerm);
  const { debounce } = useDebounce();
  const options: TriviaDifficulty[] = ['novice', 'amateur', 'pro'];

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
    <>
      <LowerBackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
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
                    setTimeout(()=> onclick(), 2000);
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
         
        </div>
      </LowerBackgroundOverlay>
    </>
  );
}
