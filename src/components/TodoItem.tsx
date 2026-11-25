// src/components/TodoItem.tsx
import type { Task, Priority } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  task: Task;
  onToggle: (id: Task["id"]) => void;
  onDelete: (id: Task["id"]) => void;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Низький",
  normal: "Звичайний",
  high: "Високий",
};

const PRIORITY_BADGE_CLASSES: Record<Priority, string> = {
  low: styles.badgeLow,
  normal: styles.badgeNormal,
  high: styles.badgeHigh,
};

function isDatePast(dateStr?: string): boolean {
  if (!dateStr) return false;
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return dateStr < today;
}

export function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  const isOverdue = Boolean(
    !task.completed && (task.isOverdue || isDatePast(task.date))
  );

  const itemClasses = [
    styles.item,
    styles[task.priority],
    task.completed ? styles.completed : "",
    isOverdue ? styles.overdue : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={itemClasses}>
      <label
        className={styles.checkboxLabel}
        title={task.completed ? "Виконано" : "Позначити як виконане"}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
      </label>

      <div className={styles.content}>
        <p className={styles.text}>{task.text}</p>
        <div className={styles.meta}>
          <span
            className={`${styles.badge} ${PRIORITY_BADGE_CLASSES[task.priority]}`}
          >
            {PRIORITY_LABELS[task.priority]}
          </span>
          {task.date && (
            <span
              className={`${styles.date} ${
                isOverdue ? styles.dateOverdue : ""
              }`}
            >
              📅 {task.date}
              {isOverdue && (
                <span className={styles.overdueAlert}>⚠️ Прострочено</span>
              )}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className={styles.deleteBtn}
        title="Видалити завдання"
        onClick={() => onDelete(task.id)}
      >
        🗑️
      </button>
    </li>
  );
}