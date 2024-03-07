import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";
import { useToDoStore } from "../../data/stores/toDoStore";

import style from "./index.module.scss";

export const App: React.FC = () => {
  const { tasks, createTask, removeTask, updateTask } = useToDoStore(
    (state) => state
  );

  return (
    <article className={style.toDoList}>
      <h1 className={style.toDoList_title}>To Do List</h1>
      <section className={style.toDoList_addTask}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <hr />
      <section className={style.toDoList_tasks}>
        {!tasks.length && (
          <p className={style.toDoList_text}>There is no one task :(</p>
        )}
        {tasks.map((item) => (
          <InputTask
            key={item.id}
            id={item.id}
            title={item.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};
