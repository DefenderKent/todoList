import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import style from "./index.module.scss";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { AddButtonList, List, Tasks, Header } from "./components";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const App = () => {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [users, setusers] = useState(null);
  let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/users").then(({ data }) => {
      setusers(data);
    });
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const logout = (id, title) => {
    const newList = users.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setusers(newList);
  };
  const login = (id, title) => {
    const newList = users.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });

    setusers(newList);
  };
  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };
  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [taskObj, ...item.tasks];
      }
      return item;
    });
    setLists(newList);
  };
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
        alert("Не удалось удалить задачу");
      });
    }
  };
  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Текст задачи", taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskObj.id, {
        text: newTaskText,
      })
      .catch(() => {
        alert("Не удалось обновить задачу");
      });
  };
  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };
  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, {
        completed,
      })
      .catch(() => {
        alert("Не удалось обновить задачу");
      });
  };
  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, history.location.pathname]);

  return (
    <div className={style.container}>
      {/* <Route path="/login" exact>
        {users !== null &&
          users.map((lo) => {
            return (
              <Login
                id={lo.id}
                login={lo.login}
                loginF={login}
                setusers={setusers}
              />
            );
          })}
      </Route> */}
      <Route
        path="/"
        exact
        render={() => (
          <Login login={login} users={users} onAddList={onAddList} />
        )}
      />
      <Route path="/register" exact render={() => <Register />} />

      <div className={style.todo}>
        {/* {users !== null &&
          users.map((u) => {
            return u.login === "ivadn" && <Redirect to={"/login"} />;
          })} */}
        <Route
          path="/profile"
          render={() => (
            <div>
              <div className={style.todo__sidebar}>
                <Route path="/profile">
                  {users !== null &&
                    users.map((us) => {
                      return (
                        <Header
                          key={us.id}
                          id={us.id}
                          login={us.login}
                          logout={logout}
                          setusers={setusers}
                        />
                      );
                    })}
                </Route>
                <List
                  onClickItem={(list) => {
                    history.push(`/profile/lists`);
                  }}
                  items={[
                    {
                      icon: (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                            fill="black"
                          />
                        </svg>
                      ),
                      name: "Все задачи",
                    },
                  ]}
                />
                <List
                  onClickItem={(list) => {
                    history.push(`/profile/lists/2`);
                  }}
                  items={[
                    {
                      icon: (
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ),
                      name: "Исполненные",
                    },
                  ]}
                />
                <List
                  onClickItem={(list) => {
                    history.push(`/profile/lists/3`);
                  }}
                  items={[
                    {
                      icon: (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z"
                            fill="black"
                          />
                        </svg>
                      ),
                      name: "Неисполненные",
                    },
                  ]}
                />
              </div>
            </div>
          )}
        />

        <Route
          path="/profile"
          render={() => {
            return (
              <div className={style.taskBorder}>
                <h2 className={style.myTasks}>Мои задачи</h2>
                <AddButtonList colors={colors} onAdd={onAddList} />
                {lists ? (
                  <List
                    items={lists}
                    onEditTitle={onEditListTitle}
                    onRemove={(id) => {
                      const newLists = lists.filter((item) => item.id !== id);
                      setLists(newLists);
                    }}
                    onClickItem={(item) =>
                      history.push(`/profile/lists/${item.id}`)
                    }
                    activeItem={activeItem}
                    isRemovable
                  />
                ) : (
                  "Загрузка"
                )}
              </div>
            );
          }}
        />
        <div className={style.todo__tasks}>
          <Route exact path="/profile/lists">
            {lists &&
              lists.map((list) => {
                return (
                  <Tasks
                    key={list.id}
                    list={list}
                    onEditTitle={onEditListTitle}
                    onAddTask={onAddTask}
                    onRemoveTask={onRemoveTask}
                    onEditTask={onEditTask}
                    onCompleteTask={onCompleteTask}
                  />
                );
              })}
          </Route>
          <Route exact path="/profile/lists/:id">
            {lists && activeItem && (
              <Tasks
                list={activeItem}
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
                withoutEmpty
              />
            )}
          </Route>
        </div>
      </div>
    </div>
  );
};

export default App;
