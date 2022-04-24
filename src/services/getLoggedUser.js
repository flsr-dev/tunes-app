import guestUser from './guestUser';

const USER_KEY = 'user';

const getLoggedUser = () => JSON.parse(localStorage.getItem(USER_KEY)) || guestUser;

export default getLoggedUser;
