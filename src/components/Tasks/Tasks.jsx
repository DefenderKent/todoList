import React from "react";
import axios from "axios";
import edit from "./../../assets/img/edit.svg";
import Task from "./Task";
import "./Tasks.scss";
import AddTaskForm from "./AddTaskForm";
const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onEditTask,
  onCompleteTask,
  onRemoveTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name} <img onClick={editTitle} src={edit} alt="" />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
        {list.tasks.map((task) => (
          <Task
            key={task.id}
            {...task}
            onRemove={onRemoveTask}
            list={list}
            onEdit={onEditTask}
            onComplete={onCompleteTask}
          />
        ))}
      </div>
    </div>
  );
};
export default Tasks;
