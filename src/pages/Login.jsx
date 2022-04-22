import React, { useContext, useState } from 'react';
import { UserContext } from '../context/contexts';

export default function Login() {
  const [username, setTempUsername] = useState('');
  const { setUserName } = useContext(UserContext);

  const checkUserLength = () => {

  };

  const handleInputChange = ({ target: { value } }) => {
    setTempUsername(value);
  };
  return (
    <div>
      <input type="text" name="username" aria-label="user name" value={username} onChange={handleInputChange} />
      <button type="button">Login</button>

    </div>
  );
}
