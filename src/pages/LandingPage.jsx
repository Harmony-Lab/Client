import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import WebCam from "../components/WebCam";
import { useNavigate } from "react-router-dom";
import { useSession } from "../user/SessionProvider";

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

function LandingPage() {
  const [countdown, setCountdown] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [capture, setCapture] = useState(false);
  const navigate = useNavigate();
  const session = useSession();

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
    console.log("Captured image:", imageSrc);
    setCapture(false);

    try {
      const response = await fetch("https://3.36.65.47:8000/api/emotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ img_path: imageSrc })
      });

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
      <TextWrapper>Show me your mood right now</TextWrapper>
      <WebCam onCapture={capture ? handleCapture : null} />
      {showButton && <Button title="START" onClick={handleStart} />}
      {countdown !== null && <CountDown>{countdown}</CountDown>}
    </Container>
  );
}

export default LandingPage;
