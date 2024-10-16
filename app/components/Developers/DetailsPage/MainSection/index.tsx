/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { RiCalendar2Fill } from 'react-icons/ri';
import { GoStopwatch } from 'react-icons/go';
import { useParams } from 'next/navigation';
import { useDeveloperActions } from '@/features/developers/actions/developer.action';
import { ITrivia } from '@/interfaces/developer.interface';
import Skeleton from 'react-loading-skeleton';
import { DeveloperProfileAtom } from '@/features/developers/state/developer.atom';
import { useRecoilValue } from 'recoil';
import { useWallet } from '@txnlab/use-wallet-react';
import { useNotify } from '@/hooks';
import toast from 'react-hot-toast';

export function MainSection() {
  const developerProfile = useRecoilValue(DeveloperProfileAtom);
  const [trivia, setTrivia] = useState<ITrivia>();

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

  useEffect(() => {
    fetchTrivia();
  }, [params]);

  return (
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
                    {trivia?.duration || (
                      <Skeleton
                        baseColor="#202020"
                        highlightColor="#444"
                        width={50}
                      />
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
                    Price:{' '}
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
              <div className={styles['text']}>
                {trivia?.description || (
                  <Skeleton
                    count={5}
                    baseColor="#202020"
                    highlightColor="#444"
                    width={'100%'}
                  />
                )}
              </div>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
