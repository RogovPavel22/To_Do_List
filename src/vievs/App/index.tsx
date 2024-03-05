import React from "react";

import { useToDoStore } from "../../data/stores/toDoStore";

import style from "./index.module.scss";

export const App: React.FC = () => {
  const { tasks, createTask, removeTask, updateTask } = useToDoStore(
    (state) => state
  );

  return (
    <article className={style.toDoList}>
      <h1 className={style.toDoList_title}>To Do List</h1>
      <section className={style.toDoList_addTask}></section>
      <hr />
      <section className={style.toDoList_tasks}></section>
    </article>
  );
};
