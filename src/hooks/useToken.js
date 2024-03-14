import jwtDecode from 'jwt-decode';
import { useState, useCallback } from 'react';

function useToken() {
  const getToken = useCallback(() => {
    const userToken = localStorage.getItem('token') || null;
    return {
      token: userToken,
      isExpired: userToken ? checkIfTokenExpired(userToken) : true,
    };
  }, []);

  const [tokenInfo, setTokenInfo] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setTokenInfo({ token: userToken, isExpired: checkIfTokenExpired(userToken) });
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    setTokenInfo({ token: null, isExpired: true });
  };

  return {
    setToken: saveToken,
    deleteToken,
    token: tokenInfo.token,
    isTokenExpired: tokenInfo.isExpired,
  };
}

function checkIfTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000 - 10;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}

export default useToken;
