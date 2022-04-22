import React, { useMemo, useState } from 'react';
import { arrayOf, node, oneOfType } from 'prop-types';
import AppContext from './AppContext';

function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const value = useMemo(() => ({ username, setUsername }), [username]);
  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
}

UserProvider.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default UserProvider;
