import { useContext } from 'react';
import { UserContext } from '../context/contexts';

const USER_KEY = 'user';

const useSaveUser = (user) => {
  const { setUsername } = useContext(UserContext);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  setUsername(user);
};

export default useSaveUser;
