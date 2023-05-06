import React from "react";

import cancel from "./../../../images/cancel.svg";

import styles from "./Row.module.css";

function Row({ user, setModalActive, setChoosenUserId }) {
  const { id, username, email, registration_date, rating } = user;

  const date = new Date(registration_date);
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  const handleClick = () => {
    setModalActive(true);
    setChoosenUserId(id);
  };
  return (
    <tr>
      <td className={styles.username}>{username}</td>
      <td className={styles.email}>{email}</td>
      <td className={styles.date}>
        {year}.{month}.{day}
      </td>
      <td className={styles.rating}>{rating}</td>
      <td className={styles.delete}>
        <img src={cancel} alt="delete" onClick={handleClick} />
      </td>
    </tr>
  );
}

export default Row;
