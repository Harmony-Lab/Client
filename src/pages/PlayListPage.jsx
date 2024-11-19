import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import PlayList from "../components/PlayList";
import { useSession } from "../user/SessionProvider";

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
  const session = useSession();
  const emotionData = location.state?.emotion;
  const emotion = emotionData ? emotionData.emotion : "happy";
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const sessionId = document.cookie
          .split("; ")
          .find((row) => row.startsWith("session_id="))
          ?.split("=")[1];

        const response = await fetch("http://localhost:8000/api/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await response.json();
        setPlaylists(data.playlist.songs);
      } catch (error) {
        console.error("Error analyzing emotion:", error);
      }
    };

    fetchPlaylists();
  }, [session]);

  const handleClick = () => {
    navigate("/");
  };

  const handleSongClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container>
      <NavBar />
      <TextWrapper>
        <Text className="emotion">{emotion ? emotion : "happy"}</Text>
        <Text className="playlist">Playlist</Text>
      </TextWrapper>
      <PlayListContainer>
        {playlists.map((song, index) => (
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
