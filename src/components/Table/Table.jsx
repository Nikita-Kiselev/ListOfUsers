import React, { useState } from "react";

import styles from "./Table.module.css";
import "./../../App.css";

import Row from "./Row/Row";

function Table({
  currentPageUsers,
  setModalActive,
  setChoosenUserId,
  users,
  setUsers,
  setFilterActive,
}) {
  // считываем сколько кликов мы сделали
  const [countClicksDateRegistr, setCountClicksDateRegistr] = useState(2);
  const [countClicksRating, setCountClicksRating] = useState(2);

  const sortByDateRegistr = () => {
    let newArr;
    if (countClicksDateRegistr >= 2) {
      // сортировка по возрастанию
      newArr = [...users].sort((a, b) => {
        let dateA = new Date(a.registration_date),
          dateB = new Date(b.registration_date);
        return dateB - dateA;
      });
      setCountClicksDateRegistr((prev) => prev - 1);
    } else {
      // сортировка по убыванию
      newArr = [...users].sort((a, b) => {
        let dateA = new Date(a.registration_date),
          dateB = new Date(b.registration_date);
        return dateA - dateB;
      });
      setCountClicksDateRegistr((prev) => prev + 1);
    }
    setUsers(newArr);
    setFilterActive(true);
  };

  const sortByRating = () => {
    let newArr;
    if (countClicksRating >= 2) {
      // сортировка по возрастанию
      newArr = [...users].sort((a, b) => {
        return b.rating - a.rating;
      });
      setCountClicksRating((prev) => prev - 1);
    } else {
      // сортировка по убыванию
      newArr = [...users].sort((a, b) => {
        return a.rating - b.rating;
      });
      setCountClicksRating((prev) => prev + 1);
    }
    setUsers(newArr);
    setFilterActive(true);
  };

  const handleClick = (e) => {
    const sortByRatingDiv = document.querySelector(".sortByRating");
    const sortByDateDiv = document.querySelector(".sortByDateRegistr");
    if (e.target.classList.contains("sortByDateRegistr")) {
      if (sortByRatingDiv.classList.contains("active")) {
        sortByRatingDiv.classList.remove("active");
      }
      sortByDateRegistr();
    } else {
      if (sortByDateDiv.classList.contains("active")) {
        sortByDateDiv.classList.remove("active");
      }
      sortByRating();
    }
    e.target.classList.add("active");
  };


  return (
    <>
      <div className={styles.sortingSection}>
        <span>Сортировка:</span>
        <div className="sortByDateRegistr" onClick={handleClick}>
          Дата регистрации
        </div>
        <div className="sortByRating" onClick={handleClick}>
          Рейтинг
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>E-mail</th>
            <th>Дата регистрации</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          {currentPageUsers.map((user) => (
            <Row
              user={user}
              key={user.id}
              setModalActive={setModalActive}
              setChoosenUserId={setChoosenUserId}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
