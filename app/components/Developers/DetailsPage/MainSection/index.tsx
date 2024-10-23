/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { RiCalendar2Fill } from 'react-icons/ri';
import { GoStopwatch } from 'react-icons/go';
import { useParams } from 'next/navigation';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import { ITrivia, LeaderBoardItem } from '@/interfaces/developer.interface';
import Skeleton from 'react-loading-skeleton';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';
import { useRecoilValue } from 'recoil';
import { useWallet } from '@txnlab/use-wallet-react';
import { useNotify } from '@/hooks';
import toast from 'react-hot-toast';
import { LeaderBoardComponent } from '../../MainSection/LeaderBoardItem';
import { createSanitizedMarkup } from '@/utils/create-sanitized-markup';

export function MainSection() {
  const developerProfile = useRecoilValue(DeveloperProfileAtom);
  const [trivia, setTrivia] = useState<ITrivia>();
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

  const { fetchLeaderboard } = useDeveloperActions();
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderBoardItem[]>();

  const { getTriviaById, submitTriviaAnswer } = useDeveloperActions();
  const { activeAddress } = useWallet();
  const { notify } = useNotify();
  const params = useParams();
  const [githubLink, setGithubLink] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTrivia = async () => {
    if (!params?.title) return;

    const res = await getTriviaById(params?.title as string);

    if (res) {
      setTrivia(res);
    }
  };

  const makeSubmission = async () => {
    if (!activeAddress) {
      notify.error('Please connect your wallet to proceed');
      return;
    }

    if (!developerProfile) return;

    setLoading(true);
    toast.loading('Submitting your response...', { id: 'loader' });

    const res = await submitTriviaAnswer({
      triviaId: params?.title as string,
      githubRepoLink: githubLink,
      userId: developerProfile.id,
    });

    toast.dismiss('loader');
    setLoading(false);

    if (res) {
      notify.success('Your response has been submitted successfully');

      setGithubLink('');
    }
  };

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
    fetchTrivia();
  }, [params]);

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const difference = Number(trivia?.endTimeStamp) / 1000 - currentTime;

      if (difference > 0) {
        const hours = Math.floor(difference / 3600);
        const minutes = Math.floor((difference % 3600) / 60);
        const seconds = Math.floor(difference % 60);

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(
          minutes,
        ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setTimeLeft(formattedTime);
      } else {
        setTimeLeft('00:00:00');
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [Number(trivia?.endTimeStamp)]);

  return (
    <>
      <div className={styles['main-container']}>
        <Link className={styles['header']} href={'/developers'}>
          <div className={styles['task']}>Tasks</div>
          <IoIosArrowForward className={styles['arr']} />
          <div className={styles['title']}>
            {trivia?.title || (
              <Skeleton baseColor="#202020" highlightColor="#444" width={100} />
            )}
          </div>
        </Link>
        <div className={styles['inner-container']}>
          {!developerProfile ? (
            <div className={styles['denied']}>
              <div className={styles['denied-icon']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729017655/Frame_1_rjgjqb.png"
                  alt="icon"
                />
              </div>
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
                <div className={styles['lead']}>
                  {trivia?.title || (
                    <Skeleton
                      baseColor="#202020"
                      highlightColor="#444"
                      width={150}
                    />
                  )}
                </div>
                <div className={styles['content']}>
                  <div className={styles['info']}>
                    <div className={styles['date']}>
                      <RiCalendar2Fill className={styles['icon']} />
                      {trivia ? (
                        new Date(trivia.createdAt).toDateString()
                      ) : (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={50}
                        />
                      )}
                    </div>
                    <div className={styles['time']}>
                      <GoStopwatch className={styles['icon']} />
                      {loading ? (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={50}
                        />
                      ) : trivia?.status === 'expired' ? (
                        'Ended'
                      ) : (
                        timeLeft
                      )}
                    </div>
                    <div className={styles[trivia?.difficulty || 'status']}>
                      {trivia?.difficulty || (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={50}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles['bottom']}>
                    <div className={styles['price']}>
                      Prize:{' '}
                      <span>
                        {trivia ? (
                          `${trivia.prize} algos`
                        ) : (
                          <Skeleton
                            baseColor="#202020"
                            highlightColor="#444"
                            width={100}
                          />
                        )}
                      </span>{' '}
                    </div>
                    <div className={styles['dotted']}></div>
                    <div className={styles['max']}>
                      Max Winners:{' '}
                      {trivia?.maxWinners || (
                        <Skeleton
                          baseColor="#202020"
                          highlightColor="#444"
                          width={100}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles['bottom-section']}>
                {trivia?.description ? (
                  <div
                    dangerouslySetInnerHTML={createSanitizedMarkup(
                      trivia.description,
                    )}
                    className={styles['text']}
                  ></div>
                ) : (
                  <div className={styles['text']}>
                    <Skeleton
                      count={5}
                      baseColor="#202020"
                      highlightColor="#444"
                      width={'100%'}
                    />
                  </div>
                )}
                {trivia?.status !== 'expired' && (
                  <div className={styles['form']}>
                    <input
                      type="url"
                      className={styles['input']}
                      placeholder="Submit Github Repository link"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      required
                    />
                    <button
                      disabled={!trivia || !githubLink || loading}
                      className={styles['btn']}
                      onClick={makeSubmission}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {developerProfile && trivia?.status === 'expired' && (
        <div className={styles['winners']}>
          <div className={styles['top-content']}>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1728504455/pyramid-structure-01_qa9tla.png"
              alt="leaderboard"
            />
            <div className={styles['lead-text']}>Task Winners</div>
          </div>
          <div className={styles['table']}>
            <div className={styles['header']}>
              <div className={styles['title']}>Rank</div>
              <div className={styles['title']}>Points</div>
            </div>
            <div className={styles['content']}>
              {leaderboardItems?.map((item, index) => (
                // eslint-disable-next-line react/jsx-key
                <LeaderBoardComponent item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
