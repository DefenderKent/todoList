import React, { useState } from "react";

import axios from "axios";
import Modal from "react-modal";
import classNames from "classnames";
import List from "./../List/List";
import style from "./AddButtonList.scss";
import closeSvg from "../../assets/img/close.svg";
import Badge from "../Badge/Badge";
import "./../Login/Login.scss";
const AddButtonList = ({ colors, onAdd }) => {
  const [lists, setLists] = useState(null);
  const [seletedColor, selectColor] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useState(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setLists(false);
    setInputValue("");
    selectColor(colors[0].id);
  };
  const popUpOn = () => {
    setLists(false);
    setInputValue("");
    selectColor(colors[0].id);
    setIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
  }
  const addList = () => {
    if (!inputValue) {
      return alert("введите назавание");
    }
    const color = colors.filter((c) => c.id === seletedColor)[0].name;
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        datecreation: "15:28 15/04/2020",
        colorId: seletedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === seletedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        popUpOn();
      })
      .catch(() => {
        alert("Ошибка при добавлении списка!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setLists(!lists)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить задачу",
          },
        ]}
      />
      {lists && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            className="field"
            type="text"
            placeholder="Название списка"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={seletedColor === color.id && "active"}
              />
            ))}
          </div>
          <div className="listInfo">
            <ul>
              <li>
                <span className="listInfo__1"> </span> Обычная*
              </li>
              <li>
                <span className="listInfo__2"> </span>Не срочная*
              </li>
              <li>
                <span className="listInfo__3"> </span>Срочная задача*
              </li>
            </ul>
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
      <Modal
        className="mobalPopup"
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
      >
        <h3>Задача успешно добавлена</h3>
        <button onClick={closeModal}>Готово</button>
      </Modal>
    </div>
  );
};

export default AddButtonList;
