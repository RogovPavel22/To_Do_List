import { useEffect, useRef, useState } from "react";

import style from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditFlag, setIsEditFlag] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditFlag) {
      inputRef?.current?.focus();
    }
  }, [isEditFlag]);

  return (
    <div className={style.task}>
      <label className={style.task_label}>
        <input
          className={style.task_checkbox}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            setTimeout(() => {
              onDone(id);
            }, 300);
          }}
          disabled={isEditFlag}
        />
        {isEditFlag ? (
          <input
            className={style.task_inputEdit}
            type="text"
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setIsEditFlag(false);
              }
            }}
          />
        ) : (
          <h3 className={style.task_title}>{title}</h3>
        )}
      </label>
      {isEditFlag ? (
        <button
          className={style.task_save}
          aria-label="Save"
          onClick={() => {
            onEdited(id, value);
            setIsEditFlag(false);
          }}
        />
      ) : (
        <button
          className={style.task_edit}
          aria-label="Edit"
          onClick={() => {
            setIsEditFlag(true);
          }}
        />
      )}

      <button
        className={style.task_remove}
        aria-label="Remove"
        onClick={() => {
          if (confirm("A you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
