import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export function useNavigateConsultant() {
  const navigate = useNavigate();
  return useCallback(() => navigate('/consultant/dashboard'), [navigate]);
}
