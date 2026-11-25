// src/components/Counter.tsx
import styles from "./Counter.module.css";

interface CounterProps {
  total: number;
  completed: number;
}

export function Counter({ total, completed }: CounterProps) {
  const active = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className={styles.counter} aria-label="Статистика завдань">
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.total}`}>
          <span className={styles.label}>Всього</span>
          <span className={styles.value}>{total}</span>
        </div>

        <div className={`${styles.card} ${styles.active}`}>
          <span className={styles.label}>В процесі</span>
          <span className={styles.value}>{active}</span>
        </div>

        <div className={`${styles.card} ${styles.completed}`}>
          <span className={styles.label}>Виконано</span>
          <span className={styles.value}>{completed}</span>
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>Прогрес виконання</span>
          <span className={styles.progressValue}>{percentage}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}