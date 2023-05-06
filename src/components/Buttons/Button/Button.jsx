import React from "react";

import styles from "./Button.module.css";

function Button({ text, currentPage, setCurrentPage }) {

    const handleClick = () => {
      setCurrentPage(text);
    }

    if(text === currentPage){
      // отмечаем текущую страницу
     return <button className={styles.currentPage} onClick={handleClick}>{text}</button>;
    }

  return <button className={styles.paginationBtn} onClick={handleClick}>{text}</button>;
}

export default Button;
