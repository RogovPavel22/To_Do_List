import { create } from "zustand";
import { generateId } from "../helpers";

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [
    { id: "1", title: "Пример таски", createdAt: 1 },
    { id: "2", title: "Пример таски №2", createdAt: 2 },
  ],
  createTask: (title: string) => {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      title: title,
      createdAt: Date.now(),
    };
    set({
      tasks: [newTask, ...tasks],
    });
  },
  removeTask: (id: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((item) => item.id !== id),
    });
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((item) => ({
        ...item,
        title: item.id === id ? title : item.title,
      })),
    });
  },
}));
