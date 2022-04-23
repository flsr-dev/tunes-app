const USER_KEY = 'user';

const useSaveUser = (user, setUserInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  setUserInfo(user);
};

export default useSaveUser;
