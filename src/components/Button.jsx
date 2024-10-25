import React from "react";
import styled from "styled-components";

//전체 button style

const StyledButton = styled.button`
  min-width: 100px;
  width: calc(22%);
  min-height: 32px;
  height: calc(7%);
  display: inline-block;
  text-align: center;
  overflow: hidden;
  padding: 0 20px;
  font-family: "Inter-Regular", Helvetica;
  font-weight: 400;
  font-size: 14px;
  color: #fffbdc;
  background-color: #48582f;
  border-radius: 8px;
`;

function Button(props) {
  const { title, onClick } = props;
  return (
    <StyledButton onClick={onClick} className={className}>
      {title || "button"}
    </StyledButton>
  );
}

export default Button;
