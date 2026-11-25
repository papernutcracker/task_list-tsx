// src/components/TodoList.tsx
import type { Task } from "../types";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  tasks: Task[];
  onToggleTask: (id: Task["id"]) => void;
  onDeleteTask: (id: Task["id"]) => void;
}

export function TodoList({
  tasks,
  onToggleTask,
  onDeleteTask,
}: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>✨</div>
        <h3 className={styles.emptyTitle}>Список завдань порожній</h3>
        <p className={styles.emptySubtitle}>
          Додайте нове завдання вище, щоб розпочати свій продуктивний день!
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
}