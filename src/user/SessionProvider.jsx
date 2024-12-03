import React, { createContext, useContext, useState, useEffect } from "react";

export const SessionProvider = ({ children }) => {
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
      } catch (error) {
        console.error("세션 요청 중 오류 발생:", error);
      }
    };

    fetchSession();
  }, []);
};
