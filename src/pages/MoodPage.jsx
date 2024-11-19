import React from "react";
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
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;
  const emotionData = location.state?.emotion;
  const emotion = emotionData ? emotionData.emotion : "happy";

  const handleClick = () => {
    navigate("/playlist", {
      state: { emotion }
    });
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
