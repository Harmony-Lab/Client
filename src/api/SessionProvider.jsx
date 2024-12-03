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
          "http://43.203.219.49:8000/api/users/create-session",
          {
            method: "GET"
          }
        );
        if (!response.ok) {
          throw new Error("세션 요청 실패");
        }
        const data = await response.json();
        setSession(data.session_id);
        console.log(session);
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
