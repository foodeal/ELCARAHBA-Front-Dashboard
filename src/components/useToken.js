import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useToken() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchAndSaveDynamicToken = async () => {
      try {
        const response = await axios.get('https://79.137.85.120:443/users/authenticate'); // je dois verifier l'endpoint de l'authentificationn
        const dynamicToken = await response.data.token;
        localStorage.setItem('token', JSON.stringify(dynamicToken));
        setToken(dynamicToken);
      } catch (error) {
        console.error('Error fetching dynamic token:', error);
      }
    };

    if (!token) {
      fetchAndSaveDynamicToken();
    }
  }, [token]);

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    removeToken,
    token
  };
}
