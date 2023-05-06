import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

function Modal({
  setModalActive,
  choosenUserId,
  setUsers,
}) {
  const modal = document.getElementById("modal");

  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    modal.appendChild(container);
    return () => {
      modal.removeChild(container);
    };
  });

  const handleReject = () => {
    setModalActive(false);
  };

  const handleAccept = () => {
    setUsers((prev) => prev.filter((item) => item.id !== choosenUserId));
    setModalActive(false);
  };

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalMsg}>
          Вы уверены, что хотите удалить пользователя?
        </div>
        <div className={styles.modalBtns}>
          <button className={styles.yesBtn} onClick={handleAccept}>
            Да
          </button>
          <button className={styles.noBtn} onClick={handleReject}>
            Нет
          </button>
        </div>
      </div>
    </div>,
    container
  );
}

export default Modal;
