import React from 'react';
import { useParams } from 'react-router-dom';

const DashboardInner = () => {
  let params = useParams();
  const id = params.id;

  return (
    <div>{id}</div>
  );
};

export default DashboardInner;