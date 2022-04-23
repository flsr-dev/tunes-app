import useSaveUser from './useSaveUser';

const useCreateUser = (user, setUserInfo) => {
  const newUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  useSaveUser({ ...newUser, ...user }, setUserInfo);
};

export default useCreateUser;
