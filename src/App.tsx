// src/App.tsx
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { Task, Priority } from "./types";
import styles from "./App.module.css";

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
      const saved = localStorage.getItem("tasks_pv511");
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

  useEffect(() => {
    localStorage.setItem("tasks_pv511", JSON.stringify(tasks));
  }, [tasks]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

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

  return (
    <main className={styles.container}>
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <Counter total={total} completed={completed} />
      <TodoList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </main>
  );
}

export default App;