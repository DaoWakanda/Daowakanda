import { ReactNode } from 'react';
import styles from './index.module.scss';

interface BackgroundOverlayProps {
  children?: ReactNode;
  visible?: boolean;
  onClose?: () => any;
}

export function LowerBackgroundOverlay({
  children = <></>,
  visible = true,
  onClose = () => null,
}: BackgroundOverlayProps) {
  return visible ? (
    <div className={styles['wrapper-bottom']}>
      <div className={styles['overlay']} onClick={onClose}></div>
      {children}
    </div>
  ) : null;
}
