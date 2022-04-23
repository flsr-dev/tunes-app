import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/contexts';

export default function Login() {
  const [username, setTempUsername] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const { setUsername } = useContext(UserContext);
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
    setUsername(username);
    history('/search');
  };

  const handleInputChange = ({ target: { value } }) => {
    setTempUsername(value);
  };
  return (
    <div>
      <input
        type="text"
        name="username"
        aria-label="user name"
        value={username}
        onChange={handleInputChange}
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
