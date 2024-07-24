import React from 'react';
import { Navigate } from 'react-router-dom';
import store from '../redux/store';

const PrivateRoutesAdmin = ({ children }) => {
  const TokenAdmin = store.getState().admin;
  return TokenAdmin.Token !== '' && TokenAdmin.status ? children : <Navigate to='/' />;
};

export default PrivateRoutesAdmin;
