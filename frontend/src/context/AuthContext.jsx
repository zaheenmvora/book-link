//AuthContext.jsx 

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Signup function
  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // prevent duplicate email
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("User already exists. Please login.");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login now.");
  };

  // ✅ Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
    } else {
      alert("Invalid email or password");
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};








