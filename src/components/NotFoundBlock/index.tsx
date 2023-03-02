import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles.span}>🙁</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожелению ты идешь домой в Олд Траффорд:)
      </p>
    </div>
  );
};

export default NotFoundBlock;
