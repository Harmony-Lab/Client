import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffef4;
  gap: 40px;
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

function LandingPage() {
  return (
    <Container>
      <NavBar />
      <TextWrapper>Show me your mood right now</TextWrapper>
      <Button title="START" />
    </Container>
  );
}

export default LandingPage;
