import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
`;

function LandingPage() {
  return (
    <Container>
      <NavBar />
    </Container>
  );
}

export default LandingPage;
