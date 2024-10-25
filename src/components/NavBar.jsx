import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

//[todo] navigation bar style
const Container = styled.div`
  width: calc(100%);
  height: calc(10%);
  display: flex;
  justify-content: center;
  padding: 22px 0;
  background-color: rgba(147, 182, 94, 0.28);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.div`
  font-size: 36px;
  font-weight: 800;
  font-family: "Ruda";
  color: #48582f;
`;

//[todo] navigation bar routing
function NavBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    if (useParams() != "/") {
      navigate("/");
    }
  };
  return (
    <Container>
      <Logo onClick={handleClick}>MoodTune</Logo>
    </Container>
  );
}

export default NavBar;
