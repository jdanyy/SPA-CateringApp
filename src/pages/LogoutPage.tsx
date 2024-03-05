import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LogoutPage() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout]);

  return null;
}
