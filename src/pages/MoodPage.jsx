import React, { useState } from "react";
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

const Image = styled.img`
  max-width: 512px;
  height: auto;
  margin-top: 30px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Text = styled.div`
  font-family: "Ruda";
  white-space: pre-wrap;

  &.yourmood {
    font-size: 40px;
    font-weight: 900;
    color: #47292b;
  }
  &.yourmoodis {
    font-size: 32px;
    font-weight: 400;
    color: #47292b;
  }
  &.emotion {
    font-size: 40px;
    font-weight: 900;
    color: #ee4e4e;
  }
`;

function MoodPage() {
  const [playlists, setPlaylists] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;
  const emotionData = location.state?.emotion;
  const emotion = emotionData ? emotionData : " ";

  const handleClick = async (playlists) => {
    try {
      const response = await fetch("http://43.203.219.49:8000/api/playlists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }

      const data = await response.json();
      if (data.songs && Array.isArray(data.songs)) {
        setPlaylists(data.songs);

        navigate("/playlist", {
          state: {
            emotion: emotion,
            playlist: data.songs
          }
        });
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <Container>
      <NavBar />
      <Image src={image} alt="Captured" />
      <TextContainer>
        <Text className="yourmood">Your Mood</Text>
        <Text className="yourmoodis">is...</Text>
      </TextContainer>
      <Text className="emotion">{emotion}</Text>
      <Button title="Check out the music" onClick={handleClick} />
    </Container>
  );
}

export default MoodPage;
