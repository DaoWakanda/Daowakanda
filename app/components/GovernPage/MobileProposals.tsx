import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProposalContractsAtom } from '@/features/governance/state/governance.atom';
import { MdOutlineNoteAdd } from 'react-icons/md';
import { useWallet } from '@txnlab/use-wallet-react';
import { SampleProposal } from '@/interfaces';
import { proposalsData } from './mock';
import { CardProposal, CardProposalLoader } from './CardProposal';
import { useProposalActions } from '@/features/governance/actions/proposal.action';

interface MobileProposalProps {
  openProposalModal: any;
}

export const MobileProposals = ({ openProposalModal }: MobileProposalProps) => {
  const [itemDeleted, setItemDeleted] = useState(false);
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { getAllProposals } = useProposalActions();
  const proposals = useRecoilValue(ProposalContractsAtom);
  const { activeAddress } = useWallet();

  useEffect(() => {
    getAllProposals();
  }, []);

  const proposalFilters = () => {
    const now = Date.now();

    switch (selected) {
      case 'In Progress':
        return proposals
          ?.filter((item) => item.endDate > now)
          ?.map((item, index) => <CardProposal data={item} key={index} />);
      case 'Approved':
        return proposals
          ?.filter(
            (item) =>
              item.endDate < now && item.yesVotes.length > item.noVotes.length,
          )
          ?.map((item, index) => <CardProposal data={item} key={index} />);
      case 'Denied':
        return proposals
          ?.filter(
            (item) =>
              item.endDate < now && item.yesVotes.length < item.noVotes.length,
          )
          ?.map((item, index) => <CardProposal data={item} key={index} />);
      default:
        return proposals?.map((item, index) => (
          <CardProposal data={item} key={index} />
        ));
    }
  };

  return (
    <div className={styles['mobile-proposal-section']}>
      <div className={styles['title-section']}>
        <div className={styles['filter-container']}>
          <div className={styles['selected']}>
            {selected}
            <IoIosArrowDown
              className={styles['icon']}
              onClick={() => setOptionsActive(!optionsActive)}
            />
          </div>
        </div>

        <div className={styles['right-section']}>
          <div className={styles['input-search']}>
            <input
              type="text"
              placeholder="Search proposals"
              name={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className={styles['icon']} />
          </div>
          <button
            className={styles['button']}
            disabled={activeAddress ? false : true}
            onClick={() => openProposalModal}
          >
            <MdOutlineNoteAdd className={styles['icon']} />
          </button>
        </div>

        {optionsActive && (
          <div className={styles['options']}>
            <div
              className={styles['option']}
              onClick={() => {
                setSelected('All');
                setOptionsActive(false);
              }}
            >
              All
            </div>
            <div
              className={styles['option']}
              onClick={() => {
                setSelected('In Progress');
                setOptionsActive(false);
              }}
            >
              In Progress
            </div>
            <div
              className={styles['option']}
              onClick={() => {
                setSelected('Approved');
                setOptionsActive(false);
              }}
            >
              Approved
            </div>
            <div
              className={styles['option']}
              onClick={() => {
                setSelected('Denied');
                setOptionsActive(false);
              }}
            >
              Denied
            </div>
          </div>
        )}
      </div>
      <div className={styles['main-section']}>
        {proposalFilters()}
        {!proposalsData &&
          Array.from({ length: 5 }).map((_, index) => (
            <CardProposalLoader key={index} />
          ))}
      </div>
    </div>
  );
};
