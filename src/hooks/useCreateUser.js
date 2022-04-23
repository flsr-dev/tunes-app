import useSaveUser from './useSaveUser';

const useCreateUser = (user) => {
  const newUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  useSaveUser(...newUser, ...user);
};

export default useCreateUser;
