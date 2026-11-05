import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

export function CulinaryDetail() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/fashion/${slug}` : '/fashion'} replace />;
}

export default CulinaryDetail;
