import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // 사용자 접속 시 토큰 요청
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "http://43.203.219.49:8000/api/users/create-session",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          console.log("Token obtained:", data.token);

          // 로컬 스토리지에 토큰 저장
          localStorage.setItem("jwtToken", data.token);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        console.error("Failed to obtain token:", error);
      }
    };

    fetchToken();
  }, [token]);

  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
