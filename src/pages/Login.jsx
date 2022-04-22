import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/contexts';

export default function Login() {
  const [username, setTempUsername] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const { setUserName } = useContext(UserContext);

  const checkUserLength = () => {
    if (username) {
      const MIN_USERNAME_LENGTH = 3;
      if (username.length >= MIN_USERNAME_LENGTH) setIsLoginDisabled(false);
      if (username.length < MIN_USERNAME_LENGTH) setIsLoginDisabled(true);
    }
  };

  useEffect(() => {
    checkUserLength();
  }, [username]);

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
      <button type="button" disabled={isLoginDisabled}>Login</button>

    </div>
  );
}
