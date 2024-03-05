import React from "react";

import style from "./index.module.scss";

export const App: React.FC = () => {
  return (
    <article className={style.toDoList}>
      <h1 className={style.toDoList_title}>To Do List</h1>
      <section className={style.toDoList_addTask}></section>
      <hr />
      <section className={style.toDoList_tasks}></section>
    </article>
  );
};
