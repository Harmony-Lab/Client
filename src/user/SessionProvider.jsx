import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    try {
      const response = await fetch(
        "http://43.203.219.49:8000/api/users/create-session",
        {
          method: "GET",
          credentials: "include"
        }
      );
      if (!response.ok) {
        throw new Error("세션 요청 실패");
      }
      const data = await response.json();
      setSession(data.session_id);
      document.cookie = `session_id=${data.session_id}; path=/; SameSite=None; Secure`;
    } catch (error) {
      console.error("세션 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
