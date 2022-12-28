import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("loksewa_user")) {
      setLoading(true);
      setUser(JSON.parse(localStorage.getItem("loksewa_user")));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    localStorage.setItem("loksewa_user", JSON.stringify(user));
    setLoading(false);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
