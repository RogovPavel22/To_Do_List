import create, { State, StateCreator } from "zustand";
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

function isToDoStore(object: any): object is ToDoStore {
  return "tasks" in object;
}

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

const getCurrentState = () => {
  try {
    const currentState = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    ) as Task[];
    return currentState;
  } catch (err) {
    window.localStorage.setItem("tasks", "[]");
  }

  return [];
};

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
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
  }))
);
