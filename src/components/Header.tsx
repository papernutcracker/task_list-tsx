// src/components/Header.tsx
import styles from "./Header.module.css";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({
  title = "Task List",
  subtitle = "Організуй свої щоденні справи та завдання",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>📋</span>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
}