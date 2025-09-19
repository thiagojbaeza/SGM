import { useState, useEffect } from 'react';
import { getToken, isAuthenticated, logout } from '../services/auth';
import jwt_decode from 'jwt-decode';

export default function useAuth() {
  const [auth, setAuth] = useState({ token: getToken(), expired: false });

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const { exp } = jwt_decode(token);
        const expired = Date.now() >= exp * 1000;
        setAuth({ token, expired });
        if (expired) logout();
      } catch {
        logout();
        setAuth({ token: null, expired: true });
      }
    }
  }, []);

  return {
    token: auth.token,
    isAuthenticated: isAuthenticated() && !auth.expired,
    logout,
  };
}
