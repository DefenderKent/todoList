import React from "react";
import style from "./../../index.module.scss";
import list from "./List.scss";
import classNames from "classnames";
import Badge from "../Badge/Badge";
import axios from "axios";
import removeSvg from "./../../assets/img/remove.svg";
import editSvg from "./../../assets/img/edit.svg";

const List = ({ items, isRemovable, onClick, onRemove, onClickItem }) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  // const reNameList = () => {
  //   const newTitle = window.prompt("Название списка", list.name);
  //   if (newTitle) {
  //     onEditTitle(list.id, newTitle);
  //     axios
  //       .patch("http://localhost:3001/lists/" + list.id, {
  //         name: newTitle,
  //       })
  //       .catch(() => {
  //         alert("Не удалось обновить название списка");
  //       });
  //   }
  // };

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
              <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
              <span>
                {item.name}
                {item.tasks &&
                  item.tasks.length > 0 &&
                  ` (${item.tasks.length})`}
              </span>
              {isRemovable && (
                <div>
                  {" "}
                  <img
                    className="list__remove-icon"
                    src={editSvg}
                    alt=""
                  />{" "}
                  <img
                    className="list__remove-icon"
                    src={removeSvg}
                    alt=""
                    onClick={() => removeList(item)}
                  />
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
