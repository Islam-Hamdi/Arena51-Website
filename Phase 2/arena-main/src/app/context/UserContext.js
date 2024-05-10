"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateUserBalance = (newBalance) => {
    setUser({ ...user, balance: newBalance });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, balance: newBalance })
    );
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
