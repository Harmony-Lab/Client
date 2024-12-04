import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(getCookie("session_id"));
  const fetchedRef = useRef(false);

  const fetchSession = async () => {
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
      if (!response.ok) {
        throw new Error("세션 요청 실패");
      }
      const data = await response.json();

      // 기존 쿠키 삭제 후 새로운 세션 설정
      deleteCookie("session_id");
      setSession(data.session_id);
      setCookie("session_id", data.session_id, 7);
    } catch (error) {
      console.error("세션 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchSession();
    }
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
