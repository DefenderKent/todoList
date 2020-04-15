import React, { useState } from "react";
import style from "./../../index.module.scss";
import Modal from "react-modal";
import list from "./List.scss";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import axios from "axios";
import Moment from "react-moment";
import removeSvg from "./../../assets/img/remove.svg";
import editSvg from "./../../assets/img/edit.svg";

const DataTime = (props) => {
  return <div className="dataTime">Создано: {props.datecreation}</div>;
};
const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  onEditTitle,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const reNameList = (item) => {
    const newTitle = window.prompt("Название списка", item.name);
    if (newTitle) {
      onEditTitle(item.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + item.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Не удалось обновить название списка");
        });
    }
  };

  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => {
          return (
            <li
              key={index}
              className={classNames(item.className, { active: item.active })}
              onClick={onClickItem ? () => onClickItem(item) : null}
            >
              <i>{item.icon ? "" : <Badge color={item.color.name} />}</i>
              <span>
                {item.name}
                {item.tasks &&
                  item.tasks.length > 0 &&
                  ` (${item.tasks.length})`}
              </span>
              <i>
                {item.icon ? "" : <DataTime datecreation={item.datecreation} />}
              </i>
              <i>{item.icon ? item.icon : ""}</i>
              {isRemovable && (
                <div>
                  {" "}
                  <img
                    className="list__remove-icon"
                    src={editSvg}
                    onClick={() => reNameList(item)}
                    alt=""
                  />{" "}
                  <img
                    className="list__remove-icon"
                    src={removeSvg}
                    alt=""
                    onClick={() => removeList(item)}
                  />
                  <Modal
                    className="mobalPopup"
                    isOpen={modalIsOpen}
                    contentLabel="Example Modal"
                  >
                    <h3>Вы действительно хотите удалить задачу из списка?</h3>
                    <div onClick={() => removeList(item)}>Готово</div>
                  </Modal>
                </div>
              )}{" "}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default List;
