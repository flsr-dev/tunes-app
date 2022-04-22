import React, { useContext, useState } from 'react';
import { UserContext } from '../context/contexts';

export default function Login() {
  const [username, setTempUsername] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const { setUserName } = useContext(UserContext);

  const checkUserLength = () => {
    const MIN_USERNAME_LENGTH = 3;
    if (username >= 3) setIsLoginDisabled(false);
    if (username <= 3) setIsLoginDisabled(true);
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
      <button type="button">Login</button>

    </div>
  );
}
