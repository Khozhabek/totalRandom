import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🙁</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожелению ты идешь домой, в Олд Траффорд:)
      </p>
    </div>
  );
};