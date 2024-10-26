import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffef4;
  gap: 25px;
`;

function PlayListPage() {
  const location = useLocation();
  const emotion = location.state;

  useEffect(() => {
    try {
      //임시 api 요청 코드 구현
      // const response = await fetch("http://api/music", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ emotion: emotion})
      // });
      // const data = await response.json();
    } catch (error) {
      console.error("Error analyzing emotion:", error);
    }
  });

  return (
    <Container>
      <NavBar />
    </Container>
  );
}

export default PlayListPage;
