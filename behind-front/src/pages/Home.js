import axios from 'axios';

import { useContext, useState, useEffect } from 'react';
import { UsersStateContext } from '../App';

import ProfileList from '../components/ProfileList';

const Home = () => {
  // const { users } = useContext(UsersStateContext);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  if (users.length !== 0) {
    return (
      <div>
        <ProfileList userList={users} />
      </div>
    );
  }
};

export default Home;
