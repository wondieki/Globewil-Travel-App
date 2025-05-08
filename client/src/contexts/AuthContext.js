import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("AuthContext: Loaded user from localStorage:", parsedUser);
        setCurrentUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user:", err);
      }
    }
    setLoading(false); // ✅ Done loading after checking localStorage
  }, []);

  if (loading) {
    return <p>Loading...</p>; // ✅ Prevents premature rendering
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
