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
  text-align: center;
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

const TextWrapper = styled.div`
  min-width: 337px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  color: #ee4e4e;
`;

const Text = styled.div`
  font-size: 48px;
  font-weight: 900;
  font-family: "Ruda";
  margin: 0;

  &.playlist {
    color: #47292b;
  }

  &.emotion {
    color: #ee4e4e;
  }
`;

function PlayListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const emotion = location.state?.emotion;

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

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <NavBar />
      <TextWrapper>
        <Text className="emotion">{emotion ? emotion : "happy"}</Text>
        <Text className="playlist">Playlist</Text>
      </TextWrapper>
      <PlayListContainer>
        {/* 임시 더미 플레이리스트 -> 추후 api 구현 후 맵 구조로 변경 예정 */}
        <PlayList
          title="Uptown Funk"
          artist="Mark Ronson(feat. Bruno Mars)"
        ></PlayList>
      </PlayListContainer>
      <Button title="RESTART" onClick={handleClick} />
    </Container>
  );
}

export default PlayListPage;
