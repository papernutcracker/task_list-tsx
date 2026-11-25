// src/components/TaskForm.tsx
import { useState, useRef, useEffect, type FormEvent } from "react";
import type { Priority } from "../types";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onAddTask: (task: { text: string; priority: Priority; date: string }) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (text.trim().length < 3) {
      setError("Текст завдання має містити щонайменше 3 символи!");
      inputRef.current?.focus();
      return;
    }

    onAddTask({
      text: text.trim(),
      priority,
      date,
    });

    setText("");
    setPriority("normal");
    setDate("");
    setError(null);

    inputRef.current?.focus();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Що потрібно зробити?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          autoComplete="off"
        />
        {error && <span className={styles.error}>⚠️ {error}</span>}
      </div>

      <div className={styles.controls}>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="priority-select">
            Пріоритет:
          </label>
          <select
            id="priority-select"
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">🟢 Низький</option>
            <option value="normal">🟡 Звичайний</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="deadline-input">
            Дедлайн:
          </label>
          <input
            id="deadline-input"
            type="date"
            className={styles.date}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={text.trim().length === 0}
        >
          <span className={styles.btnIcon}>＋</span>
          <span>Додати</span>
        </button>
      </div>
    </form>
  );
}