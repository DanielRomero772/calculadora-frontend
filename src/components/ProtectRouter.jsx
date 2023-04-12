import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRouter = () => {
  const trainer = useSelector(state => state.trainer);
  if (trainer) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectRouter;
