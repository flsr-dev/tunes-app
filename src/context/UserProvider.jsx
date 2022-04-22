import React, { useMemo, useState } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import { UserContext } from './contexts';

function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const value = useMemo(() => ({ username, setUsername }), [username]);
  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default UserProvider;
