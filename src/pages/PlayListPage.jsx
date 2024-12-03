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
  const emotion = location.state?.emotion;
  const [playlists, setPlaylists] = useState([]);
  const session = useSession();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          "http://43.203.219.49:8000/api/playlists/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();
        if (data.songs && Array.isArray(data.songs)) {
          setPlaylists(data.songs);
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://43.203.219.49:8000/api/users/restart-session",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to restart session");
      }
      navigate("/");
    } catch (error) {
      console.error("Error restarting session:", error);
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
