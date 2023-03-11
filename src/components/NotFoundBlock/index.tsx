import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🙁</span>
        <br />
        Nothing found
      </h1>
      <p className={styles.description}>
        Unfortunately, you are going home to Old Trafford :)
      </p>
    </div>
  );
};
