// src/App.tsx
import { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { Task, Priority, FilterStatus } from "./types";
import styles from "./App.module.css";

const STORAGE_KEY = "tasks_pv511";

const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    text: "Опанувати контрольовані та неконтрольовані елементи",
    completed: false,
    priority: "high",
    date: "2026-11-14",
    isOverdue: false,
  },
  {
    id: 2,
    text: "Навчитись використовувати хук useRef для DOM-фокусу",
    completed: true,
    priority: "normal",
    date: "2026-11-13",
  },
];

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_TASKS;

      const parsed = JSON.parse(saved) as Partial<Task>[];
      return parsed.map((t, index) => ({
        id: t.id ?? Date.now() + index,
        text: t.text ?? "",
        completed: Boolean(t.completed),
        priority: t.priority ?? "normal",
        date: t.date,
        isOverdue: Boolean(t.isOverdue),
      }));
    } catch (error) {
      console.error("Помилка читання localStorage:", error);
      return DEFAULT_TASKS;
    }
  });

  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Помилка збереження в localStorage:", error);
    }
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const activeCount = total - completed;

  useEffect(() => {
    document.title =
      activeCount > 0
        ? `(${activeCount}) Завдань залишилось | Task List`
        : "Всі справи виконано! 🎉 | Task List";
  }, [activeCount]);

  const handleAddTask = (taskData: {
    text: string;
    priority: Priority;
    date: string;
  }) => {
    const newTask: Task = {
      id: Date.now(),
      text: taskData.text,
      priority: taskData.priority,
      date: taskData.date || undefined,
      completed: false,
      isOverdue: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleTask = (id: Task["id"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: Task["id"]) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const displayedTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <main className={styles.container}>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <Counter
        total={total}
        completed={completed}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      <TodoList
        tasks={displayedTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}

export default App;