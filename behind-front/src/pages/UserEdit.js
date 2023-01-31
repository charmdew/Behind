import UserInfo from '../components/UserInfo';

import { useContext } from 'react';
import { UsersStateContext } from '../App';

const UserEdit = () => {
  const { loginUser } = useContext(UsersStateContext);

  return (
    <div>
      <UserInfo />
    </div>
  );
};

export default UserEdit;
