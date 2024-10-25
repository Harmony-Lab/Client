import React from "react";
import styled from "styled-components";

//전체 button style

const StyledButton = styled.button`
  width: 300px;
  height: 40px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  padding: 0 20px;
  font-family: "Ruda";
  font-size: 23px;
  color: #fffbdc;
  background-color: #48582f;
  border-radius: 30px;
`;

function Button(props) {
  const { title, onClick } = props;
  return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;
