import packageInfo from '@/package.json';

import styles from './VersionHeader.module.scss';

const VersionHeader = async () => {
  return (
    <header className={styles['version-header']}>
      <p className={styles['version-text']}>Kudos Release: {packageInfo.version || 'Unknown'} </p>
    </header>
  );
};

export default VersionHeader;
