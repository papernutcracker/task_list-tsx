// src/components/Counter.tsx
import type { FilterStatus } from "../types";
import styles from "./Counter.module.css";

interface CounterProps {
  total: number;
  completed: number;
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export function Counter({
  total,
  completed,
  currentFilter,
  onFilterChange,
}: CounterProps) {
  const active = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className={styles.counter} aria-label="Статистика та фільтри">
      <div className={styles.grid}>
        <div
          className={`${styles.card} ${styles.total} ${
            currentFilter === "all" ? styles.selected : ""
          }`}
          onClick={() => onFilterChange("all")}
          role="button"
          tabIndex={0}
          title="Показати всі завдання"
        >
          <span className={styles.label}>Всього</span>
          <span className={styles.value}>{total}</span>
        </div>

        <div
          className={`${styles.card} ${styles.active} ${
            currentFilter === "active" ? styles.selected : ""
          }`}
          onClick={() => onFilterChange("active")}
          role="button"
          tabIndex={0}
          title="Показати тільки активні"
        >
          <span className={styles.label}>В процесі</span>
          <span className={styles.value}>{active}</span>
        </div>

        <div
          className={`${styles.card} ${styles.completed} ${
            currentFilter === "completed" ? styles.selected : ""
          }`}
          onClick={() => onFilterChange("completed")}
          role="button"
          tabIndex={0}
          title="Показати тільки виконані"
        >
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