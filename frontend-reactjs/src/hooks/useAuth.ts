import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

// Definisikan tipe untuk data pengguna
interface User {
  email: string;
  // Tambahkan properti lain sesuai kebutuhan
}

const useAuth = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get('token'); // Ambil token dari cookie
    if (token) {
      const decodedToken = jwtDecode<User>(token); // Dekode token dengan tipe User
      setUser(decodedToken);
    }
  }, []);

  return user;
};

export default useAuth;
