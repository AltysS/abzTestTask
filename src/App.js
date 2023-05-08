import { useEffect, useState } from "react";
import sortUsersByDate from "./Functions/sortUsersByDate";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import getUsers from "./Functions/getUsers";

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [userAdded, setUserAdded] = useState(false);
  const [next_URL, setNext_URL] = useState();

  const updateUsers = () => {
    const updateData = async () => {
      const usersData = await getUsers();
      setUsers(usersData.users);
      setBtnDisabled(false);
    };
    try {
      updateData();
      setUserAdded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowUsers = () => {
    const getUsers = async () => {
      const usersData = await fetch(next_URL).then((res) => res.json());
      if (usersData.links.next_url === null) {
        setBtnDisabled(true);
        setNext_URL(usersData.links.next_url);
        setUsers((prev) => {
          return [...prev, ...usersData.users];
        });
      } else {
        setNext_URL(usersData.links.next_url);
        setUsers((prev) => {
          return [...prev, ...usersData.users];
        });
      }
    };

    try {
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const asyncUsersData = async () => {
      const usersData = await getUsers();
      setUsers(sortUsersByDate(usersData.users));
      setIsLoading(true);
      setNext_URL(usersData.links.next_url);
    };
    try {
      asyncUsersData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="App">
      <Header />
      <Main
        users={users}
        loading={loading}
        handleShowUsers={handleShowUsers}
        btnDisabled={btnDisabled}
        updateUsers={updateUsers}
        userAdded={userAdded}
      />
    </div>
  );
}

export default App;
