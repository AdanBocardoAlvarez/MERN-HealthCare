import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateAdmin() {
  const navigate = useNavigate();
  return useCallback(() => navigate('/admin/dashboard'), [navigate]);
}
