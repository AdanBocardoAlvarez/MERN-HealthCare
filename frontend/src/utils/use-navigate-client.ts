import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateClient() {
  const navigate = useNavigate();
  return useCallback(() => navigate('/client/dashboard'), [navigate]);
}
