import { useEffect, useState } from "react";

import axios from "axios";

import "./App.css";

import Search from "./components/Search/Search";
import Table from "./components/Table/Table";
import Buttons from "./components/Buttons/Buttons";
import Modal from "./components/Modal/Modal";

function App() {
  const [users, setUsers] = useState([]); // все пользователи
  const [pages, setPages] = useState([]); // всего  страниц
  const [currentPage, setCurrentPage] = useState(1); // текущая страница
  const [currentPageUsers, setCurrentPageUsers] = useState([]); // пользователи на одной странице
  const [choosenUserId, setChoosenUserId] = useState(null); // выбранный пользователь для удаления
  const [modalActive, setModalActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const getUsers = async () => {
    await axios
      .get("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users")
      .then((res) => {
        const data = res.data;
        setUsers(data);
        getPages(data);
      });
  };


  const getPages = (data) => {
    const length = Math.ceil(data.length / 5);
    const arr = [];
    for (let i = 1; i <= length; i++) {
      arr.push(i);
    }
    setPages(arr);
  };

  const getUsersOnCurrentPage = () => {
    const start = currentPage * 5 - 5;
    const end = currentPage * 5;
    const arr = users.slice(start, end);
    setCurrentPageUsers(arr);
  };

  const cleanFilter = () => {
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getPages(users);
  }, [users]);

  useEffect(() => {
    getUsersOnCurrentPage();
  }, [currentPage, users]);

  return (
    <div className="App">
      <div className="container">
        <div className="title">Список пользователей</div>
        <Search
          users={users}
          setUsers={setUsers}
          cleanFilter={cleanFilter}
          setFilterActive={setFilterActive}
          filterActive={filterActive}
        />
        <Table
          currentPageUsers={currentPageUsers}
          setModalActive={setModalActive}
          setChoosenUserId={setChoosenUserId}
          users={users}
          setUsers={setUsers}
          setFilterActive={setFilterActive}
        />
        <Buttons
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {modalActive && (
          <Modal
            setModalActive={setModalActive}
            choosenUserId={choosenUserId}
            setUsers={setUsers}
          />
        )}
      </div>
    </div>
  );
}

export default App;
