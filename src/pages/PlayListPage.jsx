import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import PlayList from "../components/PlayList";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffef4;
  gap: 50px;
`;

const PlayListContainer = styled.div`
  width: 386px;
  min-height: 508px;
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 25px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fcf4dc;
  border-top: 0.8px solid #48582f;
  border-bottom: 0.8px solid #48582f;
  box-sizing: border-box;
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
      <PlayListContainer>
        <PlayList
          title="Uptown Funk"
          artist="Mark Ronson(feat. Bruno Mars)"
        ></PlayList>
      </PlayListContainer>
    </Container>
  );
}

export default PlayListPage;
