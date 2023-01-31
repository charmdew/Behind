import { useContext } from 'react';
import { UsersStateContext } from '../App';

import ProfileList from '../components/ProfileList';

const Home = () => {
  const { users } = useContext(UsersStateContext);

  return (
    <div>
      <ProfileList userList={users} />
    </div>
  );
};

export default Home;
