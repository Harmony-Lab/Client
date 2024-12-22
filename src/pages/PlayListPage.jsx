import React, { useEffect, useState } from "react";
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
  font-family: "Ruda";
  margin: 0;

  &.playlist {
    font-size: 48px;
    font-weight: 900;
    color: #47292b;
  }

  &.emotion {
    font-size: 48px;
    font-weight: 900;
    color: #ee4e4e;
  }

  &.comment {
    font-size: 28px;
    font-weight: 600;
    color: #47292b;
    text-align: center;
  }
`;

function PlayListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const emotion = location.state?.emotion;
  const playlist = location.state?.playlist;

  const fetchToken = async () => {
    try {
      const response = await fetch(
        "http://43.203.219.49:8000/api/users/restart-session",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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

  const handleClick = async () => {
    try {
      fetchToken();
      navigate("/");
    } catch (error) {
      console.error("Error restarting: ", error);
    }
  };

  const handleSongClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container>
      <NavBar />
      <TextWrapper>
        <Text className="emotion">{emotion ? emotion : ""}</Text>
        <Text className="playlist">Playlist</Text>
      </TextWrapper>
      <Text className="comment">Click on the music title (●'◡'●)</Text>
      <PlayListContainer>
        {playlist.map((song, index) => (
          <PlayList
            key={index}
            title={song.title}
            artist={song.artist}
            onClick={() => handleSongClick(song.url)}
          />
        ))}
      </PlayListContainer>
      <Button title="RESTART" onClick={handleClick} />
    </Container>
  );
}

export default PlayListPage;
