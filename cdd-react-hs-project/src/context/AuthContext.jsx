import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserById, registerUser } from '../services/userService';
import { getAdminById } from '../services/adminService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si hay usuario en localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (identifier, userType) => {
    if (userType === 'usuario') {
      // Login de usuario: buscar por documento (que es el ID)
      const userData = await getUserById(identifier);
      const newUser = {
        id: userData.id,
        nombre: userData.nombre,
        apellido: userData.apellido,
        telefono: userData.telefono,
        userType: 'usuario',
        loginTime: new Date().toISOString()
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    } else if (userType === 'admin') {
      // Login de admin: buscar por ID (cédula), igual que usuario
      const adminData = await getAdminById(identifier);
      const newUser = {
        id: adminData.id,
        nombre: adminData.nombre,
        apellido: adminData.apellido,
        userType: 'admin',
        loginTime: new Date().toISOString()
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    }
  };

  const register = async (formData) => {
    // Mapear campos del formulario al UsuarioExternoDTO del backend
    const [nombre, ...apellidoParts] = formData.fullName.trim().split(' ');
    const apellido = apellidoParts.join(' ') || '';

    const usuarioDTO = {
      id: parseInt(formData.document),
      nombre,
      apellido,
      telefono: formData.phone,
      tipoDeDoc: 'CC',
      fechaDeNacimiento: formData.birthDate,
      haciendoMusculacion: formData.musculation || false,
      esDeportistaActivo: formData.activeAthlete || false,
    };

    const createdUser = await registerUser(usuarioDTO);
    return createdUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
