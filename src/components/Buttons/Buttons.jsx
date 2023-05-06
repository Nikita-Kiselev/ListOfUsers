import React from "react";

import Button from "./Button/Button";

import styles from "./Buttons.module.css";

function Buttons({ pages, currentPage, setCurrentPage }) {
  return (
    <>
      <div className={styles.buttons}>
        {pages.map((page, id) => (
          <Button
            text={page}
            key={id}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </div>
    </>
  );
}

export default Buttons;
