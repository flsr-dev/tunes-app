import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/contexts';
import useCreateUser from '../hooks/useCreateUser';
// require('dotenv').config;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const { setUserInfo } = useContext(UserContext);
  const history = useNavigate();

  useEffect(() => {
    const checkUserLength = () => {
      const MIN_USERNAME_LENGTH = 3;
      if (username && username.length >= MIN_USERNAME_LENGTH) return setIsLoginDisabled(false);
      return setIsLoginDisabled(true);
    };
    checkUserLength();
  }, [username]);

  const handleLoginBtnClick = () => {
    useCreateUser({ name: username }, setUserInfo);
    history('/search');
  };

  const handleInputChange = ({ target: { value } }, changeStateFunc) => (
    changeStateFunc(value));
  return (
    <div>
      <input
        type="text"
        name="username"
        aria-label="user name"
        value={username}
        onChange={(event) => handleInputChange(event, setUsername)}
      />
      <input
        type="password"
        name="password"
        aria-label="password"
        value={password}
        onChange={(event) => handleInputChange(event, setPassword)}
      />
      <button
        type="button"
        disabled={isLoginDisabled}
        onClick={handleLoginBtnClick}
      >
        Login
      </button>
    </div>
  );
}
