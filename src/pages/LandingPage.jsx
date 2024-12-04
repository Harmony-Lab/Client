import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import WebCam from "../components/WebCam";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffef4;
  gap: 50px;
`;

const TextWrapper = styled.div`
  width: calc(30%);
  min-width: 520px;
  font-size: 28px;
  font-weight: 600;
  font-family: "Ruda";
  color: #47292b;
  text-align: center;
`;

const CountDown = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 800;
  font-family: "Ruda";
  font-size: 22px;
  color: #fffbdc;
  border-radius: 50%;
  background-color: #48582f;
`;

const GuideLink = styled.a`
  color: #d53d3d;
  text-decoration: underline;
  font-size: 30px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: #47292b;
  }
`;

function LandingPage() {
  const [countdown, setCountdown] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [capture, setCapture] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown !== null) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setCapture(true);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleStart = () => {
    setShowButton(false);
    setCountdown(3);
  };

  const handleCapture = async (imageSrc) => {
    setCapture(false);

    try {
      const response = await fetch("http://43.203.219.49:8000/api/emotions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ img_path: imageSrc })
      });

      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }

      const data = await response.json();
      navigate("/mood", {
        state: { image: imageSrc, emotion: data.emotion }
      });
    } catch (error) {
      console.error("Error analyzing emotion:", error);
    }
  };

  return (
    <Container>
      <NavBar />
      <GuideLink
        href="https://zziglet.notion.site/How-to-use-webcam-in-MoodTune-152b37c0f882809fad56cc42db989054?pvs=4"
        target="_blank"
        rel="noopener noreferrer"
      >
        If you can't see the webcam...(click)
      </GuideLink>
      <TextWrapper>Show me your mood right now</TextWrapper>
      <WebCam onCapture={capture ? handleCapture : null} />
      {showButton && (
        <>
          <Button title="START" onClick={handleStart} />
        </>
      )}
      {countdown !== null && <CountDown>{countdown}</CountDown>}
    </Container>
  );
}

export default LandingPage;
