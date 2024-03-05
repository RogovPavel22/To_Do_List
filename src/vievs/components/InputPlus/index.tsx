import { useCallback, useState } from "react";

import style from "./index.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setinputValue] = useState("");
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setinputValue("");
  }, [inputValue]);

  return (
    <div className={style.input}>
      <input
        className={style.input_item}
        type="text"
        value={inputValue}
        placeholder="Type here..."
        onChange={(e) => setinputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      <button
        className={style.input_btn}
        onClick={addTask}
        aria-label="Add"
      ></button>
    </div>
  );
};
