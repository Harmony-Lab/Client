import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/users/create-session"
        );
        if (!response.ok) {
          throw new Error("세션 요청 실패");
        }
        const data = await response.json();
        setSession(data.session_id);
        document.cookie = `session_id=${data.session_id}; path=/;`;
      } catch (error) {
        console.error("세션 요청 중 오류 발생:", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
