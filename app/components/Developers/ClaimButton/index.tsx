import styles from './index.module.scss';

export function ClaimButton() {
  return (
    <div className={styles['card']}>
      <div className={styles['notification-messages']}>
        <h1>Congratulations, Algo Task winners</h1>
        <div className={styles['claim-message']}>
          <p>
            Congratulations Micah, you’ve been selected as part of the winners
            who participated in the “Transfer of ownership” task. You’re
            entitled to 100 Algos as reward as a winner.
          </p>

          <h3>Click the button below to claim your reward.</h3>
        </div>
      </div>
      <div className={styles['claim-button']}>Claim Reward</div>
    </div>
  );
}
