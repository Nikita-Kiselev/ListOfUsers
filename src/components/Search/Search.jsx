import React, { useState } from "react";

import styles from "./Search.module.css";

import search from "./../../images/search.svg";

function Search({
  users,
  setUsers,
  cleanFilter,
  setFilterActive,
  filterActive,
}) {
  const [inpVal, setInpVal] = useState("");

  const handleChange = (val) => {
    setInpVal(val);
    searchUsers(val);
    setFilterActive(true);
  };

  const searchUsers = (val) => {
    const newArr = users.filter((user) => {
      const regex = new RegExp(val, "gi");
      return user.username.match(regex) || user.email.match(regex);
    });
    setUsers(newArr);
  };

  const handleClickCleanFilter = () => {
    setInpVal("");
    cleanFilter(users);
    setFilterActive(false);
  };

  return (
    <section className={styles.search}>
      <div className={styles.inner}>
        <div className={styles.inpInner}>
          <img src={search} alt="" />
          <input
            type="text"
            placeholder="Поиск по имени или e-mail"
            value={inpVal}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {filterActive && (
          <div className={styles.cleanFilter} onClick={handleClickCleanFilter}>
            Очистить фильтр
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
